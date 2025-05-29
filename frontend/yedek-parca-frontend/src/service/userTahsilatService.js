import { getToken } from "@/utils/tokenHelpers";

export const getMyCollections = async () => {
  try {
    const res = await fetch(
      "http://localhost:8080/api/collection/my-collection",
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error("Tahsilatlar alınamadı: " + errText);
    }

    const json = await res.json();
    console.log("🔍 API FULL JSON RESPONSE:", json);

    // 🧠 Eğer json doğrudan array ise onu döndür
    if (Array.isArray(json)) {
      return json;
    }

    // 🎯 Eğer json.data varsa onu döndür
    if (json && Array.isArray(json.data)) {
      return json.data;
    }

    return []; // fallback
  } catch (error) {
    console.error("❌ Tahsilatlar alınamadı:", error.message);
    throw error; // Hata fırlat, üst katman yakalayabilir
  }
};
