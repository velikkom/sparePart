"use client";

import { useEffect, useState } from "react";
import { getMyCollections } from "@/service/userTahsilatService";

const usePlasiyerTahsilatListesi = (refreshTrigger) => {
  const [tahsilatlar, setTahsilatlar] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const result = await getMyCollections();
        console.log("✅ getMyCollections() sonucu:", result);
        setTahsilatlar(Array.isArray(result) ? result : []); // ❗ fallback olarak boş array ver
      } catch (error) {
        console.error("❌ Tahsilatlar alınamadı:", error.message);
        setTahsilatlar([]); // hata durumunda da boş array ata
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [refreshTrigger]);

  return { tahsilatlar, loading };
};

export default usePlasiyerTahsilatListesi;
