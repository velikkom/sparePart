"use client";
import { useState } from "react";

import ReusableInput from "../common/reuseable-input";
import SocialMediaButtons from "../common/social-media-buttons";


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-10 w-full">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      {/* Sosyal Medya Butonları */}
      <SocialMediaButtons />

      <p className="text-gray-600 text-sm mt-2">
        or use your email for registration
      </p>

      <ReusableInput
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <ReusableInput
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <ReusableInput
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button className="w-full bg-blue-500 text-white py-3 rounded mt-4">
        Sign Up
      </button>
    </div>
  );
};

export default RegisterForm;
