package com.velikkom.demo.service.user;

import com.velikkom.demo.dto.business.FirmAssignmentDTO;
import com.velikkom.demo.dto.business.FirmAssignmentViewDTO;
import com.velikkom.demo.entity.concretes.business.Firm;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.entity.concretes.user.UserFirm;
import com.velikkom.demo.exception.CustomException;
import com.velikkom.demo.exception.ResourceNotFoundException;
import com.velikkom.demo.mapper.FirmMapper;
import com.velikkom.demo.mapper.UserFirmMapper;
import com.velikkom.demo.payload.response.FirmResponse;
import com.velikkom.demo.repository.FirmRepository;
import com.velikkom.demo.repository.UserFirmRepository;
import com.velikkom.demo.repository.UserRepository;
import com.velikkom.demo.service.UserFirmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserFirmServiceImpl implements UserFirmService {

    private final FirmRepository firmRepository;
    private final UserFirmRepository userFirmRepository;
    private final UserRepository userRepository;

    @Override
    public List<FirmAssignmentViewDTO> getAllFirmsWithAssignments() {
        List<Firm> firms = firmRepository.findAll();
        List<UserFirm> assignments = userFirmRepository.findAll();

        Map<Long, UserFirm> map = assignments.stream()
                .collect(Collectors.toMap(
                        uf -> uf.getFirm().getId(),
                        uf -> uf,
                        (a, b) -> a
                ));

        return firms.stream().map(firm -> {
            UserFirm uf = map.get(firm.getId());
            return new FirmAssignmentViewDTO(
                    firm.getId(),
                    firm.getName(),
                    uf != null ? uf.getUser().getId() : null,
                    uf != null ? uf.getUser().getUsername() : null
            );
        }).toList();
    }


    @Override
    public void assignFirmToUser(Long firmId, Long userId) {
        Firm firm = firmRepository.findById(firmId)
                .orElseThrow(() -> new RuntimeException("Firma bulunamadı"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        UserFirm userFirm = new UserFirm();
        userFirm.setFirm(firm);
        userFirm.setUser(user);
        userFirmRepository.save(userFirm);
    }

    @Override
    public void reassignFirm(Long firmId, Long newUserId) {
        System.out.println("➡️ Reassign isteği geldi → firmId: " + firmId + ", newUserId: " + newUserId);

        Optional<UserFirm> userFirmOpt = userFirmRepository.findByFirmId(firmId);
        if (userFirmOpt.isEmpty()) {
            System.err.println("❌ Firma için atama bulunamadı. ID: " + firmId);
            throw new RuntimeException("Firma için atama bulunamadı.");
        }

        Optional<User> userOpt = userRepository.findById(newUserId);
        if (userOpt.isEmpty()) {
            System.err.println("❌ Yeni kullanıcı bulunamadı. ID: " + newUserId);
            throw new RuntimeException("Yeni kullanıcı bulunamadı.");
        }

        UserFirm userFirm = userFirmOpt.get();
        userFirm.setUser(userOpt.get());
        userFirmRepository.save(userFirm);

        System.out.println("✅ Firma güncelleme başarılı: Firma ID = " + firmId);
    }


    @Override
    public void unassignFirm(Long firmId) {
        Optional<UserFirm> assignment = userFirmRepository.findByFirmId(firmId);
        if (assignment.isEmpty()) {
            System.err.println("❌ Firma için atama bulunamadı → firmId: " + firmId);
            throw new RuntimeException("Firma için atama bulunamadı.");
        }

        userFirmRepository.delete(assignment.get());  // ✅ Doğrudan obje ile silme
        System.out.println("✅ Firma ataması kaldırıldı → firmId: " + firmId);
    }


}



