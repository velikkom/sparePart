package com.velikkom.demo.entity.enums;

public enum PaymentMethods {
    CASH("Nakit"),
    CREDIT_CARD("Kredi Kartı"),
    BANK_TRANSFER("Banka Transferi"),
    CHECK("Çek"),
    OTHER("Diğer");


   private final String displayName;

    PaymentMethods(String displayName) {
        this.displayName = displayName;
    }
    public String getDisplayName() {
        return displayName;
    }
}
