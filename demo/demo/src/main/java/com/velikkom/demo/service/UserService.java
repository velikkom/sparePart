package com.velikkom.demo.service;

import com.velikkom.demo.dto.user.UserAdminDTO;
import com.velikkom.demo.payload.request.UpdateRolesRequest;

import java.util.List;

public interface UserService {

    List<UserAdminDTO> getAllUsers();
    void updateUserRoles(Long id, UpdateRolesRequest request);
    void toggleUserStatus(Long id);
    void deleteUser(Long id);

}
