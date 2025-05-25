package com.velikkom.demo.payload.request;

import lombok.Data;

import java.util.List;

@Data
public class AssignFirmsRequest {
    private List<Long> fimIds;
}
