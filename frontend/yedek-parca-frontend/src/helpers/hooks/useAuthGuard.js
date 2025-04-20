"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const useAuthGuard = (requiredRole = null) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // Token süresi dolmuşsa
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        router.push("/auth/login");
        return;
      }

      // Eğer role kontrolü istiyorsak
      if (requiredRole && !decoded.roles?.includes(requiredRole)) {
        router.push("/unauthorized");
        return;
      }
    } catch (err) {
      console.error("Geçersiz token:", err);
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
  }, [requiredRole]);
};

export default useAuthGuard;
