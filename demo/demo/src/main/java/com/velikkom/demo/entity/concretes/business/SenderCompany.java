package com.velikkom.demo.entity.concretes.business;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SenderCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String taxNumber;
    private String address; // Opsiyonel
    private String phone;   // Opsiyonel
}
