package com.velikkom.demo.service.user;

import com.velikkom.demo.dto.business.FirmDTO;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.exception.ResourceNotFoundException;
import com.velikkom.demo.repository.PlasiyerFirmRepository;
import com.velikkom.demo.repository.UserFirmRepository;
import com.velikkom.demo.repository.UserRepository;
import com.velikkom.demo.service.PlasiyerFirmService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlasiyerFirmServiceImpl implements PlasiyerFirmService {

    private final UserRepository userRepository;
    private final PlasiyerFirmRepository plasiyerFirmRepository;
    private final ModelMapper modelMapper;


    @Override
    public List<FirmDTO> getMyAssignedFirms(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı"));

        return plasiyerFirmRepository.findByUserId(user.getId())
                .stream()
                .map(uf -> modelMapper.map(uf.getFirm(), FirmDTO.class))
                .collect(Collectors.toList());
    }
}
