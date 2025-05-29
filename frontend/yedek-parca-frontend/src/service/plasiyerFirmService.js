import { getToken } from "@/utils/tokenHelpers";

const BASE_URL = "http://localhost:8080/api/plasiyer";

export const getMyFirms = async () => {
  const res = await fetch(`${BASE_URL}/my-firms`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Firmalar alınamadı: " + errorText);
  }

  return await res.json();
};
