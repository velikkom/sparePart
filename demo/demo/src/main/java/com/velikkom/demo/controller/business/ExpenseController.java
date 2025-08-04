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
import org.springframework.data.domain.Page;
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

    // ✅ Kullanıcının tüm masrafları (List döner)
    @PostMapping("/filter")
    @PreAuthorize("hasRole('PLASIYER')")
    @Operation(summary = "Mevcut kullanıcının masraflarını filtreler (liste döner)")
    public ResponseEntity<List<ExpenseResponse>> filterMyExpenses(
            @Valid @RequestBody ExpenseFilterRequest filter,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        List<ExpenseResponse> results = expenseService.filterMyExpenses(filter, userDetails.getEmail());
        return ResponseEntity.ok(results);
    }

    // ✅ Kullanıcının masrafları (Pagination)
    @PostMapping("/filter/paged")
    @PreAuthorize("hasRole('PLASIYER')")
    @Operation(summary = "Mevcut kullanıcının masraflarını sayfalı şekilde filtreler")
    public ResponseEntity<Page<ExpenseResponse>> filterMyExpensesPaged(
            @Valid @RequestBody ExpenseFilterRequest filter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        Page<ExpenseResponse> results = expenseService.filterMyExpensesPaged(filter, userDetails.getEmail(), page, size);
        return ResponseEntity.ok(results);
    }

    // ✅ Admin tüm masrafları (List)
    @PostMapping("/admin/filter")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Admin tüm kullanıcıların masraflarını filtreler (liste döner)")
    public ResponseEntity<List<ExpenseResponse>> filterExpensesForAdmin(
            @RequestBody AdminExpenseFilterRequest filter
    ) {
        List<ExpenseResponse> results = expenseService.filterExpensesForAdmin(filter);
        return ResponseEntity.ok(results);
    }

    // ✅ Admin tüm masrafları (Pagination)
    @PostMapping("/admin/filter/paged")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Admin tüm kullanıcıların masraflarını sayfalı şekilde filtreler")
    public ResponseEntity<Page<ExpenseResponse>> filterExpensesForAdminPaged(
            @RequestBody AdminExpenseFilterRequest filter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ExpenseResponse> results = expenseService.filterExpensesForAdminPaged(filter, page, size);
        return ResponseEntity.ok(results);
    }

    // ✅ Toplam harcama (Plasiyer)
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

    // ✅ Admin belirli plasiyer için toplam harcama
    @PostMapping("/admin/total-by-date")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Admin belirli bir kullanıcının belirli tarihler arasındaki toplam harcamasını döner")
    public ResponseEntity<BigDecimal> getMyTotalByDateRange(
            @RequestBody DateRangeRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        BigDecimal total = expenseService.getMyTotalExpenseByDate(request, userDetails.getEmail());
        return ResponseEntity.ok(total);
    }
}
