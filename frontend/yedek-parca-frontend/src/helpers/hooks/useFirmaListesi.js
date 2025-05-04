import { useEffect, useState } from "react";
import { getAllFirms } from "@/service/firmservice";

const useFirmaListesi = () => {
  const [firmaListesi, setFirmaListesi] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFirms = async () => {
      setLoading(true);
      try {
        const res = await getAllFirms();
        setFirmaListesi(res.data); // Eğer direkt array geliyorsa: setFirmaListesi(res)
      } catch (error) {
        console.error("Token bulunamadı, firmalar alınamadı.", error);
        setFirmaListesi([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFirms();
  }, []);

  return { firmaListesi, loading };
};

export default useFirmaListesi;
