package com.velikkom.demo.entity.concretes.business;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "firms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Firm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String phone;



    @Column(nullable = false, unique = true)
    private String taxNumber;
}
