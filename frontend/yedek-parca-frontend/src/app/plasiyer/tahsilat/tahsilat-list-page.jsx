"use client";

import { useEffect, useState } from "react";
import { getAllFirms } from "@/service/firmservice";
import {
  searchCollections,
  deleteCollection,
} from "@/service/collectionService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { exportFullFormToExcel } from "@/actions/excelActions";
import TahsilatExportButton from "./TahsilatExportButton";
import TahsilatFilters from "./TahsilatFilters";
import TahsilatTable from "./TahsilatTable";

export default function TahsilatListesiPage({ onEdit, refreshList, setRefreshList }) {
  const [collections, setCollections] = useState([]);
  const [firms, setFirms] = useState([]);
  const [firmSearch, setFirmSearch] = useState("");
  const [selectedCollections, setSelectedCollections] = useState([]);

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
      .then((res) => {
        if (Array.isArray(res.data)) setFirms(res.data);
        else if (Array.isArray(res)) setFirms(res);
        else throw new Error("Firma verisi geçersiz");
      })
      .catch((err) => {
        console.error("Firma listesi alınamadı", err);
        setFirms([]);
      });
  }, []);

  useEffect(() => {
    fetchTahsilatlar();
  }, [query, refreshList]);

  const fetchTahsilatlar = async () => {
    try {
      const queryToSend = { ...query };
      if (!query.startDate) delete queryToSend.startDate;
      if (!query.endDate) delete queryToSend.endDate;

      const result = await searchCollections(queryToSend);
      setCollections(result?.content || []);
    } catch (err) {
      console.error("Tahsilatlar alınamadı:", err);
    }
  };

  const handleSelect = (id, isSelected) => {
    if (isSelected) {
      setSelectedCollections((prev) => [...prev, id]);
    } else {
      setSelectedCollections((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Emin misin?",
      text: "Bu tahsilatı kalıcı olarak silmek istiyor musun?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Evet, Sil",
      cancelButtonText: "Vazgeç",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCollection(id);
          Swal.fire("Başarılı", "Tahsilat başarıyla silindi", "success");
          setRefreshList((prev) => !prev);
        } catch (error) {
          Swal.fire("Hata", error.message, "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tahsilat Listesi</h2>

      <TahsilatExportButton 
        collections={collections}
        selected={selectedCollections}
      />

      <TahsilatFilters
        query={query}
        setQuery={setQuery}
        firms={firms}
        firmSearch={firmSearch}
        setFirmSearch={setFirmSearch}
      />

      <TahsilatTable
        collections={collections}
        selected={selectedCollections}
        onSelect={handleSelect}
        onEdit={onEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
