package com.velikkom.demo.service;

import com.velikkom.demo.dto.business.ProductDTO;
import com.velikkom.demo.payload.request.InvoiceRequest;
import com.velikkom.demo.payload.request.ProductRequest;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    ProductDTO createProduct(ProductRequest productRequest) throws BadRequestException;


    Page<ProductDTO> getAllProducts(Pageable pageable);

    Page<ProductDTO> searchProducts(String keyword, String category, Double minPrice, Double maxPrice, Boolean inStock, Pageable pageable);


    List<ProductDTO> createProductsFromInvoice(@Valid InvoiceRequest invoiceRequest);
}
