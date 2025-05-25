package com.velikkom.demo.controller;

import com.velikkom.demo.dto.business.FirmAssignmentDTO;
import com.velikkom.demo.dto.business.FirmAssignmentViewDTO;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.payload.ResponseWrapper;
import com.velikkom.demo.payload.response.FirmResponse;
import com.velikkom.demo.service.UserFirmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user-firms")
@RequiredArgsConstructor
public class UserFirmController {

    private final UserFirmService userFirmService;

    @GetMapping("/assignments-view")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FirmAssignmentViewDTO>> getFirmAssignmentsView() {
        return ResponseEntity.ok(userFirmService.getAllFirmsWithAssignments());
    }

    @PostMapping("/assign")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> assignFirm(@RequestParam Long firmId, @RequestParam Long userId) {
        userFirmService.assignFirmToUser(firmId, userId);
        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message", "Firma başarıyla atandı"
                )
        );
    }


    @PutMapping("/reassign")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> reassignFirm(
            @RequestParam Long firmId,
            @RequestParam Long newUserId) {
        userFirmService.reassignFirm(firmId, newUserId);
        return ResponseEntity.ok(Map.of("success", true, "message", "Firma yeniden atandı"));
    }

    @DeleteMapping("/unassign")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> unassignFirm(@RequestParam Long firmId) {
        userFirmService.unassignFirm(firmId);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Firma ataması kaldırıldı"
        ));
    }

}
