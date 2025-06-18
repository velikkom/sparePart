package com.velikkom.demo.service.business;

import com.velikkom.demo.entity.concretes.business.Expense;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.exception.ResourceNotFoundException;
import com.velikkom.demo.mapper.ExpenseMapper;
import com.velikkom.demo.payload.request.AdminExpenseFilterRequest;
import com.velikkom.demo.payload.request.DateRangeRequest;
import com.velikkom.demo.payload.request.ExpenseFilterRequest;
import com.velikkom.demo.payload.request.ExpenseRequest;
import com.velikkom.demo.payload.response.ExpenseResponse;
import com.velikkom.demo.repository.ExpenseRepository;
import com.velikkom.demo.repository.UserRepository;
import com.velikkom.demo.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final ExpenseMapper expenseMapper;


    @Override
    public ExpenseResponse saveExpense(ExpenseRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı: " + userEmail));

        Expense expense = expenseMapper.toEntity(request, user);
        expenseRepository.save(expense);

        return expenseMapper.toResponse(expense);
    }


    @Override
    public void deleteExpense(Long expenseId, String userEmail) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Masraf bulunamadı: " + expenseId));

        // Güvenlik kontrolü: sadece sahibi silebilir
        if (!expense.getUser().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("Bu masrafı silme yetkiniz yok.");
        }

        expenseRepository.delete(expense);
    }


    @Override
    public ExpenseResponse updateExpense(Long id, ExpenseRequest request, String userEmail) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Masraf bulunamadı: " + id));

        // Sadece sahibi güncelleyebilir
        if (!expense.getUser().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("Bu masrafı güncelleme yetkiniz yok.");
        }

        // Güncellenebilir alanlar
        expense.setExpenseDate(request.getExpenseDate());
        expense.setType(request.getType());
        expense.setAmount(request.getAmount());

        expenseRepository.save(expense);
        return expenseMapper.toResponse(expense);
    }

    @Override
    public List<ExpenseResponse> filterMyExpenses(ExpenseFilterRequest filter, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı: " + userEmail));

        List<Expense> filteredExpenses = expenseRepository.filterExpenses(filter, user.getId());

        return filteredExpenses.stream()
                .map(expenseMapper::toResponse)
                .toList();
    }

    @Override
    public List<ExpenseResponse> filterExpensesForAdmin(AdminExpenseFilterRequest filter) {
        List<Expense> expenses = expenseRepository.filterExpensesForAdmin(filter);
        return expenses.stream()
                .map(expenseMapper::toResponse)
                .toList();
    }

    @Override
    public BigDecimal getTotalExpenseByDateRange(DateRangeRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı"));

        BigDecimal total = expenseRepository.getTotalAmountByUserIdAndDateRange(
                user.getId(),
                request.getStartDate(),
                request.getEndDate()
        );

        return total != null ? total : BigDecimal.ZERO;
    }

    @Override
    public BigDecimal getMyTotalExpenseByDate(DateRangeRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı"));

        BigDecimal total = expenseRepository.getTotalAmountByUserIdAndDateRange(
                user.getId(),
                request.getStartDate(),
                request.getEndDate()
        );

        return total != null ? total : BigDecimal.ZERO;
    }




}
