package com.velikkom.demo.controller.business;

import com.velikkom.demo.dto.business.CollectionDTO;
import com.velikkom.demo.entity.enums.PaymentMethods;
import com.velikkom.demo.payload.ResponseWrapper;
import com.velikkom.demo.payload.request.CollectionSearchRequest;
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
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/collection")
@RequiredArgsConstructor
@Tag(name = "Collection Controller", description = "Tahsilat yönetimi")
public class CollectionController {

    private final CollectionService collectionService;


    @Operation(summary = "Yeni tahsilat oluştur", description = "Yeni bir tahsilat kaydı oluşturur.")
    @PostMapping("/add")
    public ResponseEntity<ResponseWrapper<CollectionDTO>> createCollection(@RequestBody CollectionDTO collectionDTO) {
        CollectionDTO result = collectionService.createCollection(collectionDTO);
        return new ResponseEntity<>(new ResponseWrapper<>(true, "Tahsilat oluşturuldu", result), HttpStatus.CREATED);
    }

    @Operation(summary = "Tahsilatları filtrele ve sayfalı listele")
    @GetMapping("/search")
    public ResponseEntity<ResponseWrapper<Page<CollectionDTO>>> searchCollections(
            @RequestParam(required = false) Long firmId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) PaymentMethods paymentMethod,
            @PageableDefault(size = 10, sort = "collectionDate", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        CollectionSearchRequest request = new CollectionSearchRequest();
        request.setFirmId(firmId);
        request.setStartDate(startDate);
        request.setEndDate(endDate);
        request.setPaymentMethod(paymentMethod);

        Page<CollectionDTO> result = collectionService.searchCollections(request, pageable);

        return new ResponseEntity<>(new ResponseWrapper<>(true, "Tahsilatlar listelendi", result), HttpStatus.OK);
    }

}
