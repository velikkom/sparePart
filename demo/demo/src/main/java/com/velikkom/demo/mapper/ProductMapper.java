package com.velikkom.demo.mapper;

import com.velikkom.demo.dto.business.ProductDTO;
import com.velikkom.demo.entity.concretes.business.Product;
import com.velikkom.demo.payload.request.ProductRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final ModelMapper modelMapper;

    public Product toEntity(ProductRequest productRequest){
        return modelMapper.map(productRequest, Product.class);
    }

    public ProductDTO toDTO(Product product){
        return modelMapper.map(product, ProductDTO.class);
    }

}
