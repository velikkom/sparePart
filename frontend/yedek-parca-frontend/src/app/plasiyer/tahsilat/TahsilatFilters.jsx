"use client";

export default function TahsilatFilters({ query, setQuery, firms, firmSearch, setFirmSearch }) {
  const filteredFirms = firms.filter((firm) =>
    firm.name.toLowerCase().includes(firmSearch.toLowerCase())
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value || "" }));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 relative">
      {/* Firma Arama */}
      <div className="relative">
        <input
          type="text"
          placeholder="Firma ara..."
          value={firmSearch}
          onChange={(e) => {
            setFirmSearch(e.target.value);
            setQuery((prev) => ({ ...prev, firmId: "" }));
          }}
          className="p-2 border w-full"
        />
        {firmSearch && !query.firmId && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
            {filteredFirms.map((firm) => (
              <div
                key={firm.id}
                onClick={() => {
                  setFirmSearch(firm.name);
                  setQuery((prev) => ({ ...prev, firmId: firm.id }));
                }}
                className="p-2 cursor-pointer hover:bg-blue-100"
              >
                {firm.name}
              </div>
            ))}
            {filteredFirms.length === 0 && (
              <div className="p-2 text-gray-500">Eşleşen firma bulunamadı</div>
            )}
          </div>
        )}
      </div>

      {/* Tarihler */}
      <input
        name="startDate"
        type="date"
        value={query.startDate}
        onChange={handleFilterChange}
        className="p-2 border"
      />
      <input
        name="endDate"
        type="date"
        value={query.endDate}
        onChange={handleFilterChange}
        className="p-2 border"
      />

      {/* Ödeme Türü */}
      <select
        name="paymentMethod"
        value={query.paymentMethod}
        onChange={handleFilterChange}
        className="p-2 border"
      >
        <option value="">Tümü</option>
        <option value="CASH">Nakit</option>
        <option value="CREDIT_CARD">Kredi Kartı</option>
        <option value="BANK_TRANSFER">Banka Transferi</option>
        <option value="CHECK">Çek</option>
        <option value="NOTE">Senet</option>
        <option value="OTHER">Diğer</option>
      </select>
    </div>
  );
}
