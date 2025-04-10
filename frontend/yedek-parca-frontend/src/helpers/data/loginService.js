import axiosInstance from "./axiosInstance"; // veya direkt axios da kullanabilirsin

export const loginUser = async (loginRequest) => {
  const response = await axiosInstance.post("/auth/login", loginRequest);
  return response.data; // { token: "...", username: "...", roles: [...] }
};

