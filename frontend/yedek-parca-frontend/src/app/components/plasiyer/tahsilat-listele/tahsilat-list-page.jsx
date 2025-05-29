"use client";

import { useEffect, useState } from "react";
import TahsilatExportButton from "../TahsilatExportButton";
import TahsilatTable from "../TahsilatTable";
import { getMyFirms } from "@/service/plasiyerFirmService";
import usePlasiyerTahsilatListesi from "@/helpers/hooks/usePlasiyerTahsilatListesi";
//import usePlasiyerTahsilatListesi from "@/hooks/usePlasiyerTahsilatListesi";

export default function TahsilatListesi({ onEdit }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [firms, setFirms] = useState([]);
  const [selected, setSelected] = useState([]);

  // 🔄 sadece plasiyere atanmış firmaları getir
  useEffect(() => {
    getMyFirms()
      .then(setFirms)
      .catch(() => setFirms([]));
  }, []);

  // 🔄 sadece plasiyer tahsilatlarını getir
  const { tahsilatlar, loading } = usePlasiyerTahsilatListesi(refreshKey);

  const totalAmount = (tahsilatlar || []).reduce((sum, t) => sum + (t.amount || 0), 0);

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

      <TahsilatTable
        collections={tahsilatlar}
        loading={loading}
        onEdit={onEdit}
        selected={selected}
        onSelect={handleSelect}
        // Plasiyer silme yetkisine sahipse handleDelete eklenebilir
      />

      <div className="mt-4 flex justify-end">
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 shadow-sm text-blue-900 font-semibold">
          Toplam Tutar: {totalAmount.toLocaleString("tr-TR")} ₺
        </div>
      </div>
    </div>
  );
}
