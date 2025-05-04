const BASE_URL = "http://localhost:8080/api/collection";

// ✅ Ortak token alma fonksiyonu
const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) return user.token;

    const token = localStorage.getItem("token");
    return token || "";
  } catch (e) {
    console.error("Token okunamadı:", e);
    return "";
  }
};

// ✅ Tahsilat ekle
export const addCollection = async (data) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error("Tahsilat kaydedilemedi: " + errMsg);
  }

  const result = await res.json();
  return result.data;
};

// ✅ Tahsilatları filtrele
export const getCollections = async (queryParams = {}) => {
  const query = new URLSearchParams(queryParams).toString();
  const res = await fetch(`${BASE_URL}/search?${query}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error("Tahsilatlar alınamadı: " + errMsg);
  }

  const result = await res.json();
  return result.data;
};

// ✅ Tahsilatları ara
export const searchCollections = async (queryParams = {}) => {
  const query = new URLSearchParams(queryParams).toString();

  const res = await fetch(`${BASE_URL}/search?${query}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Tahsilatlar alınamadı");

  const result = await res.json();
  return result.data;
};

// ✅ Tahsilat sil
export const deleteCollection = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Silme işlemi başarısız");
  }

  return true;
};

// ✅ Tahsilat güncelle
export const updateCollection = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error("Güncelleme başarısız: " + error);
  }

  return true;
};
