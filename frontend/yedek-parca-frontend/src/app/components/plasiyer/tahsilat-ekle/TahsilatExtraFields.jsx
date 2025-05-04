"use client";

import React from "react";

const TahsilatExtraFields = ({ form, handleChange }) => {
  return (
    <>
      {form.paymentMethod === "CHECK" && (
        <>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Çek Banka Adı</label>
            <input
              type="text"
              name="checkBankName"
              value={form.checkBankName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Çek Vade Tarihi</label>
            <input
              type="date"
              name="checkDueDate"
              value={form.checkDueDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </>
      )}

      {form.paymentMethod === "NOTE" && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Senet Vade Tarihi</label>
          <input
            type="date"
            name="noteDueDate"
            value={form.noteDueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      )}
    </>
  );
};

export default TahsilatExtraFields;
