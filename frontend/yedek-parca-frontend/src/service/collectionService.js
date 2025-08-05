import { getSession } from "next-auth/react";

const BASE_URL = "http://localhost:8080/api/collection";

// 🔑 Token'ı NextAuth session'dan alma fonksiyonu
const getToken = async () => {
  try {
    const session = await getSession();
    return session?.accessToken || "";
  } catch (error) {
    console.error("Token alınamadı:", error);
    return "";
  }
};

// 🔹 Tahsilat ekleme
export const addCollection = async (data) => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Tahsilat kaydedilemedi: " + await res.text());
  return (await res.json()).data;
};

// 🔹 Admin için tüm tahsilatları çek (Eski kullanım - full liste)
export const getAllCollections = async () => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/all`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) throw new Error("Admin tahsilatları alınamadı");
  return await res.json();
};

// 🔹 Plasiyer için kendi tahsilatlarını çek
export const getMyCollections = async () => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/my-collection`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) throw new Error("Plasiyer tahsilatları alınamadı");
  return await res.json();
};

// 🔍 Filtreli arama + Pagination
// 🔍 Filtreli arama + Pagination (Admin ve Plasiyer ortak)
export const getCollections = async (queryParams = {}) => {
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const formatAmount = (val) =>
    val === null || val === undefined || val === "" ? undefined : val;

  const cleanQuery = Object.fromEntries(
    Object.entries({
      ...queryParams,
      startDate: formatDate(queryParams.startDate),
      endDate: formatDate(queryParams.endDate),
      minAmount: formatAmount(queryParams.minAmount),
      maxAmount: formatAmount(queryParams.maxAmount),
    }).filter(([_, v]) => v !== undefined && v !== "")
  );

  const query = new URLSearchParams(cleanQuery).toString();

  // ✅ Token'ı al
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/search?${query}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error("Tahsilatlar alınamadı: " + errText);
  }

  const response = await res.json();

  // ✅ Artık ResponseWrapper yok, doğrudan Page objesi geliyor
  return {
    content: response.content || [],
    totalPages: response.totalPages || 0,
    totalElements: response.totalElements || 0,
    size: response.size || 10,
    number: response.number || 0,
  };
};


export const searchCollections = getCollections;

// 🔹 Tahsilat silme
export const deleteCollection = async (id) => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  if (!res.ok) throw new Error("Silme işlemi başarısız");
  return true;
};

// 🔹 Tahsilat güncelleme
export const updateCollection = async (id, data) => {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Güncelleme başarısız: " + await res.text());
  return true;
};

// 🔹 Plasiyer tahsilatlarını farklı endpointten çekme (varsa kullanım)
export const fetchTahsilatlar = async (query) => {
  const token = await getToken();
  const queryParams = new URLSearchParams(query).toString();

  const res = await fetch(
    `http://localhost:8080/api/plasiyer/collections?${queryParams}`, 
    {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    }
  );

  if (!res.ok) throw new Error("Tahsilatlar alınamadı");
  return res.json();
};
