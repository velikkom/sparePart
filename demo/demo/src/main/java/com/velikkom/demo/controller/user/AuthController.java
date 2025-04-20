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
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final AuthService authService;


    @Operation(summary = "Kayıtlı kullanıcı nın logın işlemi", description = "Kayıtlı kullanıcının logın ıslemını yapar ve jwt token dondururu.")
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        System.out.println("📩 API çağrısı alındı");
        JwtResponse jwtResponse = authService.login(loginRequest);
        return ResponseEntity.ok(jwtResponse);
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
        return ResponseEntity.ok(new ResponseWrapper<>(true, SuccessMessages.PASSWORD_UPDATE_SUCCESS, response));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/register")
    public ResponseEntity<?> registerWithRole(@RequestBody RegisterRequest request) {
        UserDTO user = authService.registerUserWithRoles(request);
        return ResponseEntity.ok(user);
    }

}



