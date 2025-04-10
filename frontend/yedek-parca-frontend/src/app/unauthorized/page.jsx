"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Erişim Reddedildi</h1>
        <p className="text-gray-700 mb-2">
          Bu sayfaya erişim izniniz yok. Lütfen yetkili bir kullanıcı ile giriş yapınız.
        </p>
        <p className="text-gray-500 text-sm">Giriş sayfasına yönlendiriliyorsunuz...</p>
      </div>
    </div>
  );
}
