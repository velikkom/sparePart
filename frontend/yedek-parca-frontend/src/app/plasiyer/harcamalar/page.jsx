"use client";

import { useState } from "react";
import {
  getMyFilteredExpensesPaged,
  getMyTotalExpenseByDate,
  createExpense,
  updateExpense,
  deleteExpense,
} from "@/service/expenseService";
import { formatCurrencyWithSymbol } from "@/helpers/formatting";
import { toast } from "react-toastify";
import HarcamaFiltreForm from "@/app/components/harcama/HarcamaFiltreForm";
import HarcamaListe from "@/app/components/harcama/HarcamaListe";
import HarcamaEkleForm from "@/app/components/harcama/HarcamaEkleForm";
import HarcamaChart from "@/app/components/harcama/harcama-charts";

export default function HarcamaTakipPage() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastFilter, setLastFilter] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  const handleFilter = async (filter, newPage = page) => {
    setLoading(true);
    setLastFilter(filter);

    try {
      const data = await getMyFilteredExpensesPaged(filter, newPage, size);
      setExpenses(data.content);
      setTotalElements(data.totalElements);

      const totalValue = await getMyTotalExpenseByDate(filter);
      setTotal(totalValue);
    } catch (err) {
      toast.error("Filtreleme sırasında hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleNewExpense = async (newExpense) => {
    try {
      await createExpense(newExpense);
      toast.success("Harcama başarıyla eklendi ✅");
      handleFilter(lastFilter, page);
    } catch (err) {
      toast.error("Harcama eklenemedi ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      toast.success("Harcama silindi 🗑️");
      handleFilter(lastFilter, page);
    } catch (err) {
      toast.error("Harcama silinemedi ❌");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateExpense(id, updatedData);
      toast.success("Harcama güncellendi ✏️");
      handleFilter(lastFilter, page);
    } catch (err) {
      toast.error("Harcama güncellenemedi ❌");
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleFilter(lastFilter, newPage);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-100">
      <HarcamaFiltreForm onFilter={handleFilter} loading={loading} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-start items-start">
        <HarcamaEkleForm onSubmit={handleNewExpense} />
        <HarcamaChart expenses={expenses} />
      </div>
      <hr className="my-4" />
      <h2 className="text-xl font-bold">Harcama Takibi</h2>

      {total !== null && (
        <div className="text-lg font-semibold text-green-700 mt-2">
          Toplam Harcama: {formatCurrencyWithSymbol(total)}
        </div>
      )}

      <HarcamaListe
        expenses={expenses}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        page={page}
        size={size}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
