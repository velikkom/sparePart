"use client";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";

const FormInput = ({ label, type = "text", id, value, onChange }) => {
  return (
    <div className="w-full">
      <FloatLabel>
        {type === "password" ? (
          <Password
            id={id}
            value={value}
            onChange={onChange}
            toggleMask
            feedback={false}
            className="w-full"
          />
        ) : (
          <InputText
            id={id}
            value={value}
            onChange={onChange}
            className="w-full"
          />
        )}
        <label htmlFor={id}>{label}</label>
      </FloatLabel>
    </div>
  );
};

export default FormInput;
