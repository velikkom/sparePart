package com.velikkom.demo.mapper;

import com.velikkom.demo.dto.business.FirmAssignmentDTO;
import com.velikkom.demo.entity.concretes.user.UserFirm;


public class UserFirmMapper {
    public static FirmAssignmentDTO toDto(UserFirm uf) {
        return FirmAssignmentDTO.builder()
                .firmId(uf.getFirm().getId())
                .firmName(uf.getFirm().getName())
                .userId(uf.getUser().getId())
                .userName(uf.getUser().getUsername())
                .build();
    }
}
