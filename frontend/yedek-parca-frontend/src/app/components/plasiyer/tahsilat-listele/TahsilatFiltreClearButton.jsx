"use client";

import { Button } from "primereact/button";

export default function TahsilatFiltreClearButton({ setFilters }) {
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
  const handleClearFilters = () => {
    setFilters({
      firmId: "",
      startDate: "",
      endDate: "",
      paymentMethod: "",
      minAmount: "",
      maxAmount: "",
    });
  };

  return (
    <Button
      label="Filtreleri Temizle"
      icon="pi pi-filter-slash"
      className="p-button-outlined p-button-danger"
      onClick={clearAllFilters}
    />
  );
}
