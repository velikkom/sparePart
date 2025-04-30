package com.velikkom.demo.controller.user;

import com.velikkom.demo.dto.user.UserAdminDTO;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.payload.request.UpdateRolesRequest;
import com.velikkom.demo.repository.UserRepository;
import com.velikkom.demo.service.ExcelImportService;
import com.velikkom.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final ExcelImportService excelImportService;

    @GetMapping()
    public ResponseEntity<List<UserAdminDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{id}/roles")
    public ResponseEntity<?> updateRoles(@PathVariable Long id, @RequestBody UpdateRolesRequest request) {
        userService.updateUserRoles(id, request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) {
        userService.toggleUserStatus(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/new-users-exist")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<Boolean> checkNewUsersExist() {
        boolean hasNewUsers = userRepository.existsByIsNewUserTrue();
        return ResponseEntity.ok(hasNewUsers);
    }

    @PatchMapping("/new-users/acknowledge")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<Void> acknowledgeNewUsers() {
        List<User> newUsers = userRepository.findByIsNewUserTrue();
        newUsers.forEach(user -> user.setNewUser(false));
        userRepository.saveAll(newUsers);
        return ResponseEntity.noContent().build();
    }

//    @PostMapping(value = "/excel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<?> importFirms(@RequestParam("file") MultipartFile file) {
//        try {
//            excelImportService.importFirmsFromExcel(file.getInputStream());
//            return ResponseEntity.ok("Firmalar başarıyla yüklendi.");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Yükleme sırasında hata oluştu: " + e.getMessage());
//        }
//    }

    @PostMapping(value = "/excel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> uploadFirmsFromExcel(@RequestParam("file") MultipartFile file) {
        excelImportService.importFirmsFromExcel(file);
        return ResponseEntity.ok("Dosya başarıyla yüklendi ve veriler kaydedildi.");
    }



}
