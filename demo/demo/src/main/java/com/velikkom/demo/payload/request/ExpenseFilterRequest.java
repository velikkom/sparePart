package com.velikkom.demo.payload.request;

import com.velikkom.demo.entity.enums.ExpenseType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ExpenseFilterRequest {

    private LocalDate startDate;     // ≥ expenseDate
    private LocalDate endDate;       // ≤ expenseDate

    private ExpenseType type;        // eşitlik kontrolü

    private BigDecimal minAmount;    // ≥ amount
    private BigDecimal maxAmount;    // ≤ amount
}
