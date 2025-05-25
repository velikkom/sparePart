package com.velikkom.demo.service;

import com.velikkom.demo.dto.user.UserAdminDTO;
import com.velikkom.demo.entity.concretes.business.Firm;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.payload.request.UpdateRolesRequest;

import java.util.List;
import java.util.Set;

public interface UserService {

    List<UserAdminDTO> getAllUsers();
    void updateUserRoles(Long id, UpdateRolesRequest request);
    void toggleUserStatus(Long id);
    void deleteUser(Long id);


    User getCurrentUser();
//
//    Set<Firm> getAssignedFirms(Long id);
//
//    void assignFirms(Long id, List<Long> fimIds);
}
