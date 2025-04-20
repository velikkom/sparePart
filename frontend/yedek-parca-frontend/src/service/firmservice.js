// src/services/firmservice.js

const API_URL = "http://localhost:8080/api/firms";

// ✅ Token'ı localStorage'dan güvenli bir şekilde al
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token || "";
};

// ✅ Tüm firmaları getir
export const getAllFirms = async () => {
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error("Firmalar alınamadı: " + errorText);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("❌ getAllFirms hatası:", error);
    throw error;
  }
};

// ✅ ID ile firma getir
export const getFirmById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      throw new Error("Firma bulunamadı");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("❌ getFirmById hatası:", error);
    throw error;
  }
};

// ✅ Yeni firma oluştur
export const createFirm = async (firmData) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(firmData),
    });

    if (!res.ok) {
      throw new Error("Firma oluşturulamadı");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("❌ createFirm hatası:", error);
    throw error;
  }
};

// ✅ Firma güncelle
export const updateFirm = async (id, firmData) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(firmData),
    });

    if (!res.ok) {
      throw new Error("Firma güncellenemedi");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("❌ updateFirm hatası:", error);
    throw error;
  }
};

// ✅ Firma sil
export const deleteFirm = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      throw new Error("Firma silinemedi");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("❌ deleteFirm hatası:", error);
    throw error;
  }
};
