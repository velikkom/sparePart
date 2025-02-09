package com.velikkom.demo.service;

import com.velikkom.demo.dto.user.UserDTO;
import com.velikkom.demo.payload.request.RegisterRequest;
import com.velikkom.demo.payload.request.UpdatePasswordRequest;

public interface AuthService {


    UserDTO registerUser(RegisterRequest registerRequest);


    String updatePassword(String username, UpdatePasswordRequest updatePasswordRequest);
}
