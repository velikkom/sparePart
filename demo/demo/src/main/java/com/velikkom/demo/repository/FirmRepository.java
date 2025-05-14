package com.velikkom.demo.repository;

import com.velikkom.demo.entity.concretes.business.Firm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FirmRepository extends JpaRepository<Firm ,Long >, JpaSpecificationExecutor<Firm> {
    boolean existsByName(String name);

    boolean existsByCode(String code);

    boolean existsByTaxNumber(String taxNumber);
}
