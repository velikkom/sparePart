"use client";

import React from "react";

const TahsilatFormInputs = ({
  amount,
  setAmount,
  paymentType,
  setPaymentType,
  receiptNumber,
  setReceiptNumber,
}) => {
  return (
    <>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Tutar</label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Ödeme Tipi</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="">Seçin</option>
            <option value="CASH">Nakit</option>
            <option value="CHECK">Çek</option>
            <option value="CREDIT_CARD">Kredi Kartı</option>
            <option value="BANK_TRANSFER">Banka Transferi</option>
            <option value="NOTE">Senet</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Makbuz No</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={receiptNumber}
          onChange={(e) => setReceiptNumber(e.target.value)}
        />
      </div>
    </>
  );
};

export default TahsilatFormInputs;
