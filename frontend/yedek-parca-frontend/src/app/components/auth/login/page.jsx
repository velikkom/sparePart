"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Giriş başarısız!");
      }

      const data = await res.json();
      const decoded = JSON.parse(atob(data.token.split(".")[1])); // JWT payload

      // ✅ LocalStorage'a kaydet
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.username);
      localStorage.setItem("roles", JSON.stringify(decoded.roles || []));

      // ✅ Role'a göre yönlendir
      if (decoded.roles.includes("ROLE_PLASIYER")) {
        router.push("/plasiyer/tahsilat");
      } else if (decoded.roles.includes("ROLE_ADMIN")) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }

    } catch (error) {
      alert("Giriş hatası: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Giriş Yap</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
