package com.velikkom.demo.entity.concretes.business;

import com.velikkom.demo.entity.enums.PaymentMethods;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "collections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate collectionDate;
    private BigDecimal amount;

    private String receiptNumber; // Makbuz numarası

    @Enumerated(EnumType.STRING)
    private PaymentMethods paymentMethod;

    @ManyToOne
    @JoinColumn(name = "firm_id")
    private Firm firm;


}
