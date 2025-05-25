import { getToken } from "@/utils/tokenHelpers";



const BASE_URL = "http://localhost:8080/api/collection";

export const addCollection = async (data) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Tahsilat kaydedilemedi: " + await res.text());
  return (await res.json()).data;
};

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

  const res = await fetch(`http://localhost:8080/api/collection/search?${query}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error("Tahsilatlar alınamadı: " + errText);
  }

  return (await res.json()).data;
};

export const searchCollections = getCollections;

export const deleteCollection = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error("Silme işlemi başarısız");
  return true;
};

export const updateCollection = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Güncelleme başarısız: " + await res.text());
  return true;
};

export const fetchTahsilatlar = async (query) => {
  const queryParams = new URLSearchParams(query).toString();
  const res = await fetch(`http://localhost:8080/api/plasiyer/collections?${queryParams}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error("Tahsilatlar alınamadı");
  return res.json();
};
