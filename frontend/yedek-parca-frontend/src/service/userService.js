const ADMIN_BASE = "http://localhost:8080/api/admin/users";

// ✅ Doğru token alma fonksiyonu
const getToken = () => {
  return localStorage.getItem("token"); // doğru key
};

// ✅ Kullanıcıları getir
export const fetchUsers = async () => {
  try {
    console.log("📦 LocalStorage'dan gelen token:", getToken());

    const res = await fetch(`${ADMIN_BASE}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Kullanıcı listesi alınamadı:", res.status, text);
      throw new Error("Kullanıcı verisi alınamadı");
    }

    return await res.json();
  } catch (error) {
    console.error("❌ fetchUsers Hatası:", error);
    throw error;
  }
};

// ✅ Kullanıcı durumu değiştir
export const toggleUserStatus = async (id) => {
  try {
    const res = await fetch(`${ADMIN_BASE}/${id}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error("Kullanıcı durumu değiştirilemedi: " + text);
    }
  } catch (err) {
    console.error("❌ toggleUserStatus Hatası:", err);
    throw err;
  }
};

// ✅ Kullanıcı sil
export const deleteUser = async (id) => {
  try {
    const res = await fetch(`${ADMIN_BASE}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error("Kullanıcı silinemedi: " + text);
    }
  } catch (err) {
    console.error("❌ deleteUser Hatası:", err);
    throw err;
  }
};

// ✅ Rol güncelle
export const updateUserRoles = async (id, roles) => {
  try {
    const res = await fetch(`${ADMIN_BASE}/${id}/roles`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ roles }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error("Rol güncelleme hatası: " + text);
    }
  } catch (err) {
    console.error("❌ updateUserRoles Hatası:", err);
    throw err;
  }
};


//✅ Yeni kullanıcı bildirimi var mı?
export const checkNewUserAlert = async () => {
  const token = getToken();

  if (!token) {
    console.warn("🔒 Token yok, kullanıcı giriş yapmamış olabilir.");
    return false; // 🔕 Uyarı gösterme
  }

  try {
    const res = await fetch(`${ADMIN_BASE}/new-users-exist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Yeni kullanıcı durumu alınamadı");

    return await res.json(); // true/false
  } catch (err) {
    console.error("❌ Yeni kullanıcı kontrol hatası:", err);
    return false; // hata durumunda da sessizce uyarı gösterme
  }
};


//✅ Yeni kullanıcı bildirimi sıfırla
export const acknowledgeNewUsers = async () => {
  try {
    const res = await fetch(`${ADMIN_BASE}/new-users/acknowledge`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) throw new Error("Yeni kullanıcı bildirimi sıfırlanamadı");
  } catch (err) {
    console.error("❌ Bildirim sıfırlama hatası:", err);
    throw err;
  }
};


