"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // DOĞRU ✅


const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const decoded = jwtDecode(token); // ✅ doğru kullanım

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    } catch (err) {
      console.error("Geçersiz token:", err);
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
  }, []);
};

export default useAuthGuard;
