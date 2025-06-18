package com.velikkom.demo.mapper;

import com.velikkom.demo.entity.concretes.business.Expense;
import com.velikkom.demo.entity.concretes.user.User; // ✅ Senin User entity'nin doğru paketi

import com.velikkom.demo.payload.request.ExpenseRequest;
import com.velikkom.demo.payload.response.ExpenseResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ExpenseMapper {

    private final ModelMapper modelMapper;

    public Expense toEntity(ExpenseRequest request, User user) {
        Expense expense = modelMapper.map(request, Expense.class);
        expense.setUser(user); // login olan kullanıcıyı set ediyoruz
        return expense;
    }

    public ExpenseResponse toResponse(Expense expense) {
        ExpenseResponse response = modelMapper.map(expense, ExpenseResponse.class);
        response.setUserEmail(expense.getUser().getEmail());
        return response;
    }
}
