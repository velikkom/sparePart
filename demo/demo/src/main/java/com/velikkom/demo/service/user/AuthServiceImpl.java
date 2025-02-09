package com.velikkom.demo.service.user;

import com.velikkom.demo.dto.user.UserDTO;
import com.velikkom.demo.entity.concretes.user.Role;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.entity.enums.RoleType;
import com.velikkom.demo.mapper.UserMapper;
import com.velikkom.demo.messages.ErrorMessages;
import com.velikkom.demo.payload.request.RegisterRequest;
import com.velikkom.demo.payload.request.UpdatePasswordRequest;
import com.velikkom.demo.repository.RoleRepository;
import com.velikkom.demo.repository.UserRepository;
import com.velikkom.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;


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
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı!"));

        // Mevcut şifre doğrulaması
        if (!passwordEncoder.matches(updatePasswordRequest.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Eski şifre hatalı!");
        }

        // Yeni şifreyi hashleyerek güncelle
        user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
        userRepository.save(user);

        return "Şifre başarıyla güncellendi!";
    }
}

