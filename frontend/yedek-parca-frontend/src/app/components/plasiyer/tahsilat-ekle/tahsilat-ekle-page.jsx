"use client";

import { useEffect, useState } from "react";
import { getAllFirms } from "@/service/firmservice";
import { addCollection, updateCollection } from "@/service/collectionService";
import Swal from "sweetalert2";
import FirmaAutocompleteInput from "./FirmaAutocompleteInput";
import TahsilatFormInputs from "./TahsilatFormInputs";
import TahsilatExtraFields from "./TahsilatExtraFields";
import TahsilatFormActions from "./TahsilatFormActions";

export default function TahsilatEklePage({ selectedCollection, clearSelection, triggerRefresh }) {
  const [firms, setFirms] = useState([]);
  const [firmSearch, setFirmSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedFirm, setSelectedFirm] = useState(null);

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

  const filteredFirms = firms.filter((firm) =>
    firm.name.toLowerCase().includes(firmSearch.toLowerCase())
  );

  useEffect(() => {
    getAllFirms()
      .then((res) => setFirms(res.data))
      .catch(() => setFirms([]));
  }, []);

  useEffect(() => {
    if (selectedCollection) {
      setForm({
        firmId: selectedCollection.firmId || "",
        amount: selectedCollection.amount || "",
        collectionDate: selectedCollection.collectionDate || "",
        paymentMethod: selectedCollection.paymentMethod || "",
        receiptNumber: selectedCollection.receiptNumber || "",
        checkBankName: selectedCollection.checkBankName || "",
        noteDueDate: selectedCollection.noteDueDate || "",
        checkDueDate: selectedCollection.checkDueDate || "",
      });
  
      // Firma adı filtre alanına yazılsın ve seçim hazır hale gelsin
      if (selectedCollection.firmName) {
        setFirmSearch(selectedCollection.firmName);
        setSelectedFirm({
          id: selectedCollection.firmId,
          name: selectedCollection.firmName,
        });
      }
    }
  }, [selectedCollection]);
  
  

  useEffect(() => {
    if (selectedFirm?.id) {
      setForm((prev) => ({ ...prev, firmId: selectedFirm.id }));
    }
  }, [selectedFirm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.paymentMethod) {
      return Swal.fire("Hata", "Lütfen ödeme tipini seçin!", "error");
    }

    try {
      if (selectedCollection) {
        await updateCollection(selectedCollection.id, form);
        Swal.fire("Güncellendi", "Tahsilat başarıyla güncellendi", "success");
        clearSelection?.();
      } else {
        await addCollection(form);
        Swal.fire("Eklendi", "Tahsilat başarıyla eklendi", "success");
      }

      triggerRefresh?.();
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
      setFirmSearch("");
      setSelectedFirm(null);
    } catch (err) {
      console.error(err);
      Swal.fire("Hata", "İşlem başarısız", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 border rounded shadow bg-white">
      <h2 className="text-lg font-bold mb-4">Tahsilat {selectedCollection ? "Güncelle" : "Ekle"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FirmaAutocompleteInput
          firmSearch={firmSearch}
          setFirmSearch={setFirmSearch}
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
          filteredFirms={filteredFirms}
          selectedFirm={selectedFirm}
          setSelectedFirm={setSelectedFirm}
        />

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

        <TahsilatFormInputs
          amount={form.amount}
          setAmount={(v) => setForm((p) => ({ ...p, amount: v }))}
          paymentType={form.paymentMethod}
          setPaymentType={(v) => setForm((p) => ({ ...p, paymentMethod: v }))}
          receiptNumber={form.receiptNumber}
          setReceiptNumber={(v) => setForm((p) => ({ ...p, receiptNumber: v }))}
        />

        <TahsilatExtraFields form={form} handleChange={handleChange} />

        <TahsilatFormActions onSubmit={handleSubmit} />
      </form>
    </div>
  );
}
