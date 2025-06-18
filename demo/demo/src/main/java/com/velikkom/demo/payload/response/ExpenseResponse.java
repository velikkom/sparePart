package com.velikkom.demo.payload.response;

import com.velikkom.demo.entity.enums.ExpenseType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseResponse {
    private Long id;
    private LocalDate expenseDate;
    private ExpenseType type;
    private BigDecimal amount;
    private String userEmail;
    private LocalDate createdAt;
}
