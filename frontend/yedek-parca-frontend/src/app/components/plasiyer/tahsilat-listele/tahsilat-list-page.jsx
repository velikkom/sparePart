"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

import { getAllFirms } from "@/service/firmservice";
import { getMyFirms } from "@/service/plasiyerFirmService";
import { getAllCollections, getMyCollections } from "@/service/collectionService";

import { handleDeleteCollection } from "@/actions/collectionActions";

import TahsilatExportButton from "../TahsilatExportButton";
import TahsilatTable from "../TahsilatTable";
import TahsilatFilters from "./TahsilatFilters";

export default function TahsilatListesi({ onEdit }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [firms, setFirms] = useState([]);
  const [tahsilatlar, setTahsilatlar] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        const roles = session?.user?.roles || [];

        if (roles.includes("ROLE_ADMIN")) {
          const allFirms = await getAllFirms();
          setFirms(allFirms ?? []);

          const allTahsilatlar = await getAllCollections();
          setTahsilatlar(allTahsilatlar ?? []);
        } else if (roles.includes("ROLE_PLASIYER")) {
          const myFirms = await getMyFirms();
          setFirms(myFirms ?? []);

          const myTahsilatlar = await getMyCollections();
          setTahsilatlar(myTahsilatlar ?? []);
        }
      } catch (err) {
        console.error("Veriler alınırken hata:", err);
        setFirms([]);
        setTahsilatlar([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]); // ✅ refreshKey değiştiğinde liste yenilenir

  const handleSelect = (id, isChecked) => {
    const stringId = String(id);
    setSelected((prev) =>
      isChecked ? [...prev, stringId] : prev.filter((item) => item !== stringId)
    );
  };

  const handleDelete = async (id) => {
    await handleDeleteCollection(id, () => setRefreshKey((prev) => prev + 1));
  };

  const totalAmount = (tahsilatlar || []).reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tahsilat Listesi</h2>
        <TahsilatExportButton data={tahsilatlar} />
      </div>
    {/* <TahsilatFilters/>
      <TahsilatFilters
        filters={{}}
        setFilters={() => {}}
        firms={firms}
      /> */}
      <TahsilatTable
        collections={tahsilatlar}
        loading={loading}
        onEdit={onEdit}
        onDelete={handleDelete}
        selected={selected}
        onSelect={handleSelect}
      />

      <div className="mt-4 flex justify-end">
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 shadow-sm text-blue-900 font-semibold">
          Toplam Tutar: {totalAmount.toLocaleString("tr-TR")} ₺
        </div>
      </div>
    </div>
  );
}
