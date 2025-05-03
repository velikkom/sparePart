"use client";

export default function TahsilatTable({ collections, selected, onSelect, onEdit, onDelete }) {
  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Seç</th>
          <th className="border p-2">Firma</th>
          <th className="border p-2">Tutar</th>
          <th className="border p-2">Tarih</th>
          <th className="border p-2">Ödeme Tipi</th>
          <th className="border p-2">Makbuz No</th>
          <th className="border p-2">İşlem</th>
        </tr>
      </thead>
      <tbody>
        {collections.map((col) => (
          <tr key={col.id}>
            <td className="border p-2 text-center">
              <input
                type="checkbox"
                checked={selected.includes(col.id)}
                onChange={(e) => onSelect(col.id, e.target.checked)}
              />
            </td>
            <td className="border p-2">{col.firmName}</td>
            <td className="border p-2">{col.amount.toLocaleString("tr-TR")} ₺</td>
            <td className="border p-2">{col.collectionDate}</td>
            <td className="border p-2">{col.paymentMethod}</td>
            <td className="border p-2">{col.receiptNumber || "-"}</td>
            <td className="border p-2 flex gap-2">
              <button onClick={() => onEdit(col)}>✏️</button>
              <button onClick={() => onDelete(col.id)}>🗑️</button>
            </td>
          </tr>
        ))}
        {collections.length === 0 && (
          <tr>
            <td colSpan="7" className="text-center py-4 text-gray-500">
              Kayıt bulunamadı.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
