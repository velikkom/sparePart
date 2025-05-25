package com.velikkom.demo.dto.business;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FirmAssignmentDTO {
    private Long firmId;
    private String firmName;
    private Long userId;
    private String userName;
}
