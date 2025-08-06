"use client";

import { useEffect, useState } from "react";
import { getCollections, deleteCollection } from "@/service/collectionService";

import Swal from "sweetalert2";
import TahsilatExportButton from "../TahsilatExportButton";
import TahsilatTable from "../TahsilatTable";

export default function TahsilatListesi({ onEdit, refreshList }) {
  const [tahsilatlar, setTahsilatlar] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // ✅ Filtre state
  const [firmId, setFirmId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  // ✅ Toplam tahsilat
  const [totalAmount, setTotalAmount] = useState(0);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await getCollections({
        page: currentPage,
        size: pageSize,
        firmId,
        startDate,
        endDate,
        paymentMethod,
        minAmount,
        maxAmount,
      });

      setTahsilatlar(result.content);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);

      // Toplam tahsilatı hesapla
      const toplam = result.content.reduce(
        (acc, item) => acc + (item.amount || 0),
        0
      );
      setTotalAmount(toplam);
    } catch (error) {
      console.error("Tahsilatlar alınırken hata:", error);
      Swal.fire("Hata", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentPage, pageSize, refreshList]);

  const handleSelect = (id, isSelected) => {
    setSelected((prev) =>
      isSelected ? [...prev, id] : prev.filter((sel) => sel !== id)
    );
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Emin misiniz?",
      text: "Bu tahsilat kalıcı olarak silinecek!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, sil",
      cancelButtonText: "İptal",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCollection(id);
        Swal.fire("Başarılı", "Tahsilat silindi", "success");
        loadData();
      } catch (error) {
        Swal.fire("Hata", "Silme işlemi başarısız", "error");
      }
    }
  };

  return (
    <div className="mt-8">
      {/* Filtre Alanları */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-4">
        <input
          type="text"
          placeholder="Firma ID"
          value={firmId}
          onChange={(e) => setFirmId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Ödeme Tipi</option>
          <option value="CASH">Nakit</option>
          <option value="CREDIT_CARD">Kredi Kartı</option>
          <option value="CHECK">Çek</option>
          <option value="NOTE">Senet</option>
          <option value="BANK_TRANSFER">Havale/EFT</option>
        </select>
        <input
          type="number"
          placeholder="Min Tutar"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Tutar"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex justify-between items-center m-4">
        <button
          onClick={() => loadData()}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Filtrele
        </button>

        <TahsilatExportButton collections={tahsilatlar} selected={selected} />
      </div>

      <TahsilatTable
        collections={tahsilatlar}
        selected={selected}
        onSelect={handleSelect}
        onEdit={onEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Toplam Tahsilat ve Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Toplam Kayıt: {totalElements} | Filtrelenmiş Tutar: {totalAmount} ₺
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
          >
            ⬅️ Önceki
          </button>
          <span className="self-center">
            Sayfa {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage + 1 >= totalPages}
            className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
          >
            Sonraki ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
