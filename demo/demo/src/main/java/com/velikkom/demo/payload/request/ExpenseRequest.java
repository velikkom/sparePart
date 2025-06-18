package com.velikkom.demo.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.velikkom.demo.entity.enums.ExpenseType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ExpenseRequest {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate expenseDate;

    private ExpenseType type;
    private BigDecimal amount;
}
