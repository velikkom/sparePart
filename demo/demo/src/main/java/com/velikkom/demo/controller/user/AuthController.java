package com.velikkom.demo.controller.user;

import com.velikkom.demo.dto.user.UserDTO;
import com.velikkom.demo.messages.SuccessMessages;
import com.velikkom.demo.payload.ResponseWrapper;
import com.velikkom.demo.payload.request.LoginRequest;
import com.velikkom.demo.payload.request.RegisterRequest;
import com.velikkom.demo.payload.request.UpdatePasswordRequest;
import com.velikkom.demo.payload.response.JwtResponse;
import com.velikkom.demo.security.jwt.JwtUtils;
import com.velikkom.demo.security.service.UserDetailsImpl;
import com.velikkom.demo.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Kayıtlı kullanıcı nın logın işlemi", description = "Kayıtlı kullanıcının logın ıslemını yapar ve jwt token dondururu.")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(loginRequest.getUsername());

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername()));
    }

    @PostMapping("/register")
    @Operation(summary = "Yeni kullanıcı kaydı", description = "Yeni bir kullanıcı oluşturur ve varsayılan olarak ROLE_USER atar.")
    public ResponseEntity<ResponseWrapper<UserDTO>> registerUser(@RequestBody RegisterRequest registerRequest) {
        UserDTO userDTO = authService.registerUser(registerRequest);
        return ResponseEntity.ok(new ResponseWrapper<>(true, SuccessMessages.USER_CREATED_SUCCESSFULLY, userDTO));
    }

    @PostMapping("/update-password")
    @Operation(summary = "Şifre güncelle", description = "Kullanıcı mevcut şifresini doğrulayarak yeni bir şifre belirler.")
    public ResponseEntity<ResponseWrapper<String>> updatePassword(@AuthenticationPrincipal UserDetails userDetails,
                                                                  @RequestBody UpdatePasswordRequest updatePasswordRequest) {
        String response = authService.updatePassword(userDetails.getUsername(), updatePasswordRequest);
        return ResponseEntity.ok(new ResponseWrapper<>(true, "Şifre başarıyla güncellendi!", response));
    }
}



