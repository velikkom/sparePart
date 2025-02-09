package com.velikkom.demo.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequest {

    @NotBlank
    private String oldPassword; // Mevcut şifre

    @NotBlank
    @Size(min = 6, max = 40)
    private String newPassword; // Yeni şifre
}
