"use client";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

const FloatLabelInput = () => {
  const [value, setValue] = useState("");

  return (
    <div className="p-4">
      <FloatLabel>
        <InputText
          id="username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label htmlFor="username">Username</label>
      </FloatLabel>
    </div>
  );
};

export default FloatLabelInput;
