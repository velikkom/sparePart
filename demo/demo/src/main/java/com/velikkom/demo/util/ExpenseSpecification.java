package com.velikkom.demo.util;

import com.velikkom.demo.entity.concretes.business.Expense;
import com.velikkom.demo.payload.request.AdminExpenseFilterRequest;
import com.velikkom.demo.payload.request.ExpenseFilterRequest;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ExpenseSpecification {

    public static Specification<Expense> forUser(String email, ExpenseFilterRequest filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("user").get("email"), email));

            if (filter.getType() != null) {
                predicates.add(cb.equal(root.get("type"), filter.getType()));
            }
            if (filter.getStartDate() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("expenseDate"), filter.getStartDate()));
            }
            if (filter.getEndDate() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("expenseDate"), filter.getEndDate()));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Expense> forAdmin(AdminExpenseFilterRequest filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // ✅ UserId ile filtre
            if (filter.getUserId() != null) {
                predicates.add(cb.equal(root.get("user").get("id"), filter.getUserId()));
            }
            if (filter.getType() != null) {
                predicates.add(cb.equal(root.get("type"), filter.getType()));
            }
            if (filter.getStartDate() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("expenseDate"), filter.getStartDate()));
            }
            if (filter.getEndDate() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("expenseDate"), filter.getEndDate()));
            }
            if (filter.getMinAmount() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("amount"), filter.getMinAmount()));
            }
            if (filter.getMaxAmount() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("amount"), filter.getMaxAmount()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
