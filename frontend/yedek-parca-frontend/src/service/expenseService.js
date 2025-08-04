import { getToken } from "@/utils/tokenHelpers";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

/**
 * ✅ Kullanıcının sayfalı masraf filtreleme
 */
export async function getMyFilteredExpensesPaged(filter, page = 0, size = 10) {
  const token = getToken();

  const response = await fetch(`${API_BASE}/expenses/filter/paged?page=${page}&size=${size}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(filter),
  });

  if (!response.ok) {
    throw new Error("Harcamalar alınamadı");
  }

  return await response.json(); // Page<ExpenseResponse>
}

/**
 * ✅ Kullanıcının toplam harcaması
 */
export async function getMyTotalExpenseByDate(filter) {
  const token = getToken();

  const response = await fetch(`${API_BASE}/expenses/total-by-date`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(filter),
  });

  if (!response.ok) {
    throw new Error("Toplam harcama alınamadı");
  }

  return await response.json();
}

/**
 * ✅ Yeni masraf ekleme
 */
export async function createExpense(expenseData) {
  const token = getToken();

  const response = await fetch(`${API_BASE}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    throw new Error("Harcama kaydedilemedi");
  }

  return await response.json();
}

/**
 * ✅ Harcama güncelleme
 */
export async function updateExpense(id, expenseData) {
  const token = getToken();

  const response = await fetch(`${API_BASE}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    throw new Error("Harcama güncellenemedi");
  }

  return await response.json();
}

/**
 * ✅ Harcama silme
 */
export async function deleteExpense(id) {
  const token = getToken();

  const response = await fetch(`${API_BASE}/expenses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Harcama silinemedi");
  }

  return true;
}
