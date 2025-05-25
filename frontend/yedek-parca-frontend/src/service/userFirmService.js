import { getToken } from "@/utils/tokenHelpers";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

function authHeader() {
  const token = getToken();
  console.log("Token:", token);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Admin: Kullanıcıya firma atar
 */
export async function assignFirmToUser(userId, firmId) {
  const res = await fetch(`${BASE_URL}/user-firms/assign?userId=${userId}&firmId=${firmId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Firma atama başarısız.");
  }

  return res.json(); // ⛔️ burası hata veriyor çünkü response body boş
}


/**
 * Kullanıcının atanmış firmalarını getirir
 */
export async function getAssignedFirms(userId) {
  try {
    const res = await fetch(`${BASE_URL}/user-firms/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        ...authHeader(),
      },
    });

    console.log("Assigned Firms Response:", res);

    if (!res.ok) {
      const errorText = await res.text();
      console.warn("⚠️ Backend response not OK:", errorText);
      return {
        success: false,
        data: [],
        message: errorText || "Firma listesi getirilemedi.",
      };
    }

    const json = await res.json();

    // Extra guard: data boş ama success true ise yine sorun çıkmasın
    return {
      success: true,
      data: Array.isArray(json.data) ? json.data : [],
      message: json.message || "Atanmış firmalar yüklendi.",
    };
  } catch (err) {
    console.error("❌ Atanmış firmalar alınamadı:", err.message);
    return {
      success: false,
      data: [],
      message: "Bir hata oluştu: " + err.message,
    };
  }
}

export async function getAllFirmAssignments() {
  const res = await fetch(`${BASE_URL}/user-firms/assignments-view`, {
    method: "GET",
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) throw new Error("Firmalar alınamadı");

  return res.json(); // response: [{firmId, firmName, assignedUserId, assignedUserName}]
}

