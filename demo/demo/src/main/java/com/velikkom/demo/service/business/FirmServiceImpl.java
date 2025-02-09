package com.velikkom.demo.service.business;

import com.velikkom.demo.dto.business.FirmDTO;
import com.velikkom.demo.entity.concretes.business.Firm;
import com.velikkom.demo.mapper.FirmMapper;
import com.velikkom.demo.repository.FirmRepository;
import com.velikkom.demo.service.FirmService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FirmServiceImpl implements FirmService {

    private final FirmRepository firmRepository;
    private final FirmMapper firmMapper;


    @Override
    public FirmDTO saveFirm(FirmDTO firm) {
        Firm firmEntity = firmMapper.toEntity(firm);
        firmEntity = firmRepository.save(firmEntity);
        return firmMapper.toDTO(firmEntity);
    }
}
