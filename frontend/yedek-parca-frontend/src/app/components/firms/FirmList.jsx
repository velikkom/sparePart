"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Swal from "sweetalert2";
import { deleteFirm } from "@/service/firmservice";

const FirmList = ({ firms, setSelectedFirm, fetchFirms }) => {
  // ✅ Silme işlemi
  const handleDelete = (id) => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Bu firmayı silmek istediğinize emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "İptal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFirm(id);
          fetchFirms(); // Listeyi güncelle
          Swal.fire("Silindi!", "Firma başarıyla silindi.", "success");
        } catch (error) {
          console.error("Silme Hatası:", error);
          Swal.fire({
            icon: "error",
            title: "Silme Hatası",
            text: error.message || "Firma silinemedi",
          });
        }
      }
    });
  };

  // ✅ Düzenleme işlemi
  const handleEdit = (firm) => {
    console.log("Düzenlenecek firma:", firm);
    setSelectedFirm(firm); // Formu doldurmak için firmayı gönder
  };

  return (
    <DataTable
      value={firms}
      paginator
      rows={5}
      className="p-datatable-gridlines"
      emptyMessage="Kayıtlı firma bulunamadı"
    >
      <Column field="name" header="Firma Adı" sortable />
      <Column field="address" header="Adres" sortable />
      <Column field="phone" header="Telefon" sortable />
      <Column field="email" header="E-posta" sortable />
      <Column field="taxNumber" header="Vergi Numarası" sortable />

      <Column
        header="İşlemler"
        body={(rowData) => (
          <div className="flex gap-4 justify-center">
            <Button
              label="Düzenle"
              className="p-button-sm "
              onClick={() => handleEdit(rowData)}
              style={{
                backgroundColor: "#28a745",
                border: "none",
                color: "white",
                padding: "6px 12px",
                borderRadius: "8px",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
            />
            <Button
              label="Sil"
              className="p-button-sm "
              onClick={() => handleDelete(rowData.id)}
              style={{
                backgroundColor: "#dc3545",
                border: "none",
                color: "white",
                padding: "6px 12px",
                borderRadius: "8px",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
            />
          </div>
        )}
      />
    </DataTable>
  );
};

export default FirmList;
