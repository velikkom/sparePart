package com.velikkom.demo.dto.business;

import lombok.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FirmDTO {

    private Long id;

    @NotBlank(message = "Firma adı boş olamaz")
    private String name;

    @NotBlank(message = "Adres boş olamaz")
    private String address;

    @NotBlank(message = "Telefon numarası boş olamaz")
    @Size(min = 10, max = 15, message = "Telefon numarası 10-15 karakter olmalı")
    private String phone;

    @NotBlank(message = "Vergi numarası boş olamaz")
    @Size(min = 10, max = 12, message = "Vergi numarası 10-12 karakter olmalı")
    private String taxNumber;
}
