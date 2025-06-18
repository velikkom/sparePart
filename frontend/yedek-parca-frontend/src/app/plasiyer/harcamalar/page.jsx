"use client";

import { useState } from "react";
import {
  getMyFilteredExpenses,
  getMyTotalExpenseByDate,
  createExpense,
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
  const [lastFilter, setLastFilter] = useState(null); // filtre sonrası güncelleme için

  const handleFilter = async (filter) => {
    setLoading(true);
    setLastFilter(filter);

    try {
      const list = await getMyFilteredExpenses(filter);
      setExpenses(list);

      const total = await getMyTotalExpenseByDate(filter);
      setTotal(total);
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

      // Eğer daha önce filtre uygulanmışsa tekrar yükle
      if (lastFilter) {
        handleFilter(lastFilter);
      }
    } catch (err) {
      toast.error("Harcama eklenemedi ❌");
    }
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

      <HarcamaListe expenses={expenses} />
    </div>
  );
}
