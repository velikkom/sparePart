const BASE_URL = "http://localhost:8080/api/collection";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token || "";
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
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const res = await fetch(`http://localhost:8080/api/collection/search?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Tahsilatlar alınamadı");

  const result = await res.json();
  return result.data;
};

// ✅ Tahsilat sil
export const deleteCollection = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await fetch(`http://localhost:8080/api/collections/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Silme işlemi başarısız");
  }

  return true;
};

// ✅ Tahsilat güncelle
export const updateCollection = async (id, data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await fetch(`http://localhost:8080/api/collection/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error("Güncelleme başarısız: " + error);
  }

  return true;
};

