import React from 'react';
import { InputText } from 'primereact/inputtext';

const DefaultInput = ({ label, value, onChange, placeholder, error, name, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <InputText
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${error ? 'p-invalid' : ''}`}
        style={{ height: '40px', padding: '8px' }}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default DefaultInput;
