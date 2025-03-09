package com.velikkom.demo.repository;


import com.velikkom.demo.entity.concretes.business.SenderCompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SenderCompanyRepository extends JpaRepository<SenderCompany, Long> {
}
