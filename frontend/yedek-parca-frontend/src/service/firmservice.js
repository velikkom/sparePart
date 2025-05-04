const API_URL = "http://localhost:8080/api/firms";
const API_URL1 = "http://localhost:8080/api/admin/users/excel";

// ✅ Token alma fonksiyonu (user objesinden token alır)
const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) return user.token;

    // fallback: sadece 'token' anahtarı varsa onu da dene
    const token = localStorage.getItem("token");
    return token || "";
  } catch (e) {
    console.error("Token okunamadı:", e);
    return "";
  }
};

export const getAllFirms = async () => {
  const token = getToken();
  console.log("🔐 Kullanılacak token:", token);

  try {
    const res = await fetch("http://localhost:8080/api/firms", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error("❌ Firmalar alınamadı: " + errorText);
    }

    return await res.json();
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

// ✅ Excel dosyasını yükleyen metod
export const uploadFirmsExcel = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(API_URL1, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      // 'Content-Type' belirtme! fetch bunu otomatik ayarlıyor, boundary ile birlikte
    },
  });

  if (!res.ok) {
    throw new Error("Dosya yükleme başarısız.");
  }

  return await res.text(); // veya res.json() — backend ne döndürüyorsa
};