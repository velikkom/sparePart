"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Button } from "primereact/button";
import SocialMediaButtons from "../common/social-media-buttons";
import { useRouter } from "next/navigation";
import AuthService from "../../../service/auth-service"; // Service importu

// Yup doğrulama şeması
const schema = yup
  .object({
    email: yup
      .string()
      .email("Geçerli bir e-posta giriniz")
      .required("E-posta zorunludur"),
    password: yup
      .string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .required("Şifre zorunludur"),
  })
  .required();

const SignInForm = ({ toggleMode }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await AuthService.login(data.email, data.password);

      console.log("Giriş başarılı, sunucudan gelen yanıt:", result);

      Swal.fire({
        icon: "success",
        title: "Giriş Başarılı",
        text: "Hoş geldiniz!",
      });

      // Giriş başarılı ise dashboard sayfasına yönlendiriyoruz
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Giriş Hatası",
        text: error.message || "Bir hata oluştu",
      });
    }
  };

  return (
    <div
      className="p-8 w-[450px] "
      style={{
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      <div className="flex justify-center mb-6 ">
        <div className="flex flex-center gap-4 ">
          <SocialMediaButtons />
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mb-6">
        or use your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="border p-2 w-full rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="border p-2 w-full rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 cursor-pointer hover:underline">
          Forgot your password?
        </p>

        <Button
          label="Sign In"
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white h-12"
        />
      </form>

      <p className="text-center text-gray-600 text-sm mt-6">
        Don't have an account?{" "}
        <span
          className="text-red-500 cursor-pointer hover:underline"
          onClick={toggleMode}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default SignInForm;
