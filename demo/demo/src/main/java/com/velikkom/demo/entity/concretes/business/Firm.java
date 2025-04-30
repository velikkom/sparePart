package com.velikkom.demo.entity.concretes.business;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "firms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Firm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    private String name;

    @Column()
    private String address;

    @Column()
    private String phone;

    @Column()
    private String taxNumber;

    @Column()
    private BigDecimal debt = BigDecimal.ZERO;

    @Column()
    private String code;
}
