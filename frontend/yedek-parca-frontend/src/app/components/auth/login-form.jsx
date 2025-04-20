"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function LoginForm() {
  const [email, setEmail] = useState(process.env.NODE_ENV === "development" ? "admin@example.com" : "");
  const [password, setPassword] = useState(process.env.NODE_ENV === "development" ? "Admin123!" : "");
  
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  
    if (result.ok) {
      const session = await getSession();
      const token = session?.accessToken;
      if (token) {
        localStorage.setItem("token", token);
      }
      router.push("/dashboard");
    } else {
      // 🔥 Hata mesajını result.error'dan al
      Swal.fire({
        icon: "error",
        title: "Giriş Başarısız",
        text: result.error || "Beklenmeyen bir hata oluştu",
        confirmButtonText: "Kapat",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-2 p-2 w-full"
        required
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 p-2 w-full pr-10"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Giriş Yap
      </button>

      <p className="text-center text-sm text-gray-600">
        Hesabınız yok mu?{" "}
        <a href="/auth/register" className="text-blue-600 hover:underline font-medium">
          Kayıt Ol
        </a>
      </p>
    </form>
  );
}
