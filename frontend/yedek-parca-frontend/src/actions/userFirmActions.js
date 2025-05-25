import Swal from "sweetalert2";
import {
  assignFirmToUser,
  getAssignedFirms,
  getAllFirmAssignments,
} from "@/service/userFirmService";
import { fetchUsers  } from "@/service/userService";

// 📦 PLASİYER PANELİNE AİT METOTLAR

/**
 * Belirli bir kullanıcıya atanmış firmaları getirir
 */
export async function fetchAssignedFirms(userId, setFirms, setLoading) {
  try {
    setLoading(true);
    const response = await getAssignedFirms(userId);
    if (response.success) {
      setFirms(response.data);
    }
  } catch (err) {
    console.error("Atanmış firmalar alınamadı:", err);
  } finally {
    setLoading(false);
  }
}

/**
 * Belirli kullanıcıya firma atama işlemi
 */
export async function handleAssignFirm(userId, firmId, onSuccess, onError) {
  try {
    const response = await assignFirmToUser(userId, firmId);
    if (response.success) {
      onSuccess?.(response.message);
    } else {
      onError?.(response.message);
    }
  } catch (err) {
    onError?.(err.message);
  }
}

/**
 * Belirli kullanıcıdan firma atamasını kaldır
 */
export const handleUnassignFirm = async (userId, firmId, onSuccess, onError) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-firms/unassign?userId=${userId}&firmId=${firmId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const raw = await response.text();
      throw new Error("Sunucu JSON dışında bir veri döndürdü: " + raw);
    }

    const result = await response.json();
    if (response.ok && result.success) {
      onSuccess?.(result.message || "Firma ataması kaldırıldı");
    } else {
      onError?.(result.message || "İşlem başarısız");
    }
  } catch (error) {
    console.error("❌ Kaldırma hatası:", error);
    onError?.("Sunucu hatası: " + error.message);
  }
};

// 📦 ADMIN PANELİNE AİT METOTLAR

/**
 * Tüm firmaları ve kullanıcıları getir (atama görünümü için)
 */
export async function fetchAllFirmAssignmentsAndUsers(setFirmAssignments, setUsers, setLoading) {
  try {
    setLoading(true);

    const [firmData, userData] = await Promise.all([
      getAllFirmAssignments(),  // bu kaldı
      fetchUsers(),             // ✅ düzeltilmiş hali bu
    ]);

    setFirmAssignments(firmData);
    setUsers(userData);
  } catch (error) {
    console.error("Veri alınırken hata:", error.message);
  } finally {
    setLoading(false);
  }
}

/**
 * Admin: firma → kullanıcıya ilk atama
 */
export async function adminAssignFirm(firmId, userId, callback) {
  try {
    await assignFirmToUser(userId, firmId);
    Swal.fire("Başarılı", "Firma atandı", "success");
    callback?.();
  } catch (err) {
    Swal.fire("Hata", err.message, "error");
  }
}

/**
 * Admin: firma → başka kullanıcıya devret
 */
export async function adminReassignFirm(firmId, newUserId, callback) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-firms/reassign?firmId=${firmId}&newUserId=${newUserId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!res.ok) throw new Error("Güncelleme başarısız");
    Swal.fire("Başarılı", "Firma yeniden atandı", "success");
    callback?.();
  } catch (err) {
    Swal.fire("Hata", err.message, "error");
  }
}

/**
 * Admin: firma atamasını tamamen kaldır
 */
export async function adminUnassignFirm(firmId, callback) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-firms/unassign?firmId=${firmId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!res.ok) throw new Error("Kaldırma başarısız");
    Swal.fire("Başarılı", "Firma ataması kaldırıldı", "success");
    callback?.();
  } catch (err) {
    Swal.fire("Hata", err.message, "error");
  }
}
