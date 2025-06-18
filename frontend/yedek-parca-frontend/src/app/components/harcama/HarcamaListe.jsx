"use client";

import { formatCurrencyWithSymbol } from "@/helpers/formatting";

export default function HarcamaListe({ expenses = [] }) {
  if (!expenses.length) {
    return <p className="mt-4 text-gray-500">Kayıt bulunamadı.</p>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {expenses.map((e) => (
        <li key={e.id} className="p-3 border rounded bg-gray-50 shadow-sm">
          <p>
            <strong className="text-blue-700">{e.type}</strong> –{" "}
            {formatCurrencyWithSymbol(e.amount)}
          </p>
          <p className="text-sm text-gray-600">{e.expenseDate}</p>
        </li>
      ))}
    </ul>
  );
}
