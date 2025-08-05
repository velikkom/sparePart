package com.velikkom.demo.repository;

import com.velikkom.demo.entity.concretes.business.Collection;
import com.velikkom.demo.entity.enums.PaymentMethods;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface CollectionRepository extends JpaRepository<Collection, Long>, JpaSpecificationExecutor<Collection> {

    List<Collection> findByFirmId(Long firmId);

    @Query("SELECT c FROM Collection c WHERE " +
            "(:firmId IS NULL OR c.firm.id = :firmId) AND " +
            "(:paymentMethod IS NULL OR c.paymentMethod = :paymentMethod) AND " +
            "(COALESCE(:startDate, NULL) IS NULL OR c.collectionDate >= :startDate) AND " +
            "(COALESCE(:endDate, NULL) IS NULL OR c.collectionDate <= :endDate) AND " +
            "(:minAmount IS NULL OR c.amount >= :minAmount) AND " +
            "(:maxAmount IS NULL OR c.amount <= :maxAmount)"
    )
    Page<Collection> searchCollections(
            @Param("firmId") Long firmId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("paymentMethod") PaymentMethods paymentMethod,
            @Param("minAmount") BigDecimal minAmount,
            @Param("maxAmount") BigDecimal maxAmount,
            Pageable pageable
    );

    boolean existsByReceiptNumber(String receiptNumber);

    @Query("SELECT uf.firm.id FROM UserFirm uf WHERE uf.user.id = :userId")
    List<Long> findFirmIdsByUserId(@Param("userId") Long userId);

    List<Collection> findByFirmIdIn(List<Long> firmIds);

    @Query("SELECT SUM(c.amount) FROM Collection c " +
            "WHERE (:firmId IS NULL OR c.firm.id = :firmId) " +
            "AND (:startDate IS NULL OR :endDate IS NULL OR c.collectionDate BETWEEN :startDate AND :endDate) " +
            "AND (:paymentMethod IS NULL OR c.paymentMethod = :paymentMethod) " +
            "AND (:minAmount IS NULL OR :maxAmount IS NULL OR c.amount BETWEEN :minAmount AND :maxAmount)")
    BigDecimal getTotalAmountByFilters(
            @Param("firmId") Long firmId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("paymentMethod") PaymentMethods paymentMethod,
            @Param("minAmount") BigDecimal minAmount,
            @Param("maxAmount") BigDecimal maxAmount
    );

}
