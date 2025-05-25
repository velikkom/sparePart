import { useState, useMemo } from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import FirmaAutocompleteInput from "../tahsilat-ekle/FirmaAutocompleteInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TahsilatFilters({ filters, setFilters, firms = [] }) {
  const [firmSearch, setFirmSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const clearAllFilters = () => {
    setFilters({
      firmId: "",
      startDate: "",
      endDate: "",
      paymentMethod: "",
      minAmount: "",
      maxAmount: "",
    });
  };

  const filteredFirms = useMemo(() => {
    return firms.filter((f) =>
      f.name.toLowerCase().includes(firmSearch.toLowerCase())
    );
  }, [firmSearch, firms]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      {/* Firma autocomplete */}
      <FirmaAutocompleteInput
        firmSearch={firmSearch}
        setFirmSearch={setFirmSearch}
        highlightedIndex={highlightedIndex}
        setHighlightedIndex={setHighlightedIndex}
        filteredFirms={filteredFirms}
        selectedFirm={firms.find((f) => f.id === filters.firmId)}
        onFirmSelect={(firm) =>
          setFilters((prev) => ({ ...prev, firmId: firm?.id || "" }))
        }
      />

      {/* Başlangıç Tarihi */}
      <div className="relative w-full">
        <Calendar
          value={filters.startDate ? new Date(filters.startDate) : null}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, startDate: e.value }))
          }
          placeholder="Başlangıç Tarihi"
          dateFormat="dd.mm.yy"
          showIcon
          className="w-full"
          inputClassName="w-full"
          inputStyle={{ padding: "0.5rem" }}
          monthNavigator
          yearNavigator
          yearRange="2000:2030"
          maxDate={new Date()}
        />
        {filters.startDate && (
          <i
            className="pi pi-times-circle absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 cursor-pointer"
            onClick={() => setFilters((prev) => ({ ...prev, startDate: "" }))}
            title="Tarihi temizle"
          />
        )}
      </div>

      {/* Bitiş Tarihi */}
      <div className="relative w-full">
        <Calendar
          value={filters.endDate ? new Date(filters.endDate) : null}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, endDate: e.value }))
          }
          placeholder="Bitiş Tarihi"
          dateFormat="dd.mm.yy"
          showIcon
          showOnFocus
          className="w-full border-gray-300"
          inputClassName="w-full"
          inputStyle={{ padding: "0.5rem" }}
          monthNavigator
          yearNavigator
          yearRange="2000:2030"
          maxDate={new Date()}
          minDate={filters.startDate ? new Date(filters.startDate) : null}
        />
       
        {filters.endDate && (
          <i
            className="pi pi-times-circle absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 cursor-pointer"
            onClick={() => setFilters((prev) => ({ ...prev, endDate: "" }))}
            title="Tarihi temizle"
          />
        )}
      </div>

      {/* Ödeme Tipi */}
      <select
        name="paymentMethod"
        value={filters.paymentMethod || ""}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, paymentMethod: e.target.value }))
        }
        className="p-2 border w-full"
      >
        <option value="">Tümü</option>
        <option value="CASH">Nakit</option>
        <option value="CHECK">Çek</option>
        <option value="NOTE">Senet</option>
        <option value="BANK_TRANSFER">Banka Transferi</option>
        <option value="CREDIT_CARD">Kredi Kartı</option>
      </select>

      {/* Tutar Aralığı */}
      <div className="flex gap-2">
        <input
          type="number"
          name="minAmount"
          placeholder="Min tutar"
          value={filters.minAmount}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              minAmount: e.target.value ? Number(e.target.value) : "",
            }))
          }
          className="p-2 border w-full"
        />

        <input
          type="number"
          name="maxAmount"
          placeholder="Max tutar"
          value={filters.maxAmount}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxAmount: e.target.value ? Number(e.target.value) : "",
            }))
          }
          className="p-2 border w-full"
        />
      </div>
    </div>
  );
}
