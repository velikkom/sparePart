"use client";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormInput = ({ label, type = "text", id, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full relative">
      <FloatLabel>
        {type === "password" ? (
          <div className="relative w-full">
            <input
              id={id}
              name={name} // ✅ name özelliği eklendi
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={onChange}
              className="w-full p-3 border rounded-md outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        ) : (
          <InputText
            id={id}
            name={name} // ✅ name özelliği eklendi
            value={value}
            onChange={onChange}
            className="w-full p-3 border rounded-md outline-none"
          />
        )}
        <label htmlFor={id}>{label}</label>
      </FloatLabel>
    </div>
  );
};

export default FormInput;
