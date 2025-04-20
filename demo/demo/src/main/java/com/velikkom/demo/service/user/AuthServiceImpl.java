package com.velikkom.demo.service.user;

import com.velikkom.demo.dto.user.UserDTO;
import com.velikkom.demo.entity.concretes.user.Role;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.entity.enums.RoleType;
import com.velikkom.demo.exception.ResourceNotFoundException;
import com.velikkom.demo.exception.UserAlreadyExistsException;
import com.velikkom.demo.exception.UserNotFoundException;
import com.velikkom.demo.mapper.UserMapper;
import com.velikkom.demo.messages.ErrorMessages;
import com.velikkom.demo.messages.SuccessMessages;
import com.velikkom.demo.payload.request.LoginRequest;
import com.velikkom.demo.payload.request.RegisterRequest;
import com.velikkom.demo.payload.request.UpdatePasswordRequest;
import com.velikkom.demo.payload.response.JwtResponse;
import com.velikkom.demo.repository.RoleRepository;
import com.velikkom.demo.repository.UserRepository;
import com.velikkom.demo.security.jwt.JwtUtils;
import com.velikkom.demo.security.service.UserDetailsImpl;
import com.velikkom.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;



    @Override
    @Transactional
    public UserDTO registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Bu kullanıcı adı zaten alınmış!");
        }
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Bu e-posta adresi zaten kullanılıyor!");
        }

        //şifreyi hshle
        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());

        //kulllanıcı olustur
        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setPassword(encodedPassword);
        newUser.setEmail(registerRequest.getEmail());


        // Varsayılan olarak ROLE_USER atayalım
        Role userRole = roleRepository.findByName(RoleType.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Role bulunamadı"));

        newUser.setRoles(Collections.singleton(userRole));

        // Kullanıcıyı kaydet
        User savedUser = userRepository.save(newUser);

        // Kullanıcıyı UserDTO'ya mapleyerek dön
        return userMapper.toDTO(savedUser);
    }

    @Override
    @Transactional
    public String updatePassword(String username, UpdatePasswordRequest updatePasswordRequest) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(ErrorMessages.USER_NOT_FOUND));

        // Mevcut şifre doğrulaması
        if (!passwordEncoder.matches(updatePasswordRequest.getOldPassword(), user.getPassword())) {
            throw new UserAlreadyExistsException(ErrorMessages.INVALID_OLD_PASSWORD);
        }

        // Yeni şifreyi hashleyerek güncelle
        user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
        userRepository.save(user);

        return SuccessMessages.PASSWORD_UPDATE_SUCCESS;
    }

    @Transactional
    public JwtResponse login(LoginRequest loginRequest) {
        System.out.println("🔐 Giriş denemesi: " + loginRequest.getEmail() + " / " + loginRequest.getPassword());

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı!"));

        if (!user.isActive()) {
            throw new ResourceNotFoundException(ErrorMessages.KULLANICI_HESABI_INACTIVE);
        }

        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            System.out.println("✅ Authentication başarılı: " + authentication.getName());
        } catch (AuthenticationException e) {
            System.out.println("❌ Authentication başarısız: " + e.getMessage());
            throw new RuntimeException("Giriş bilgileri hatalı");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtUtils.generateToken(user);

        return JwtResponse.builder()
                .token(jwtToken)
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles().stream()
                        .map(role -> role.getName().name())
                        .collect(Collectors.toSet()))
                .build();
    }


    @Override
    public UserDTO registerUserWithRoles(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())){
            throw new RuntimeException("Bu eposta zaten kayıtlı");
        }

        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        Set<Role> roles = registerRequest.getRoles().stream()
                .map(roleType -> roleRepository.findByName(roleType)
                        .orElseThrow(() -> new RuntimeException("Rol bulunamadı: " + roleType)))
                .collect(Collectors.toSet());

        newUser.setRoles(roles);
        return userMapper.toDTO(userRepository.save(newUser));
    }


}

