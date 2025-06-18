"use client";

import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ExpenseTypeOptions } from "@/helpers/expenseTypes";

export default function HarcamaFiltreForm({ onFilter, loading }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [type, setType] = useState(null);

  const handleClick = () => {
    onFilter({ startDate, endDate, type });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-white p-4 rounded shadow-sm">
      <div className="flex flex-col">
        <label className="font-semibold text-sm mb-1">Başlangıç Tarihi</label>
        <Calendar value={startDate} onChange={(e) => setStartDate(e.value)} showIcon className="w-full h-10 border border-black-300 rounded shadow-sm" />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-sm mb-1">Bitiş Tarihi</label>
        <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} showIcon className="w-full h-10 border border-black-300 rounded shadow-sm" />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-sm mb-1">Masraf Türü</label>
        <Dropdown
          value={type}
          options={ExpenseTypeOptions}
          onChange={(e) => setType(e.value)}
          placeholder="Seçiniz"
          showClear
          className="w-full h-10 border border-black-300 rounded shadow-sm"
        />
      </div>

      <Button
        label="Filtrele"
        onClick={handleClick}
        loading={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-10"
      />
    </div>
  );
}
