package com.velikkom.demo.mapper;

import com.velikkom.demo.dto.business.FirmDTO;
import com.velikkom.demo.entity.concretes.business.Firm;
import com.velikkom.demo.payload.request.FirmRequest;
import com.velikkom.demo.payload.response.FirmResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class FirmMapper {

    private final ModelMapper modelMapper;


    public FirmDTO toDTO(Firm firm) {
        return modelMapper.map(firm, FirmDTO.class);
    }

    public Firm toEntity(FirmDTO firmDTO) {
        return modelMapper.map(firmDTO, Firm.class);
    }

    public List<FirmDTO> toDTOList(List<Firm> firms) {
        return firms.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public Firm toEntity(FirmRequest firmRequest) {
        return modelMapper.map(firmRequest, Firm.class);
    }

    public FirmResponse toResponse(Firm firm) {
        System.out.println("Mapper gelen firma: " + firm); // log at
        if (firm == null) return null;
        return new FirmResponse(
                firm.getId(),
                firm.getName(),
                firm.getCode(),
                firm.getPhone(),
                firm.getTaxNumber(),
                firm.getAddress()
        );


    }
}
