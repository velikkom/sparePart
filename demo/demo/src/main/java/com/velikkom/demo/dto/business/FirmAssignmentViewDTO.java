package com.velikkom.demo.dto.business;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FirmAssignmentViewDTO {

    private Long firmId;
    private String firmName;
    private Long assignedUserId;      // null ise atanmamış
    private String assignedUserName;  // null ise atanmamış
}
