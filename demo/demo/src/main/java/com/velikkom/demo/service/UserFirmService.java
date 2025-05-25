package com.velikkom.demo.service;

import com.velikkom.demo.dto.business.FirmAssignmentDTO;
import com.velikkom.demo.dto.business.FirmAssignmentViewDTO;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.payload.response.FirmResponse;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface UserFirmService {



    List<FirmAssignmentViewDTO> getAllFirmsWithAssignments();

    void assignFirmToUser(Long firmId, Long userId);

    void reassignFirm(Long firmId, Long newUserId);

    void unassignFirm(Long firmId);

}
