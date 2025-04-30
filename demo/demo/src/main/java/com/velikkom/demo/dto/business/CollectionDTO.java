package com.velikkom.demo.dto.business;

import com.velikkom.demo.entity.enums.PaymentMethods;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CollectionDTO {
    private Long id;
    private LocalDate collectionDate;
    private BigDecimal amount;
    private PaymentMethods paymentMethod;
    private String receiptNumber;
    private Long firmId;
    private String firmName;
    private String checkBankName;
    private LocalDate checkDueDate;

    private BigDecimal noteAmount;
    private LocalDate noteDueDate;

}
