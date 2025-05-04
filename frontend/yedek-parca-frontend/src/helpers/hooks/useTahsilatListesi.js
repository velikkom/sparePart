import { useEffect, useMemo, useState } from "react";
import { getCollections } from "@/service/collectionService";

const useTahsilatListesi = (filters, refreshTrigger) => {
  const [result, setResult] = useState({ content: [], totalElements: 0 });
  const [loading, setLoading] = useState(false);

  const filterQuery = useMemo(() => {
    const query = {};
    if (filters.firmId) query.firmId = filters.firmId;
    if (filters.firmName) query.firmName = filters.firmName;
    if (filters.startDate) query.startDate = filters.startDate;
    if (filters.endDate) query.endDate = filters.endDate;
    if (filters.paymentMethod) query.paymentMethod = filters.paymentMethod;
    if (filters.minAmount) query.minAmount = filters.minAmount;
    if (filters.maxAmount) query.maxAmount = filters.maxAmount;
    return query;
  }, [filters]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getCollections(filterQuery);
        setResult(res || { content: [] });
      } catch (error) {
        console.error("Tahsilat verileri alınamadı:", error);
        setResult({ content: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filterQuery, refreshTrigger]);

  return { tahsilatlar: result.content, loading };
};

export default useTahsilatListesi;
