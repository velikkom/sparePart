import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

export const exportFullFormToExcel = (collections, selectedIds) => {
  const generateHeaders = () => [
    "Sıra No",
    "Tahsilat Makbuz No",
    "Micro Kayıt No",
    "Ünvanı",
    "Tarih",
    "Nakit Tutarı",
    "Senet Vade Tarihi",
    "Senet Tutarı",
    "Çek Banka Adı",
    "Çek Vade",
    "Çek Tutarı",
    "Mailorder Karland Tutar",
    "Mailorder Otokoc Tutar",
    "Havale Banka",
    "Havale Tutarı",
    "POS YKB",
    "POS TEB",
  ];
  const generateRows = (collections) => {
    return collections.map((col, index) => {
      // 🔍 Buraya ekle
      console.log("👉 Excel'e Aktarılan Senet:", col.paymentMethod, col.noteAmount);
  
      return {
        "Sıra No": index + 1,
        "Tahsilat Makbuz No": col.receiptNumber || "-",
        "Micro Kayıt No": "",
        "Ünvanı": col.firmName,
        "Tarih": col.collectionDate || "",
  
        "Nakit Tutarı": col.paymentMethod === "CASH" ? col.amount : "",
        "Senet Vade Tarihi": col.paymentMethod === "NOTE" ? col.noteDueDate || "" : "",
        "Senet Tutarı": col.paymentMethod === "NOTE" ? col.noteAmount || "" : "",
  
        "Çek Banka Adı": col.paymentMethod === "CHECK" ? col.checkBankName || "" : "",
        "Çek Vade": col.paymentMethod === "CHECK" ? col.checkDueDate || "" : "",
        "Çek Tutarı": col.paymentMethod === "CHECK" ? col.amount || "" : "",
  
        "Mailorder Karland Tutar": col.paymentMethod === "CREDIT_CARD" ? col.amount || "" : "",
        "Mailorder Otokoc Tutar": "",
  
        "Havale Banka": "",
        "Havale Tutarı": col.paymentMethod === "BANK_TRANSFER" ? col.amount || "" : "",
  
        "POS YKB": "",
        "POS TEB": ""
      };
    });
  };
  
  

  const selected = collections.filter((col) => selectedIds.includes(col.id));

  if (selected.length === 0) {
    Swal.fire(
      "Uyarı",
      "Lütfen Excel'e aktarmak için en az bir tahsilat seçin!",
      "warning"
    );
    return;
  }

  const headers = generateHeaders();
  const rows = generateRows(selected);

  const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tahsilat Dökümü");

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(blob, "tahsilat-dokumu-form.xlsx");
};
