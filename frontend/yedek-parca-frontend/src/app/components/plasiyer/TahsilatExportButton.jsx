"use client";

import { exportFullFormToExcel } from "@/actions/excelActions";
import Swal from "sweetalert2";

export default function TahsilatExportButton({ collections, selected }) {
  const handleExport = () => {
    if (selected.length === 0) {
      Swal.fire("Uyarı", "Lütfen en az bir tahsilat seçin!", "warning");
      return;
    }
    exportFullFormToExcel(collections, selected);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white px-4 py-2 rounded mb-4"
    >
      Tahsilat Formunu Excel'e Aktar
    </button>
  );
}
