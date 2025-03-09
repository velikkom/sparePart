package com.velikkom.demo.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FirmRequest {
    
    @NotBlank(message = "Firma adı boş olamaz")
    private String name;

    @NotBlank(message = "Adres boş olamaz")
    private String address;

    @NotBlank(message = "Telefon numarası boş olamaz")
    private String phone;

    @NotBlank(message = "Vergi numarası boş olamaz")
    private String taxNumber;
}
