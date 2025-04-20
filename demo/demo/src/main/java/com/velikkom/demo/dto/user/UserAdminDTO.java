package com.velikkom.demo.dto.user;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAdminDTO {
    private Long id;
    private String username;
    private String email;
    private Set<String> roles;
    private boolean isActive;
    private boolean isNewUser;
}
