package com.velikkom.demo.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FirmResponse {
    private Long firmId;
    private String firmName;
    private String code;
    private String phone;
    private String taxNumber;
    private String address;


    public FirmResponse(Long id, String name) {
    }
}
