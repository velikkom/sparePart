package com.velikkom.demo.dto.business;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String category;
    private int minStockLevel;
    private Long firmId;

}
