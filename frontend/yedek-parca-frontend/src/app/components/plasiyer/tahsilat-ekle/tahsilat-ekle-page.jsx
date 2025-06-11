"use client";

import { useEffect, useRef, useState } from "react";
import { getSession } from "next-auth/react";
import Swal from "sweetalert2";

import {
  handleSubmit as onFormSubmit,
  handleChange as onInputChange,
  fillFormWithSelectedCollection,
  resetFormState,
} from "../../../../actions/tahsilatEkleActions";

import FirmaAutocompleteInput from "./FirmaAutocompleteInput";
import TahsilatFormInputs from "./TahsilatFormInputs";
import TahsilatExtraFields from "./TahsilatExtraFields";
import TahsilatFormActions from "./TahsilatFormActions";

import { getMyFirms } from "@/service/plasiyerFirmService";
import { getAllFirms } from "@/service/firmservice";

export default function TahsilatEklePage({
  selectedCollection,
  clearSelection,
  triggerRefresh,
}) {
  const [firms, setFirms] = useState([]);
  const [firmSearch, setFirmSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedFirm, setSelectedFirm] = useState(null);

  const [form, setForm] = useState(resetFormState());

  const dateInputRef = useRef(null); // 📌 tarih inputu için ref

  const filteredFirms = Array.isArray(firms)
    ? firms.filter((firm) =>
        firm.name.toLowerCase().includes(firmSearch.toLowerCase())
      )
    : [];

  useEffect(() => {
    const fetchFirmsByRole = async () => {
      try {
        const session = await getSession();
        const roles = session?.user?.roles || [];

        if (roles.includes("ROLE_ADMIN")) {
          const data = await getAllFirms();
          setFirms(data ?? []);
        } else if (roles.includes("ROLE_PLASIYER")) {
          const data = await getMyFirms();
          setFirms(data ?? []);
        }
      } catch (error) {
        console.error("Firma verisi alınamadı", error);
        setFirms([]);
      }
    };

    fetchFirmsByRole();
  }, []);

  useEffect(() => {
    if (selectedCollection) {
      fillFormWithSelectedCollection(
        selectedCollection,
        setForm,
        setFirmSearch,
        setSelectedFirm
      );
    }
  }, [selectedCollection]);

  useEffect(() => {
    if (selectedFirm?.id) {
      setForm((prev) => ({ ...prev, firmId: selectedFirm.id }));
    }
  }, [selectedFirm]);

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 border rounded shadow bg-white">
      <h2 className="text-lg font-bold mb-4">
        Tahsilat {selectedCollection ? "Güncelle" : "Ekle"}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit({
            form,
            selectedCollection,
            clearSelection,
            triggerRefresh,
            setForm,
            setFirmSearch,
            setSelectedFirm,
          });
        }}
        className="space-y-4"
      >
        <FirmaAutocompleteInput
          firmSearch={firmSearch}
          setFirmSearch={setFirmSearch}
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
          filteredFirms={filteredFirms}
          selectedFirm={selectedFirm}
          setSelectedFirm={setSelectedFirm}
          onFirmSelect={(firm) => {
            setSelectedFirm(firm);
            if (firm && dateInputRef.current) {
              dateInputRef.current.focus(); // ✅ firma seçilince tarih inputuna geç
            }
          }}
        />

        <div>
          <label className="block mb-1 font-medium">Tarih</label>
          <input
            ref={dateInputRef}
            type="date"
            name="collectionDate"
            value={form.collectionDate}
            onChange={(e) => onInputChange(e, setForm)}
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

        <TahsilatExtraFields
          form={form}
          handleChange={(e) => onInputChange(e, setForm)}
        />

        <TahsilatFormActions />
      </form>
    </div>
  );
}
