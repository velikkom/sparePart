"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      alert("✅ Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      router.push("/auth/login");
    } else {
      alert("❌ Kayıt başarısız! Lütfen tekrar deneyin.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-4 p-6 border rounded shadow"
    >
      <h2 className="text-2xl font-bold text-center">Kayıt Ol</h2>

      <input
        type="text"
        placeholder="Kullanıcı Adı"
        className="border p-2 w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Şifre"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
      >
        Kayıt Ol
      </button>

      <p className="text-center text-sm text-gray-600">
        Zaten hesabınız var mı?{" "}
        <a
          href="/auth/login"
          className="text-blue-600 hover:underline font-medium"
        >
          Giriş Yap
        </a>
      </p>
    </form>
  );
}
