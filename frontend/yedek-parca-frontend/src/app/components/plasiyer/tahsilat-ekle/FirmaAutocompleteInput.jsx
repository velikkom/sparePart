"use client";

import React from "react";

// FirmaAutocompleteInput.jsx
export default function FirmaAutocompleteInput({
  firmSearch,
  setFirmSearch,
  highlightedIndex,
  setHighlightedIndex,
  filteredFirms,
  selectedFirm,
  setSelectedFirm,
  onFirmSelect, // filtreleme için dıştan seçim yapılabilirlik
}) {
  const handleKeyDown = (e) => {
    if (!filteredFirms.length) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < filteredFirms.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredFirms.length - 1
      );
    } else if ((e.key === "Enter" || e.key === "Tab") && highlightedIndex >= 0) {
      const selected = filteredFirms[highlightedIndex];
      setSelectedFirm?.(selected);
      onFirmSelect?.(selected); // dışarıya bildir
      setTimeout(() => setFirmSearch(selected.name), 0);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={firmSearch}
        onChange={(e) => {
          setFirmSearch(e.target.value);
          setSelectedFirm?.(null);
          onFirmSelect?.(null);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Firma adı girin..."
        className="border p-2 rounded w-full"
      />

      {firmSearch && filteredFirms.length > 0 && !selectedFirm && (
        <ul className="absolute z-10 bg-white border w-full mt-1 max-h-40 overflow-auto shadow">
          {filteredFirms.map((firm, index) => (
            <li
              key={firm.id}
              onClick={() => {
                setSelectedFirm?.(firm);
                onFirmSelect?.(firm);
                setFirmSearch(firm.name);
              }}
              className={`px-3 py-2 cursor-pointer ${
                index === highlightedIndex ? "bg-blue-100" : ""
              }`}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {firm.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



