package com.velikkom.demo.controller.user;

import com.velikkom.demo.dto.business.FirmDTO;
import com.velikkom.demo.service.PlasiyerFirmService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/plasiyer")
@RequiredArgsConstructor
public class PlasiyerController {

    private final PlasiyerFirmService plasiyerFirmService;

    @GetMapping("/my-firms")
    @PreAuthorize("hasRole('PLASIYER')")
    @Operation(summary = "Login olan plasiyerin atanmış firmalarını getirir")
    public ResponseEntity<List<FirmDTO>> getMyAssignedFirms() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        List<FirmDTO > firms = plasiyerFirmService.getMyAssignedFirms(email);
        return ResponseEntity.ok(firms);
    }
}
