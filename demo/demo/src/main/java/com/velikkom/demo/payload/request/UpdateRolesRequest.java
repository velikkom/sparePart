package com.velikkom.demo.payload.request;

import com.velikkom.demo.entity.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateRolesRequest {
    private Set<RoleType> roles;
}
