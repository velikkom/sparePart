package com.velikkom.demo.service;

import com.velikkom.demo.dto.user.UserDTO;
import com.velikkom.demo.payload.request.LoginRequest;
import com.velikkom.demo.payload.request.RegisterRequest;
import com.velikkom.demo.payload.request.UpdatePasswordRequest;
import com.velikkom.demo.payload.response.JwtResponse;
import jakarta.validation.Valid;

public interface AuthService {


    UserDTO registerUser(RegisterRequest registerRequest);


    String updatePassword(String username, UpdatePasswordRequest updatePasswordRequest);

    JwtResponse login(@Valid LoginRequest loginRequest);

    UserDTO registerUserWithRoles(RegisterRequest request);
}
