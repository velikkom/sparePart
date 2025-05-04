import { useState, useMemo } from "react";
import FirmaAutocompleteInput from "../tahsilat-ekle/FirmaAutocompleteInput";

export default function TahsilatFilters({ filters, setFilters, firms = [] }) {
  const [firmSearch, setFirmSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const filteredFirms = useMemo(() => {
    return firms.filter((f) =>
      f.name.toLowerCase().includes(firmSearch.toLowerCase())
    );
  }, [firmSearch, firms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      {/* Firma Autocomplete */}
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

      {/* Diğer filtre alanları aynı kalabilir */}
      <input
        type="date"
        name="startDate"
        value={filters.startDate || ""}
        onChange={handleChange}
        className="p-2 border w-full"
      />

      <input
        type="date"
        name="endDate"
        value={filters.endDate || ""}
        onChange={handleChange}
        className="p-2 border w-full"
      />

      <select
        name="paymentMethod"
        value={filters.paymentMethod || ""}
        onChange={handleChange}
        className="p-2 border w-full"
      >
        <option value="">Tümü</option>
        <option value="CASH">Nakit</option>
        <option value="CHECK">Çek</option>
        <option value="NOTE">Senet</option>
      </select>

      <div className="flex gap-2">
        <input
          type="number"
          name="minAmount"
          placeholder="Min tutar"
          value={filters.minAmount || ""}
          onChange={handleChange}
          className="p-2 border w-full"
        />
        <input
          type="number"
          name="maxAmount"
          placeholder="Max tutar"
          value={filters.maxAmount || ""}
          onChange={handleChange}
          className="p-2 border w-full"
        />
      </div>
    </div>
  );
}
