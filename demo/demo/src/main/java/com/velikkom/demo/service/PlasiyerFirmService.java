package com.velikkom.demo.service;

import com.velikkom.demo.dto.business.FirmDTO;
import org.springframework.stereotype.Service;

import java.util.List;


public interface PlasiyerFirmService {

    List<FirmDTO> getMyAssignedFirms(String email);
}
