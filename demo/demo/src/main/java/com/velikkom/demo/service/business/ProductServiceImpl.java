package com.velikkom.demo.service.business;

import com.velikkom.demo.dto.business.ProductDTO;
import com.velikkom.demo.entity.concretes.business.Firm;
import com.velikkom.demo.entity.concretes.business.Product;
import com.velikkom.demo.exception.ResourceNotFoundException;
import com.velikkom.demo.mapper.ProductMapper;
import com.velikkom.demo.payload.request.InvoiceRequest;
import com.velikkom.demo.payload.request.ProductRequest;
import com.velikkom.demo.repository.FirmRepository;
import com.velikkom.demo.repository.ProductRepository;
import com.velikkom.demo.service.ProductService;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final FirmRepository firmRepository;
    private final ProductMapper productMapper;


    @Override
    public ProductDTO createProduct(ProductRequest productRequest) throws BadRequestException {
        // Firma kontrolü
        Firm firm = firmRepository.findById(productRequest.getFirmId())
                .orElseThrow(() -> new ResourceNotFoundException("Firma bulunamadı"));

        // Ürün adı boş mu?
        if (productRequest.getName() == null || productRequest.getName().trim().isEmpty()) {
            throw new BadRequestException("Ürün adı boş olamaz");
        }

        // Fiyat kontrolü
        if (productRequest.getPrice() <= 0) {
            throw new BadRequestException("Ürün fiyatı sıfırdan büyük olmalı");
        }

        // Aynı firmada aynı isimde ürün var mı?
        boolean isProductExists = productRepository.existsByNameAndFirmId(
                productRequest.getName(), productRequest.getFirmId());

        if (isProductExists) {
            throw new BadRequestException("Bu isimde ürün zaten mevcut");
        }

        // Mapper ile entity oluşturma
        Product product = productMapper.toEntity(productRequest);
        product.setFirm(firm);
        product.setCreatedAt(LocalDateTime.now());


        // Kaydetme

        return productMapper.toDTO(productRepository.save(product));
    }

    @Override
    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(productMapper::toDTO);
    }

    @Override
    public Page<ProductDTO> searchProducts(String keyword, String category, Double minPrice, Double maxPrice, Boolean inStock, Pageable pageable) {
        Page<Product> products = productRepository.searchProducts(keyword, category, minPrice, maxPrice, inStock, pageable);

        if (products.isEmpty()) {
            throw new ResourceNotFoundException("Aradığınız kriterlerde ürün bulunamadı");
        }

        return products.map(productMapper::toDTO);
    }

    @Override
    public List<ProductDTO> createProductsFromInvoice(InvoiceRequest invoiceRequest) {
        List<Product> products = invoiceRequest.getProducts().stream()
                .map(productMapper::toEntity)
                .peek(product -> product.setCreatedAt(LocalDateTime.now())) // Her ürün için oluşturulma tarihi belirler.
                .collect(Collectors.toList());

        List<Product> savedProducts = productRepository.saveAll(products); // Toplu kaydetme işlemi.
        return savedProducts.stream().map(productMapper::toDTO).collect(Collectors.toList());
    }



}

