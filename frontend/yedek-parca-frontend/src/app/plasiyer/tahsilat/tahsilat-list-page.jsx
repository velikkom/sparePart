"use client";
import { useEffect, useState } from "react";
import { getAllFirms } from "@/service/firmservice";
import { searchCollections } from "@/service/collectionService";

export default function TahsilatListesi({ onEdit }) {
  const [collections, setCollections] = useState([]);
  const [firms, setFirms] = useState([]);
  const [query, setQuery] = useState({
    firmId: "",
    startDate: "",
    endDate: "",
    paymentMethod: "",
    page: 0,
    size: 10,
  });

  useEffect(() => {
    getAllFirms()
      .then(setFirms)
      .catch((err) => {
        console.error("Firma listesi alınamadı", err);
      });
  }, []);

  useEffect(() => {
    fetchTahsilatlar();
  }, [query]);

  const fetchTahsilatlar = async () => {
    try {
      const result = await searchCollections(query);
      setCollections(result.content || []);
    } catch (err) {
      console.error("Tahsilatlar alınamadı:", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tahsilat Listesi</h2>

      {/* Filtre Alanı */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <select
          name="firmId"
          onChange={handleFilterChange}
          className="p-2 border"
        >
          <option value="">Tüm Firmalar</option>
          {firms.map((firm) => (
            <option key={firm.id} value={firm.id}>
              {firm.name}
            </option>
          ))}
        </select>

        <input
          name="startDate"
          type="date"
          onChange={handleFilterChange}
          className="p-2 border"
        />

        <input
          name="endDate"
          type="date"
          onChange={handleFilterChange}
          className="p-2 border"
        />

        <select
          name="paymentMethod"
          onChange={handleFilterChange}
          className="p-2 border"
        >
          <option value="">Tümü</option>
          <option value="CASH">Nakit</option>
          <option value="CREDIT_CARD">Kredi Kartı</option>
          <option value="BANK_TRANSFER">Banka Transferi</option>
          <option value="CHECK">Çek</option>
        </select>
      </div>

      {/* Liste Alanı */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Firma</th>
            <th className="border p-2">Tutar</th>
            <th className="border p-2">Tarih</th>
            <th className="border p-2">Ödeme Tipi</th>
            <th className="border p-2">Makbuz No</th>
            <th className="border p-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((col) => (
            <tr key={col.id}>
              <td className="border p-2">{col.firmName}</td>
              <td className="border p-2">
                {col.amount.toLocaleString("tr-TR")} ₺
              </td>
              <td className="border p-2">{col.collectionDate}</td>
              <td className="border p-2">{col.paymentMethod}</td>
              <td className="border p-2">{col.receiptNumber || "-"}</td>
              <td className="border p-2 flex gap-2">
                <button onClick={() => console.log("Düzenle", col)}>✏️</button>
                <button onClick={() => console.log("Sil", col.id)}>🗑️</button>
              </td>
            </tr>
          ))}
          {collections.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                Kayıt bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
