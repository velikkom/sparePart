"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthGuard from "@/helpers/hooks/useAuthGuard";

export default function DashboardPage() {
  useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Eğer token yoksa kullanıcıyı login sayfasına gönder
    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  return <div>Dashboard Page</div>;
}

