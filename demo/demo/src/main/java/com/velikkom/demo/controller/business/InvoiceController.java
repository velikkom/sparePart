package com.velikkom.demo.controller.business;


import com.velikkom.demo.dto.business.InvoiceDTO;
import com.velikkom.demo.payload.request.InvoiceRequest;
import com.velikkom.demo.service.business.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<String> saveInvoice(@RequestBody InvoiceDTO invoiceRequest) {
        invoiceService.saveInvoice(invoiceRequest);
        return ResponseEntity.ok("Fatura başarıyla kaydedildi.");
    }
}
