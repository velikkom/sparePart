package com.velikkom.demo.service.impl;

import com.velikkom.demo.entity.concretes.business.Expense;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.mapper.ExpenseMapper;
import com.velikkom.demo.payload.request.AdminExpenseFilterRequest;
import com.velikkom.demo.payload.request.DateRangeRequest;
import com.velikkom.demo.payload.request.ExpenseFilterRequest;
import com.velikkom.demo.payload.request.ExpenseRequest;
import com.velikkom.demo.payload.response.ExpenseResponse;
import com.velikkom.demo.repository.ExpenseRepository;
import com.velikkom.demo.repository.UserRepository;
import com.velikkom.demo.service.ExpenseService;
import com.velikkom.demo.util.ExpenseSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final ExpenseMapper expenseMapper;

    @Override
    @Transactional
    public ExpenseResponse saveExpense(ExpenseRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        Expense expense = expenseMapper.toEntity(request, user);
        Expense savedExpense = expenseRepository.save(expense);
        return expenseMapper.toResponse(savedExpense);
    }

    @Override
    @Transactional
    public void deleteExpense(Long id, String email) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Masraf bulunamadı"));

        if (!expense.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Bu masrafı silmeye yetkiniz yok");
        }

        expenseRepository.delete(expense);
    }

    @Override
    @Transactional
    public ExpenseResponse updateExpense(Long id, ExpenseRequest request, String email) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Masraf bulunamadı"));

        if (!expense.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Bu masrafı güncellemeye yetkiniz yok");
        }

        Expense updatedExpense = expenseMapper.toEntity(request, expense.getUser());
        updatedExpense.setId(expense.getId());

        Expense savedExpense = expenseRepository.save(updatedExpense);
        return expenseMapper.toResponse(savedExpense);
    }

    @Override
    public List<ExpenseResponse> filterMyExpenses(ExpenseFilterRequest filter, String userEmail) {
        List<Expense> expenses = expenseRepository.findAll(
                ExpenseSpecification.forUser(userEmail, filter)
        );
        return expenses.stream().map(expenseMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<ExpenseResponse> filterExpensesForAdmin(AdminExpenseFilterRequest filter) {
        List<Expense> expenses = expenseRepository.findAll(
                ExpenseSpecification.forAdmin(filter)
        );
        return expenses.stream().map(expenseMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public BigDecimal getTotalExpenseByDateRange(DateRangeRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        return expenseRepository.getTotalAmountByUserIdAndDateRange(
                user.getId(),
                request.getStartDate(),
                request.getEndDate()
        );
    }

    @Override
    public BigDecimal getMyTotalExpenseByDate(DateRangeRequest request, String email) {
        return getTotalExpenseByDateRange(request, email);
    }

    @Override
    public Page<ExpenseResponse> filterMyExpensesPaged(ExpenseFilterRequest filter, String email, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("expenseDate").descending());
        return expenseRepository.findAll(
                ExpenseSpecification.forUser(email, filter),
                pageable
        ).map(expenseMapper::toResponse);
    }

    @Override
    public Page<ExpenseResponse> filterExpensesForAdminPaged(AdminExpenseFilterRequest filter, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("expenseDate").descending());
        return expenseRepository.findAll(
                ExpenseSpecification.forAdmin(filter),
                pageable
        ).map(expenseMapper::toResponse);
    }
}
