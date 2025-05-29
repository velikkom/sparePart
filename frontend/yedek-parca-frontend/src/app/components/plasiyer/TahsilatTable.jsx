"use client";

export default function TahsilatTable({
  collections = [],
  selected = [],
  onSelect = () => {},
  onEdit = () => {},
  onDelete = () => {},
  loading = false,
}) {
  console.log("🟢 [TABLE] Gelen collections verisi:", collections);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Seç</th>
            <th className="p-2 border">Firma</th>
            <th className="p-2 border">Tutar</th>
            <th className="p-2 border">Tarih</th>
            <th className="p-2 border">Ödeme Tipi</th>
            <th className="p-2 border">Makbuz No</th>
            <th className="p-2 border">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="p-4 text-center">
                Yükleniyor...
              </td>
            </tr>
          ) : collections.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-4 text-center">
                Kayıt bulunamadı.
              </td>
            </tr>
          ) : (
            collections.map((col, index) => {
              console.log(`🔍 [TABLE row ${index}]`, col);

              return (
                <tr key={col.id || `no-id-${index}`}>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={col.id && selected.includes(String(col.id))}
                      onChange={(e) => onSelect(String(col.id), e.target.checked)}
                    />
                  </td>
                  <td className="border p-2">{col.firmName || "-"}</td>
                  <td className="border p-2">{col.amount}</td>
                  <td className="border p-2">
                    {col.collectionDate?.slice(0, 10) || "-"}
                  </td>
                  <td className="border p-2">{col.paymentMethod || "-"}</td>
                  <td className="border p-2">{col.receiptNumber || "-"}</td>
                  <td className="border p-2 text-center space-x-2">
                    <button
                      onClick={() => onEdit(col)}
                      className="text-blue-600 hover:underline"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(col.id)}
                      className="text-red-600 hover:underline"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
