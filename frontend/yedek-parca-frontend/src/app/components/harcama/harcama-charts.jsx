"use client";

import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";

export default function HarcamaChart({ expenses }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const grouped = expenses.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + item.amount;
      return acc;
    }, {});

    const labels = Object.keys(grouped);
    const values = Object.values(grouped);

    setChartData({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726",
            "#EC407A",
            "#AB47BC",
            "#FF7043"
          ]
        }
      ]
    });
  }, [expenses]);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-md font-bold mb-3">Masraf Türlerine Göre Dağılım</h3>
      <Chart type="pie" data={chartData} />
    </div>
  );
}
