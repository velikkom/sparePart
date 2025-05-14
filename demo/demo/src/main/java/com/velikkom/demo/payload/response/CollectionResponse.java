package com.velikkom.demo.payload.response;

import com.velikkom.demo.entity.enums.PaymentMethods;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class CollectionResponse {

    private Long firmId;
    private String firmName;
    private LocalDate startDate;
    private LocalDate endDate;
    private PaymentMethods paymentMethod;
    private String checkBankName;
    private LocalDate checkDueDate;
    private LocalDate noteDueDate;
    private BigDecimal noteAmount;

}
