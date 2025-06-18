package com.velikkom.demo.payload.request;

import com.velikkom.demo.entity.enums.ExpenseType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class AdminExpenseFilterRequest {

    private Long userId; // opsiyonel
    private LocalDate startDate;
    private LocalDate endDate;
    private ExpenseType type;
    private BigDecimal minAmount;
    private BigDecimal maxAmount;
}
