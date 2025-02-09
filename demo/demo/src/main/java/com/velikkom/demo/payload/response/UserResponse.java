package com.velikkom.demo.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
@AllArgsConstructor
public class UserResponse {

    private String username;
    private Collection<? extends GrantedAuthority> roles;
}
