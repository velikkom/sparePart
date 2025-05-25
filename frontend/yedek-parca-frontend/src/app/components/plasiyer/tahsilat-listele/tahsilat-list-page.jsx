"use client";

import { useMemo, useState } from "react";
import TahsilatExportButton from "../TahsilatExportButton";
import TahsilatFilters from "./TahsilatFilters";
import TahsilatTable from "../TahsilatTable";
import useTahsilatListesi from "@/helpers/hooks/useTahsilatListesi";
import useFirmaListesi from "@/helpers/hooks/useFirmaListesi";
import { handleDeleteCollection } from "@/actions/collectionActions";

export default function TahsilatListesi({ onEdit }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const refreshList = () => setRefreshKey((prev) => prev + 1);

  const { firmaListesi: firms = [] } = useFirmaListesi();
  const [selected, setSelected] = useState([]);

  const [filterState, setFilterState] = useState({
    firmId: "",
    startDate: "",
    endDate: "",
    paymentMethod: "",
    minAmount: "",
    maxAmount: "",
  });

  const filters = useMemo(
    () => ({
      firmId: filterState.firmId || undefined,
      startDate: filterState.startDate || undefined,
      endDate: filterState.endDate || undefined,
      paymentMethod: filterState.paymentMethod || undefined,
      minAmount: filterState.minAmount || undefined,
      maxAmount: filterState.maxAmount || undefined,
    }),
    [filterState]
  );

  // ⛔ pagination parametreleri kaldırıldı
  const { tahsilatlar, loading } = useTahsilatListesi(filters, refreshKey);

  const totalAmount = tahsilatlar.reduce((sum, t) => sum + (t.amount || 0), 0);

  const handleSelect = (id, isChecked) => {
    const stringId = String(id);
    setSelected((prev) =>
      isChecked ? [...prev, stringId] : prev.filter((item) => item !== stringId)
    );
  };

  const handleDelete = (id) => {
    handleDeleteCollection(id, refreshList);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tahsilat Listesi</h2>
        <TahsilatExportButton data={tahsilatlar} />
      </div>

      <TahsilatFilters
        filters={filterState}
        setFilters={setFilterState}
        firms={firms}
      />

      <TahsilatTable
        collections={tahsilatlar}
        loading={loading}
        onEdit={onEdit}
        selected={selected}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />

      {/* 🔻 Sayfa numaraları ve ileri/geri düğmeleri kaldırıldı */}

      <div className="mt-4 flex justify-end">
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 shadow-sm text-blue-900 font-semibold">
          Toplam Tutar: {totalAmount.toLocaleString("tr-TR")} ₺
        </div>
      </div>
    </div>
  );
}
