"use client";

import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ExpenseTypeOptions } from "@/helpers/expenseTypes";

export default function HarcamaEkleForm({ onSubmit }) {
  const [expenseDate, setExpenseDate] = useState(null);
  const [type, setType] = useState(null);
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
  
    const formattedDate = expenseDate?.toISOString().split("T")[0]; // 👈 ISO'dan sadece tarih kısmını al
  
    const newExpense = {
      expenseDate: formattedDate, // ✅ artık "2025-06-13" gibi bir string
      type,
      amount
    };
  
    try {
      await onSubmit(newExpense);
  
      // Alanları temizle
      setExpenseDate(null);
      setType(null);
      setAmount(null);
    } catch (err) {
      console.error("Harcama kaydedilemedi", err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-4 p-4 bg-white rounded shadow-md max-w-md">
      <h3 className="text-lg font-bold">Yeni Harcama Ekle</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Tarih</label>
        <Calendar
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.value)}
          showIcon
          className="w-full border border-black-300  shadow-sm h-10"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Masraf Türü</label>
        <Dropdown
          value={type}
          options={ExpenseTypeOptions}
          onChange={(e) => setType(e.value)}
          placeholder="Seçiniz"
          showClear
          className="w-full border border-black-300 rounded shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tutar (₺)</label>
        <InputNumber
          value={amount}
          onValueChange={(e) => setAmount(e.value)}
          mode="currency"
          currency="TRY"
          locale="tr-TR"
          className="w-full border border-black-300  shadow-sm h-10 "
        />
      </div>

      <Button
        label="Kaydet"
        onClick={handleSave}
        loading={loading}
        className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      />
    </div>
  );
}
