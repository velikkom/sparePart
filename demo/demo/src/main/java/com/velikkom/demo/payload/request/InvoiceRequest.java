package com.velikkom.demo.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class InvoiceRequest {
    private String senderCompanyName;
    private String senderTaxNumber;
    private String invoiceNumber;
    private String invoiceDate;
    private List<ProductRequest> products;
}
