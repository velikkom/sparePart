import { Button } from "primereact/button";
import { BiTrash } from "react-icons/bi";
export default function TahsilatTable({
  collections = [],
  selected = [],
  onSelect = () => {},
  onEdit = () => {},
  onDelete = () => {},
  loading = false,
}) {
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
            <th className="p-2 border">Not</th>
            <th className="p-2 border">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="p-4 text-center">
                Yükleniyor...
              </td>
            </tr>
          ) : collections.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-4 text-center">
                Kayıt bulunamadı.
              </td>
            </tr>
          ) : (
            collections.map((col) => (
              <tr key={col.id}>
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
                  {col.collectionDate?.slice(0, 10)}
                </td>
                <td className="border p-2">{col.paymentMethod}</td>
                <td className="border p-2">{col.receiptNumber || "-"}</td>
                <td className="border p-2">{col.note || "-"}</td>
                <td className="border p-2 text-center flex gap-2 justify-center">
                  <div className="flex justify-center align-items-between gap-7">
                    <Button
                      className="hover:bg-blue-300"
                      icon="bi bi-pencil"
                      severity="info"
                      rounded
                      text
                      aria-label="Düzenle"
                      onClick={() => onEdit(col)}
                      //tooltip="Düzenle"
                    />
                    <Button
                      className="hover:bg-red-700"
                      icon="bi bi-trash3"
                      severity="danger"
                      rounded
                      text
                      aria-label="Sil"
                      onClick={() => onDelete(col.id)}
                      //tooltip="Sil"
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
