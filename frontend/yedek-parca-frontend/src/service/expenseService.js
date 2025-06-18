import { getToken } from "@/utils/tokenHelpers"; // JWT token alıyorsan buradan çek

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export async function getMyFilteredExpenses(filter) {
  const token = getToken();

  const response = await fetch(`${API_BASE}/expenses/filter`, {
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

  return await response.json();
}


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

  
