package com.velikkom.demo.controller.business;

import com.velikkom.demo.dto.business.ProductDTO;
import com.velikkom.demo.messages.SuccessMessages;
import com.velikkom.demo.payload.ResponseWrapper;
import com.velikkom.demo.payload.request.InvoiceRequest;
import com.velikkom.demo.payload.request.ProductRequest;
import com.velikkom.demo.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    @PostMapping("/add")
    @Operation(summary = "Yeni Ürün Oluştur", description = "Yeni bir ürün kaydı oluşturur.")
    public ResponseEntity<ResponseWrapper<ProductDTO>> createProduct(@RequestBody ProductRequest productRequest) throws BadRequestException {
        ProductDTO product = productService.createProduct(productRequest);
        return ResponseEntity.ok(new ResponseWrapper<>(true, SuccessMessages.PRODUCT_CREATED_SUCCESSFULLY, product));
    }

    @GetMapping
    @Operation(summary = "Tüm Ürünleri Getir", description = "Sistemde kayıtlı olan tüm ürünleri getirir.")
    public ResponseEntity<ResponseWrapper<Page<ProductDTO>>> getAllProducts(Pageable pageable) {
        Page<ProductDTO> products = productService.getAllProducts(pageable);
        return ResponseEntity.ok(new ResponseWrapper<>(true, SuccessMessages.PRODUCT_LISTED, products));

    }

    @GetMapping("/search")
    @Operation(summary = "Ürün Arama", description = "Keyword, fiyat aralığı, kategori ve stok durumuna göre ürün arar.")
    public ResponseEntity<ResponseWrapper<Page<ProductDTO>>> searchProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Boolean inStock,
            Pageable pageable) {

        Page<ProductDTO> products = productService.searchProducts(keyword, category, minPrice, maxPrice, inStock, pageable);
        return ResponseEntity.ok(new ResponseWrapper<>(true, SuccessMessages.PRODUCT_LISTED, products));
            }


    @PostMapping("/invoice")
    @Operation(summary = "Fatura ile Ürün Kaydet", description = "Bir fatura ile gelen ürünleri toplu şekilde kaydeder.")
    public ResponseEntity<ResponseWrapper<List<ProductDTO>>> createProductsFromInvoice(@RequestBody @Valid InvoiceRequest invoiceRequest) {
        List<ProductDTO> products = productService.createProductsFromInvoice(invoiceRequest);
        return ResponseEntity.ok(new ResponseWrapper<>(true, SuccessMessages.PRODUCTS_CREATED_SUCCESSFULLY, products));
    }





}
