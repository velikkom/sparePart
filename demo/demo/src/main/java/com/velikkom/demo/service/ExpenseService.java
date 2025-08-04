package com.velikkom.demo.service;

import com.velikkom.demo.payload.request.AdminExpenseFilterRequest;
import com.velikkom.demo.payload.request.DateRangeRequest;
import com.velikkom.demo.payload.request.ExpenseFilterRequest;
import com.velikkom.demo.payload.request.ExpenseRequest;
import com.velikkom.demo.payload.response.ExpenseResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;

public interface ExpenseService {
    ExpenseResponse saveExpense(@Valid ExpenseRequest request, String email);

    void deleteExpense(Long id, String email);

    ExpenseResponse updateExpense(Long id, @Valid ExpenseRequest request, String email);

    List<ExpenseResponse> filterMyExpenses(ExpenseFilterRequest filter, String userEmail);

    List<ExpenseResponse> filterExpensesForAdmin(AdminExpenseFilterRequest filter);

    BigDecimal getTotalExpenseByDateRange(DateRangeRequest request, String email);

    BigDecimal getMyTotalExpenseByDate(DateRangeRequest request, String email);

    Page<ExpenseResponse> filterMyExpensesPaged(@Valid ExpenseFilterRequest filter, String email, int page, int size);

    Page<ExpenseResponse> filterExpensesForAdminPaged(AdminExpenseFilterRequest filter, int page, int size);


}
