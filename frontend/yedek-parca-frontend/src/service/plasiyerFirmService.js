import { getToken } from "@/utils/tokenHelpers";

const API_URL = "http://localhost:8080/api/plasiyer/my-firms";

export const getMyFirms = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("❌ Atanmış firmalar getirilemedi: " + await res.text());
  }

  return await res.json();
};
