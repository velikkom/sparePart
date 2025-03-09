package com.velikkom.demo.service;

import com.velikkom.demo.dto.business.FirmDTO;
import com.velikkom.demo.payload.request.FirmRequest;

import java.util.List;

public interface FirmService {

    FirmDTO createFirm(FirmRequest firmRequest);
    List<FirmDTO> getAllFirms();
    FirmDTO getFirmById(Long id);
    FirmDTO updateFirm(Long id, FirmRequest firmRequest);
    void deleteFirm(Long id);
}
