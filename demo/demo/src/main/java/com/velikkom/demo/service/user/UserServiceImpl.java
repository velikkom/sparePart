package com.velikkom.demo.service.user;

import com.velikkom.demo.dto.user.UserAdminDTO;
import com.velikkom.demo.entity.concretes.business.Firm;
import com.velikkom.demo.entity.concretes.user.Role;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.exception.ResourceNotFoundException;
import com.velikkom.demo.payload.request.UpdateRolesRequest;
import com.velikkom.demo.repository.FirmRepository;
import com.velikkom.demo.repository.RoleRepository;
import com.velikkom.demo.repository.UserRepository;
import com.velikkom.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final FirmRepository firmRepository;

    @Override
    public List<UserAdminDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> UserAdminDTO.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .roles(user.getRoles().stream()
                                .map(role -> role.getName().name())
                                .collect(Collectors.toSet()))
                        .isActive(user.isActive())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public void updateUserRoles(Long id, UpdateRolesRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı!"));

        Set<Role> newRoles = request.getRoles().stream()
                .map(roleType -> roleRepository.findByName(roleType)
                        .orElseThrow(() -> new RuntimeException("Rol bulunamadı: " + roleType)))
                .collect(Collectors.toSet());

        user.setRoles(newRoles);

        // ✅ Artık yeni kullanıcı değil
        user.setNewUser(false);

        userRepository.save(user);
    }


    @Override
    public void toggleUserStatus(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı!"));

        user.setActive(!user.isActive());
        if (user.isActive()){
            user.setNewUser(false);
        }
        userRepository.save(user);
    }


    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı!"));

        userRepository.delete(user);
    }

    @Override
    public User getCurrentUser() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return  userRepository.findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("Kullanıcı Bulunamadı " + email));

    }

//    @Override
//    public Set<Firm> getAssignedFirms(Long userId) {
//        return userRepository.findWithFirmsById(userId)
//                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı: " + userId))
//                .getAssignedFirms();
//    }
//
//    @Override
//    public void assignFirms(Long userId, List<Long> firmIds) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı: " + userId));
//
//        List<Firm> firms = firmRepository.findAllById(firmIds);
//        user.setAssignedFirms(new HashSet<>(firms));
//
//        userRepository.save(user);
//    }


}
