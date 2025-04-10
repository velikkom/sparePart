import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // ✅ Backend URL burada
});

axiosInstance.interceptors.request.use((config) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData?.token || localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
