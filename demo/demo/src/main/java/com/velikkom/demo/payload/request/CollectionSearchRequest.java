package com.velikkom.demo.payload.request;

import com.velikkom.demo.entity.enums.PaymentMethods;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CollectionSearchRequest {
    private Long firmId;
    private LocalDate startDate;
    private LocalDate endDate;
    private PaymentMethods paymentMethod;
}
