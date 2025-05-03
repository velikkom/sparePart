"use client";

import { useEffect, useState } from "react";
import { getAllFirms } from "@/service/firmservice";
import { addCollection } from "@/service/collectionService";
import Swal from "sweetalert2";

export default function TahsilatEklePage({ triggerRefresh }) {
  const [firms, setFirms] = useState([]);
  const [form, setForm] = useState({
    firmId: "",
    amount: "",
    collectionDate: "",
    paymentMethod: "",
    receiptNumber: "",
    checkBankName: "",
    checkDueDate: "",
    noteDueDate: "",
  });

  useEffect(() => {
    getAllFirms()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setFirms(res.data);
        } else {
          throw new Error("Firma listesi alınamadı.");
        }
      })
      .catch((err) => {
        console.error("Firma verileri alınamadı:", err);
        setFirms([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCollection(form);
      Swal.fire("Başarılı", "Tahsilat eklendi", "success");
      setForm({
        firmId: "",
        amount: "",
        collectionDate: "",
        paymentMethod: "",
        receiptNumber: "",
        checkBankName: "",
        checkDueDate: "",
        noteDueDate: "",
      });
      if (typeof triggerRefresh === "function") {
        triggerRefresh();
      }
    } catch (error) {
      console.error("Tahsilat eklenemedi:", error);
      Swal.fire("Hata", "Tahsilat eklenemedi", "error");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tahsilat Ekle</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Firma seçimi */}
        <div>
          <label className="block mb-1 font-medium">Firma</label>
          <select
            name="firmId"
            value={form.firmId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Firma Seçin</option>
            {firms.map((firm) => (
              <option key={firm.id} value={firm.id}>
                {firm.name}
              </option>
            ))}
          </select>
        </div>
        {/* Ödeme tipi */}
        <div>
          <label className="block mb-1 font-medium">Ödeme Yöntemi</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seçin</option>
            <option value="CASH">Nakit</option>
            <option value="CHECK">Çek</option>
            <option value="CREDIT_CARD">Kredi Kartı</option>
            <option value="BANK_TRANSFER">Banka Transferi</option>
            <option value="NOTE">Senet</option>
          </select>
        </div>

        {/* Çek ödeme yöntemi seçildiyse ek alanlar */}
        {form.paymentMethod === "CHECK" && (
          <>
            <div>
              <label className="block mb-1 font-medium">Çek Banka Adı</label>
              <input
                type="text"
                name="checkBankName"
                value={form.checkBankName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Çek Vade Tarihi</label>
              <input
                type="date"
                name="checkDueDate"
                value={form.checkDueDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </>
        )}
        {form.paymentMethod === "NOTE" && (
          <>
            <div>
              <label className="block mb-1 font-medium">
                Senet Vade Tarihi
              </label>
              <input
                type="date"
                name="noteDueDate"
                value={form.noteDueDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </>
        )}

        {/* Tahsilat tutarı */}
        <div>
          <label className="block mb-1 font-medium">Tutar</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Tahsilat tarihi */}
        <div>
          <label className="block mb-1 font-medium">Tarih</label>
          <input
            type="date"
            name="collectionDate"
            value={form.collectionDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Makbuz No */}
        <div>
          <label className="block mb-1 font-medium">Makbuz No</label>
          <input
            type="text"
            name="receiptNumber"
            value={form.receiptNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}
