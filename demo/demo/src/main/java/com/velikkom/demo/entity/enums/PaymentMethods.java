package com.velikkom.demo.entity.enums;

import lombok.Getter;

@Getter
public enum PaymentMethods {
    CASH("Nakit"),
    CREDIT_CARD("Kredi Kartı"),
    BANK_TRANSFER("Banka Transferi"),
    CHECK("Çek"),
    NOTE("Senet"),
    OTHER("Diğer");


   private final String displayName;

    PaymentMethods(String displayName) {
        this.displayName = displayName;
    }
}
