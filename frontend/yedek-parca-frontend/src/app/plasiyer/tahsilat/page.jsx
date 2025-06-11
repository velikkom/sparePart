"use client";
import TahsilatEklePage from "../../components/plasiyer/tahsilat-ekle/tahsilat-ekle-page";
import { useState } from "react";
import TahsilatListesi from "../../components/plasiyer/tahsilat-listele/tahsilat-list-page";

export default function Page() {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  const handleEdit = (collection) => {   
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
        triggerRefresh={() => setRefreshList((prev) => !prev)}
      />
      <TahsilatListesi
        onEdit={handleEdit}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
      />
    </div>
  );
}
