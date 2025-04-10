"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getAllFirms, getFirmById } from "@/service/firmservice";
import { addCollection } from "@/service/collectionService";


export default function TahsilatEklePage() {
  const [formData, setFormData] = useState({
    firmId: "",
    amount: "",
    collectionDate: "",
    paymentMethod: "",
    receiptNumber: "",
  });

  const [firms, setFirms] = useState([]);
  const [selectedFirmDebt, setSelectedFirmDebt] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✔️ Firmaları yükle
  useEffect(() => {
    getAllFirms()
      .then((data) => setFirms(data))
      .catch(() => Swal.fire("Hata", "Firmalar yüklenemedi", "error"));
  }, []);
  console.log("getAllFirms çağrıldı");

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "firmId" && value) {
      try {
        const firm = await getFirmById(value);
        setSelectedFirmDebt(firm.debt);
      } catch (err) {
        Swal.fire("Hata", "Firma borcu alınamadı", "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addCollection(formData);

      Swal.fire("Başarılı", "Tahsilat kaydedildi", "success");

      // Borçtan düş
      if (selectedFirmDebt !== null && formData.amount) {
        const updatedDebt = selectedFirmDebt - parseFloat(formData.amount);
        setSelectedFirmDebt(Math.max(updatedDebt, 0).toFixed(2));
      }

      setFormData({
        firmId: "",
        amount: "",
        collectionDate: "",
        paymentMethod: "",
        receiptNumber: "",
      });
    } catch (error) {
      Swal.fire("Hata", error.message || "Tahsilat eklenemedi", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">Tahsilat Ekle</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Firma</label>
          <select
            name="firmId"
            value={formData.firmId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Firma seçiniz</option>
            {firms.map((firm) => (
              <option key={firm.id} value={firm.id}>
                {firm.name}
              </option>
            ))}
          </select>
        </div>

        {selectedFirmDebt !== null && (
          <div className="text-sm text-gray-600 mb-2">
            Seçilen firmanın mevcut borcu: <strong>₺ {selectedFirmDebt}</strong>
          </div>
        )}

        <div>
          <label>Tahsilat Tutarı</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label>Tahsilat Tarihi</label>
          <input
            type="date"
            name="collectionDate"
            value={formData.collectionDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label>Ödeme Türü</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Ödeme tipi seçiniz</option>
            <option value="CASH">Nakit</option>
            <option value="CREDIT_CARD">Kredi Kartı</option>
            <option value="BANK_TRANSFER">Banka Havalesi</option>
            <option value="CHECK">Çek</option>
            <option value="OTHER">Diğer</option>
          </select>
        </div>

        <div>
          <label>Makbuz No</label>
          <input
            type="text"
            name="receiptNumber"
            value={formData.receiptNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </div>
  );
}
