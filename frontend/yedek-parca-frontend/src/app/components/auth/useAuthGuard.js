"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

const useAuthGuard = (allowedRoles = []) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    console.log("🟡 user:", user);
    // Kullanıcı yoksa login'e yönlendir
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Eğer sayfa role bazlıysa ve user.roles yoksa -> login'e gönder
    if (
      allowedRoles.length > 0 &&
      (!user.roles || !user.roles.some(role => allowedRoles.includes(role)))
    ) {
      router.push("/auth/login");
    }
  }, [user, allowedRoles, router]);
};

export default useAuthGuard;
