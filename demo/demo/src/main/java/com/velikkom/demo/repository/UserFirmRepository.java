package com.velikkom.demo.repository;

import com.velikkom.demo.entity.concretes.business.Firm;
import com.velikkom.demo.entity.concretes.user.UserFirm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserFirmRepository extends JpaRepository<UserFirm, Long> {



    List<UserFirm> findByUserId(Long userId);

    Optional<UserFirm> findByFirmId(Long firmId); // ✅ EKLENECEK

    void deleteByFirmId(Long firmId);

    @Query("SELECT uf.firm.id FROM UserFirm uf WHERE uf.user.id = :userId")
    List<Long> findFirmIdsByUserId(Long userId);
}
