"use client";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { formatCurrencyWithSymbol } from "@/helpers/formatting";
import { useState } from "react";
import { ExpenseTypeOptions } from "@/helpers/expenseTypes";

export default function HarcamaListe({
  expenses = [],
  onDelete,
  onUpdate,
  page,
  size,
  totalElements,
  onPageChange,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const start = page * size;

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditData({
      expenseDate: new Date(expense.expenseDate),
      type: expense.type,
      amount: expense.amount,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = () => {
    onUpdate(editingId, {
      ...editData,
      expenseDate: editData.expenseDate.toISOString().split("T")[0],
    });
    handleCancel();
  };

  return (
    <div className="mt-4 bg-white p-4 rounded shadow-md">
      <ul className="space-y-2">
        {expenses.map((e) => (
          <li
            key={e.id}
            className="p-3 border rounded bg-gray-50 shadow-sm flex justify-between items-center"
          >
            {editingId === e.id ? (
              <div className="flex flex-col md:flex-row md:space-x-4 w-full">
                {/* Tarih */}
                <Calendar
                  value={editData.expenseDate}
                  onChange={(e) => setEditData({ ...editData, expenseDate: e.value })}
                  dateFormat="yy-mm-dd"
                  className="w-full md:w-1/3"
                />

                {/* Tür */}
                <Dropdown
                  value={editData.type}
                  options={ExpenseTypeOptions}
                  onChange={(e) => setEditData({ ...editData, type: e.value })}
                  placeholder="Masraf Türü"
                  className="w-full md:w-1/3"
                />

                {/* Tutar */}
                <InputNumber
                  value={editData.amount}
                  onValueChange={(e) => setEditData({ ...editData, amount: e.value })}
                  mode="currency"
                  currency="TRY"
                  locale="tr-TR"
                  className="w-full md:w-1/3"
                />

                <div className="flex space-x-2 mt-2 md:mt-0">
                  <Button label="Kaydet" icon="pi pi-check" className="p-button-success p-button-sm" onClick={handleSave} />
                  <Button label="İptal" icon="pi pi-times" className="p-button-secondary p-button-sm" onClick={handleCancel} />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p>
                    <strong className="text-blue-700">{e.type}</strong> –{" "}
                    {formatCurrencyWithSymbol(e.amount)}
                  </p>
                  <p className="text-sm text-gray-600">{e.expenseDate}</p>
                </div>
                <div className="flex space-x-2">
                  <Button icon="pi pi-pencil" className="p-button-warning p-button-sm" tooltip="Düzenle" onClick={() => handleEditClick(e)} />
                  <Button icon="pi pi-trash" className="p-button-danger p-button-sm" tooltip="Sil" onClick={() => onDelete(e.id)} />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <Paginator
        first={start}
        rows={size}
        totalRecords={totalElements}
        onPageChange={(e) => onPageChange(e.page)}
        className="mt-4"
      />
    </div>
  );
}
