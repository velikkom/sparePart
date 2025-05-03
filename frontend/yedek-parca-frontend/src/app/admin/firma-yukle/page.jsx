"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { uploadFirmsExcel } from "@/service/firmservice";

export default function FirmaYuklePage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      Swal.fire("Uyarı", "Lütfen bir dosya seçin", "warning");
      return;
    }

    setLoading(true);
    try {
      const message = await uploadFirmsExcel(file);
      Swal.fire("Başarılı", message, "success");
      setFile(null);
    } catch (err) {
      Swal.fire("Hata", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Firma Excel Yükleme
      </h2>

      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="block w-full mb-4 border p-2 rounded"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 w-full"
      >
        {loading ? "Yükleniyor..." : "Yükle"}
      </button>
    </div>
  );
}
