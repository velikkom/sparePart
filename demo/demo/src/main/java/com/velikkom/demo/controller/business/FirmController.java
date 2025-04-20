package com.velikkom.demo.controller.business;

import com.velikkom.demo.dto.business.FirmDTO;
import com.velikkom.demo.messages.SuccessMessages;
import com.velikkom.demo.payload.ResponseWrapper;
import com.velikkom.demo.payload.request.FirmRequest;
import com.velikkom.demo.service.FirmService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/firms")
@RequiredArgsConstructor
@Tag(name = "Firm Management", description = "Firma yönetimi ile ilgili işlemler")
public class FirmController {

    private final FirmService firmService;

    private <T> ResponseEntity<ResponseWrapper<T>> buildResponse(String message, T data) {
        return ResponseEntity.ok(new ResponseWrapper<>(true, message, data));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Yeni firma oluştur", description = "Yeni bir firma kaydı oluşturur.")
    public ResponseEntity<ResponseWrapper<FirmDTO>> createFirm(@RequestBody FirmRequest firmRequest) {
        return buildResponse(SuccessMessages.FIRM_CREATED, firmService.createFirm(firmRequest));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PLASIYER')")
    @Operation(summary = "Tüm firmaları getir", description = "Sistemde kayıtlı olan tüm firmaları getirir.")
    public ResponseEntity<ResponseWrapper<List<FirmDTO>>> getAllFirms() {
        return buildResponse(SuccessMessages.FIRM_LISTED, firmService.getAllFirms());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PLASIYER')")
    @Operation(summary = "Firma detaylarını getir", description = "Belirtilen ID'ye sahip firmayı getirir.")
    public ResponseEntity<ResponseWrapper<FirmDTO>> getFirmById(@PathVariable Long id) {
        return buildResponse(SuccessMessages.FIRM_FOUND, firmService.getFirmById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Firma güncelle", description = "Belirtilen ID'ye sahip firmayı günceller.")
    public ResponseEntity<ResponseWrapper<FirmDTO>> updateFirm(@PathVariable Long id, @RequestBody FirmRequest firmRequest) {
        return buildResponse(SuccessMessages.FIRM_UPDATED, firmService.updateFirm(id, firmRequest));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Firma sil", description = "Belirtilen ID'ye sahip firmayı sistemden siler.")
    public ResponseEntity<ResponseWrapper<Void>> deleteFirm(@PathVariable Long id) {
        firmService.deleteFirm(id);
        return buildResponse(SuccessMessages.FIRM_DELETED, null);
    }


}
