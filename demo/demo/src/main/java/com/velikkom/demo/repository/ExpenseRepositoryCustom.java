package com.velikkom.demo.repository;

import com.velikkom.demo.entity.concretes.business.Expense;
import com.velikkom.demo.payload.request.AdminExpenseFilterRequest;
import com.velikkom.demo.payload.request.ExpenseFilterRequest;

import java.util.List;

public interface ExpenseRepositoryCustom {
    List<Expense> filterExpenses(ExpenseFilterRequest filter, Long userId);
    List<Expense> filterExpensesForAdmin(AdminExpenseFilterRequest filter);

}
