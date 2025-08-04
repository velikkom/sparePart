package com.velikkom.demo.repository;

import com.velikkom.demo.entity.concretes.business.Expense;
import com.velikkom.demo.payload.request.AdminExpenseFilterRequest;
import com.velikkom.demo.payload.request.ExpenseFilterRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> , ExpenseRepositoryCustom , JpaSpecificationExecutor<Expense> {
    List<Expense> filterExpenses(ExpenseFilterRequest filter, Long userId);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.id = :userId AND e.expenseDate BETWEEN :start AND :end")
    BigDecimal getTotalAmountByUserIdAndDateRange(@Param("userId") Long userId,
                                                  @Param("start") LocalDate start,
                                                  @Param("end") LocalDate end);


}
