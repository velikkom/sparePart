package com.velikkom.demo.repository;

import com.velikkom.demo.entity.concretes.user.UserFirm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface PlasiyerFirmRepository extends JpaRepository<UserFirm, Long > {

    List<UserFirm> findByUserId(Long id);
}
