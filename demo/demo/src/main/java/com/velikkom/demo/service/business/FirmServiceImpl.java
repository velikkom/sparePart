package com.velikkom.demo.service.business;

import com.velikkom.demo.dto.business.FirmDTO;
import com.velikkom.demo.entity.concretes.business.Firm;
import com.velikkom.demo.exception.FirmNotFoundException;
import com.velikkom.demo.mapper.FirmMapper;
import com.velikkom.demo.messages.ErrorMessages;
import com.velikkom.demo.payload.request.FirmRequest;
import com.velikkom.demo.repository.FirmRepository;
import com.velikkom.demo.service.FirmService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FirmServiceImpl implements FirmService {

    private final FirmRepository firmRepository;
    private final FirmMapper firmMapper;

    @Override
    public FirmDTO createFirm(FirmRequest firmRequest) {
        Firm firm = firmMapper.toEntity(firmRequest);
        return firmMapper.toDTO(firmRepository.save(firm));
    }

    @Override
    public List<FirmDTO> getAllFirms() {
        List<Firm> firms = firmRepository.findAll();
        return firms.stream()
                .map(firmMapper::toDTO)
                .collect(Collectors.toList());
    }



    @Override
    public FirmDTO getFirmById(Long id) {
        return firmRepository.findById(id)
                .map(firmMapper::toDTO)
                .orElseThrow(() -> new FirmNotFoundException(ErrorMessages.FIRM_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public FirmDTO updateFirm(Long id, FirmRequest firmRequest) {
        Firm firm = firmRepository.findById(id)
                .orElseThrow(() -> new FirmNotFoundException(ErrorMessages.FIRM_NOT_FOUND, HttpStatus.NOT_FOUND));

        firm.setName(firmRequest.getName());
        firm.setAddress(firmRequest.getAddress());
        firm.setPhone(firmRequest.getPhone());
        firm.setTaxNumber(firmRequest.getTaxNumber());

        return firmMapper.toDTO(firmRepository.save(firm));
    }

    @Override
    public void deleteFirm(Long id) {
        Firm firm = firmRepository.findById(id)
                .orElseThrow(() -> new FirmNotFoundException(ErrorMessages.FIRM_NOT_FOUND, HttpStatus.NOT_FOUND));

        firmRepository.delete(firm);
    }
}
