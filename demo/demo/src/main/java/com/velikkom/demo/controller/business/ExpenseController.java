package com.velikkom.demo.controller.business;


import com.velikkom.demo.payload.request.AdminExpenseFilterRequest;
import com.velikkom.demo.payload.request.DateRangeRequest;
import com.velikkom.demo.payload.request.ExpenseFilterRequest;
import com.velikkom.demo.payload.request.ExpenseRequest;
import com.velikkom.demo.payload.response.ExpenseResponse;
import com.velikkom.demo.security.service.UserDetailsImpl;
import com.velikkom.demo.service.ExpenseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@Tag(name = "Expense Controller", description = "Plasiyer masraf işlemleri")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    @PreAuthorize("hasRole('PLASIYER')")
    @Operation(summary = "Yeni masraf kaydı oluşturur")
    public ResponseEntity<ExpenseResponse> addExpense(
            @Valid @RequestBody ExpenseRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        ExpenseResponse response = expenseService.saveExpense(request, userDetails.getEmail());
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PLASIYER')")
    @Operation(summary = "Masraf kaydını siler (sadece sahibi silebilir)")
    public ResponseEntity<Void> deleteExpense(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        expenseService.deleteExpense(id, userDetails.getEmail());
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PLASIYER')")
    @Operation(summary = "Masraf kaydını günceller (sadece sahibi güncelleyebilir)")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        ExpenseResponse response = expenseService.updateExpense(id, request, userDetails.getEmail());
        return ResponseEntity.ok(response);
    }


    @PostMapping("/filter")
    @PreAuthorize("hasRole('PLASIYER')")
    @Operation(summary = "Mevcut kullanıcının masraflarını filtreler")
    public ResponseEntity<List<ExpenseResponse>> filterMyExpenses(
            @Valid @RequestBody ExpenseFilterRequest filter,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        List<ExpenseResponse> results = expenseService.filterMyExpenses(filter, userDetails.getEmail());
        return ResponseEntity.ok(results);
    }



    @PostMapping("/admin/filter")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Tüm kullanıcıların masraflarını filtreler (admin)")
    public ResponseEntity<List<ExpenseResponse>> filterExpensesForAdmin(
            @RequestBody AdminExpenseFilterRequest filter
    ) {
        List<ExpenseResponse> results = expenseService.filterExpensesForAdmin(filter);
        return ResponseEntity.ok(results);
    }


    @PostMapping("/total-by-date")
    @PreAuthorize("hasRole('PLASIYER')")
    @Operation(summary = "Belirli bir tarih aralığına göre toplam harcamayı döner")
    public ResponseEntity<BigDecimal> getTotalByDateRange(
            @RequestBody DateRangeRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        BigDecimal total = expenseService.getTotalExpenseByDateRange(request, userDetails.getEmail());
        return ResponseEntity.ok(total);
    }


    @PostMapping("/admin/total-by-date")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Plasiyer: Belirli tarihler arasındaki toplam harcamasını döner")
    public ResponseEntity<BigDecimal> getMyTotalByDateRange(
            @RequestBody DateRangeRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        BigDecimal total = expenseService.getMyTotalExpenseByDate(request, userDetails.getEmail());
        return ResponseEntity.ok(total);
    }




}
