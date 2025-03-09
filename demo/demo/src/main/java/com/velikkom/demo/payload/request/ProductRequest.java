package com.velikkom.demo.payload.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String category;
    private int minStockLevel;
    private Long firmId;
}