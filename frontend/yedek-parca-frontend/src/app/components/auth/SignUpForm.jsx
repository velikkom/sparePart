// SignUpForm.jsx
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Button } from "primereact/button";
import SocialMediaButtons from "../common/social-media-buttons";

// Yup doğrulama şeması tanımlama
const signUpSchema = yup.object({
  name: yup.string().required("İsim zorunludur"),
  email: yup.string().email("Geçerli bir e-posta giriniz").required("E-posta zorunludur"),
  password: yup.string().min(6, "Şifre en az 6 karakter olmalıdır").required("Şifre zorunludur"),
}).required();

const SignUpForm = ({ toggleMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signUpSchema)
  });

  const onSubmit = (data) => {
    console.log("Signing up with:", data);
    Swal.fire({
      icon: 'success',
      title: 'Kayıt Başarılı',
      text: 'Hesap oluşturuldu!'
    });
  };

  return (
    <div className="p-8 w-[450px]">
      <h2 className="text-3xl font-bold text-center mt-8">Create Account</h2>
      <SocialMediaButtons />
      <p className="text-center text-gray-500 text-sm my-2">or use your email for registration</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="border p-2 w-full rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="border p-2 w-full rounded"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="border p-2 w-full rounded"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <Button
          label="Sign Up"
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white text-lg px-6 py-3 rounded-md"
        />
      </form>

      <p className="text-center text-gray-600 text-sm mt-4">
        Already have an account?{" "}
        <span
          className="text-red-500 cursor-pointer hover:underline"
          onClick={toggleMode}
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default SignUpForm;
