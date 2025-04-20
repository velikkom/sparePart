"use client";

import useAuthGuard from "@/helpers/hooks/useAuthGuard";
import TahsilatEklePage from "./tahsilat-ekle-page";
import TahsilatListesiPage from "./tahsilat-list-page";
import { useState } from "react";
import TahsilatListesi from "./tahsilat-list-page";

export default function Page() {
  
  const [selectedCollection, setSelectedCollection] = useState(null);

  const handleEdit = (collection) => {
    console.log("Edit çağrıldı:", collection);
    setSelectedCollection(collection);
  };

  const clearSelection = () => {
    setSelectedCollection(null);
  };

  return (
    <div className="space-y-8">
      <TahsilatEklePage
        selectedCollection={selectedCollection}
        clearSelection={clearSelection}
      />
      <TahsilatListesi onEdit={handleEdit} />
    </div>
  );
};

