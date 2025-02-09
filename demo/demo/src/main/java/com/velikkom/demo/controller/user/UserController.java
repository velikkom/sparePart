package com.velikkom.demo.controller;


import com.velikkom.demo.payload.response.UserResponse;
import com.velikkom.demo.security.service.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {


    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        UserResponse response = new UserResponse(userDetails.getUsername(), userDetails.getAuthorities());
        return ResponseEntity.ok(response);
    }
}
