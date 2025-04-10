"use client";

import { useEffect, useState } from "react";

export default function TahsilatListesiPage() {
  const [filters, setFilters] = useState({
    firmId: "",
    startDate: "",
    endDate: "",
    paymentMethod: "",
  });
  const [data, setData] = useState([]);
  const [firms, setFirms] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch("/api/firms")
      .then((res) => res.json())
      .then((data) => setFirms(data?.data || []));
  }, []);

  const fetchData = () => {
    const query = new URLSearchParams({
      ...filters,
      page,
      size: 10,
    });

    fetch(`/api/collections/search?${query}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result.data.content || []);
        setTotalPages(result.data.totalPages || 0);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setPage(0);
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">Tahsilat Listesi</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          name="firmId"
          value={filters.firmId}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Firma Seç</option>
          {firms.map((firm) => (
            <option key={firm.id} value={firm.id}>
              {firm.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />

        <select
          name="paymentMethod"
          value={filters.paymentMethod}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Ödeme Türü</option>
          <option value="CASH">Nakit</option>
          <option value="CREDIT_CARD">Kredi Kartı</option>
          <option value="BANK_TRANSFER">Banka Havalesi</option>
          <option value="CHECK">Çek</option>
          <option value="OTHER">Diğer</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
      >
        Ara
      </button>

      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Firma</th>
            <th className="border px-2 py-1">Tarih</th>
            <th className="border px-2 py-1">Tutar</th>
            <th className="border px-2 py-1">Ödeme</th>
            <th className="border px-2 py-1">Makbuz</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td className="border px-2 py-1">{item.firm?.name || "-"}</td>
                <td className="border px-2 py-1">{item.collectionDate}</td>
                <td className="border px-2 py-1">₺ {item.amount}</td>
                <td className="border px-2 py-1">{item.paymentMethod}</td>
                <td className="border px-2 py-1">{item.receiptNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                Veri bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {[...Array(totalPages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded border ${
                page === p ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {p + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
