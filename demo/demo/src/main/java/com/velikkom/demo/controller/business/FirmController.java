package com.velikkom.demo.controller.business;


import com.velikkom.demo.dto.business.FirmDTO;
import com.velikkom.demo.payload.ResponseWrapper;
import com.velikkom.demo.messages.SuccessMessages;
import com.velikkom.demo.service.FirmService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/firms")
@RequiredArgsConstructor
@Tag(name = "Firm API", description = "Firma yönetimi ile ilgili işlemleri içerir.")
public class FirmController {

    private final FirmService firmService;


    @PostMapping
    @Operation(summary = "Firma oluştur", description = "Yeni bir firma ekler.")
    public ResponseEntity<ResponseWrapper<FirmDTO>> createFirm (@Valid @RequestBody FirmDTO firm){

        FirmDTO savedFirm = firmService.saveFirm(firm);

      return ResponseEntity.ok(new ResponseWrapper<>(true, SuccessMessages.FIRM_CREATED_SUCCESSFULLY, savedFirm));
    }
}
