package com.velikkom.demo.entity.concretes.business;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.entity.enums.ExpenseType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate expenseDate;

    @Enumerated(EnumType.STRING)
    private ExpenseType type; // ENUM olarak tutulur

    private BigDecimal amount;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDate createdAt;


    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDate.now();
    }
}
