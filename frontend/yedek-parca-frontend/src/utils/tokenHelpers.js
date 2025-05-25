export const getToken = () => {
  try {
    return localStorage.getItem("token") || "";
  } catch (e) {
    console.error("Token okunamadı:", e);
    return "";
  }
};
