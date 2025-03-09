package com.velikkom.demo.dto.business;

import com.velikkom.demo.payload.request.ProductRequest;
import lombok.Data;
import java.util.List;

@Data
public class InvoiceDTO {
    private String senderCompanyName;  // Gönderici firmanın adı
    private String senderTaxNumber;   // Gönderici firmanın vergi numarası
    private String invoiceNumber;     // Fatura numarası
    private String invoiceDate;       // Fatura tarihi (isteğe bağlı, örneğin LocalDate kullanabilirsiniz)
    private List<ProductDTO> products; // Fatura içindeki ürünlerin listesi
}