package com.velikkom.demo.util;


import com.velikkom.demo.payload.request.InvoiceRequest;
import com.velikkom.demo.payload.request.ProductRequest;

public class InvoiceParser {
    public static InvoiceRequest parse(String pdfText) {
        InvoiceRequest invoiceRequest = new InvoiceRequest();
        // Örnek Ayrıştırma:
        invoiceRequest.setSenderCompanyName("Sample Company");
        invoiceRequest.setSenderTaxNumber("1234567890");
        // Ürün Listesi Ayrıştırma
        ProductRequest product = new ProductRequest();
        product.setName("Sample Product");
        product.setPrice(100.0);
        product.setStock(10);
        invoiceRequest.getProducts().add(product);

        return invoiceRequest;
    }
}
