"use client";

import { useMemo, useState } from "react";
import TahsilatExportButton from "../TahsilatExportButton";
import TahsilatFilters from "./TahsilatFilters";
import TahsilatTable from "../TahsilatTable";
import useTahsilatListesi from "@/helpers/hooks/useTahsilatListesi";
import useFirmaListesi from "@/helpers/hooks/useFirmaListesi";

export default function TahsilatListesi({ onEdit, refreshList }) {
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

  const { tahsilatlar, loading } = useTahsilatListesi(filters, refreshList);

  const handleSelect = (id, isChecked) => {
    const stringId = String(id);
    setSelected((prev) =>
      isChecked ? [...prev, stringId] : prev.filter((item) => item !== stringId)
    );
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
      />
    </div>
  );
}
