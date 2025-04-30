package com.velikkom.demo.repository;

import com.velikkom.demo.entity.concretes.business.Collection;
import com.velikkom.demo.entity.enums.PaymentMethods;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CollectionRepository extends JpaRepository<Collection, Long> {

    List<Collection> findByFirmId(Long firmId);

    @Query("SELECT c FROM Collection c WHERE " +
            "(:firmId IS NULL OR c.firm.id = :firmId) AND " +
            "(:paymentMethod IS NULL OR c.paymentMethod = :paymentMethod) AND " +
            "(COALESCE(:startDate, NULL) IS NULL OR c.collectionDate >= :startDate) AND " +
            "(COALESCE(:endDate, NULL) IS NULL OR c.collectionDate <= :endDate)")
    Page<Collection> searchCollections(
            @Param("firmId") Long firmId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("paymentMethod") PaymentMethods paymentMethod,
            Pageable pageable
    );
}
