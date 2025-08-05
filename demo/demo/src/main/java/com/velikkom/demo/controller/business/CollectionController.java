package com.velikkom.demo.controller.business;

import com.sun.security.auth.UserPrincipal;
import com.velikkom.demo.dto.business.CollectionDTO;
import com.velikkom.demo.entity.enums.PaymentMethods;
import com.velikkom.demo.payload.ResponseWrapper;
import com.velikkom.demo.payload.request.CollectionSearchRequest;
import com.velikkom.demo.security.service.UserDetailsImpl;
import com.velikkom.demo.service.CollectionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/collection")
@RequiredArgsConstructor
@Tag(name = "Collection Controller", description = "Tahsilat yönetimi")
public class CollectionController {

    private final CollectionService collectionService;


    @Operation(summary = "Yeni tahsilat oluştur", description = "Yeni bir tahsilat kaydı oluşturur.")
    @PostMapping("/add")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PLASIYER')")
    public ResponseEntity<ResponseWrapper<CollectionDTO>> createCollection(@RequestBody CollectionDTO collectionDTO) {
        CollectionDTO result = collectionService.createCollection(collectionDTO);
        return new ResponseEntity<>(new ResponseWrapper<>(true, "Tahsilat oluşturuldu", result), HttpStatus.CREATED);
    }

    @Operation(summary = "Tahsilatları filtrele ve sayfalı listele")
    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PLASIYER')")
    public ResponseEntity<Page<CollectionDTO>> searchCollections(
            @RequestParam(required = false) Long firmId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) PaymentMethods paymentMethod,
            @RequestParam(required = false) BigDecimal minAmount,
            @RequestParam(required = false) BigDecimal maxAmount,

            @PageableDefault(size = 10, sort = "collectionDate", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        CollectionSearchRequest request = new CollectionSearchRequest();
        request.setFirmId(firmId);
        request.setStartDate(startDate);
        request.setEndDate(endDate);
        request.setPaymentMethod(paymentMethod);
        request.setMinAmount(minAmount);
        request.setMaxAmount(maxAmount);

        Page<CollectionDTO> result = collectionService.searchCollections(request, pageable);

        return ResponseEntity.ok(result); // ✅ Artık ResponseWrapper yok
    }


    @Operation(summary = "Filtrelenmiş tahsilatların toplam tutarını döner")
    @GetMapping("/search/total")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PLASIYER')")
    public ResponseEntity<ResponseWrapper<BigDecimal>> getFilteredTotal(
            @RequestParam(required = false) Long firmId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) PaymentMethods paymentMethod,
            @RequestParam(required = false) BigDecimal minAmount,
            @RequestParam(required = false) BigDecimal maxAmount
    ) {
        CollectionSearchRequest request = new CollectionSearchRequest();
        request.setFirmId(firmId);
        request.setStartDate(startDate);
        request.setEndDate(endDate);
        request.setPaymentMethod(paymentMethod);
        request.setMinAmount(minAmount);
        request.setMaxAmount(maxAmount);

        BigDecimal total = collectionService.getTotalAmount(request);
        return ResponseEntity.ok(new ResponseWrapper<>(true, "Toplam tahsilat", total));
    }


    @Operation(summary = "Tahsilat güncelle", description = "Belirtilen ID'li tahsilatı günceller.")
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PLASIYER')")
    public ResponseEntity<ResponseWrapper<Void>> updateCollection(
            @PathVariable Long id,
            @RequestBody CollectionDTO collectionDTO
    ) {

        collectionService.updateCollection(id, collectionDTO);
        return ResponseEntity.ok(new ResponseWrapper<>(true, "Tahsilat güncellendi"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_PLASIYER')")
    public ResponseEntity<ResponseWrapper<Void>> deleteCollection(@PathVariable Long id) {
        collectionService.deleteCollection(id);
        return ResponseEntity.ok(new ResponseWrapper<>(true, null));
    }

    @GetMapping("my-collection")
    @PreAuthorize("hasRole('PLASIYER')")
    public List<CollectionDTO> getPlasiyerCollection(@AuthenticationPrincipal UserDetailsImpl user) {
        return collectionService.getCollectionsByUserFirms(user.getId());
    }

    @Operation(summary = "Tüm tahsilatları getir (ADMIN)")
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CollectionDTO>> getAllCollections() {
        List<CollectionDTO> collections = collectionService.getAllCollections();
        return ResponseEntity.ok(collections);
    }
}