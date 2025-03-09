package com.velikkom.demo.service.business;

import com.velikkom.demo.dto.business.InvoiceDTO;
import com.velikkom.demo.entity.concretes.business.Product;
import com.velikkom.demo.entity.concretes.business.SenderCompany;
import com.velikkom.demo.repository.ProductRepository;
import com.velikkom.demo.repository.SenderCompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final SenderCompanyRepository senderCompanyRepository;
    private final ProductRepository productRepository;

    public void saveInvoice(InvoiceDTO invoice) {
        // Gönderici Firma Kaydet
        SenderCompany senderCompany = new SenderCompany();
        senderCompany.setName(invoice.getSenderCompanyName());
        senderCompany.setTaxNumber(invoice.getSenderTaxNumber());
        SenderCompany savedCompany = senderCompanyRepository.save(senderCompany);

        // Ürünleri Kaydet
        List<Product> products = invoice.getProducts().stream()
            .map(productRequest -> {
                Product product = new Product();
                product.setName(productRequest.getName());
                product.setPrice(productRequest.getPrice());
                product.setStock(productRequest.getStock());
                product.setSenderCompany(savedCompany);
                return product;
            }).collect(Collectors.toList());

        productRepository.saveAll(products);
    }
}
