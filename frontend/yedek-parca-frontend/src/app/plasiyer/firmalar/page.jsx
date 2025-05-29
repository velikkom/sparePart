"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/utils/tokenHelpers";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";

const FirmaListesiPage = () => {
  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyFirms = async () => {
    try {
      const token = getToken(); // localStorage'dan JWT al
      const response = await fetch(
        "http://localhost:8080/api/plasiyer/my-firms",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Veri alınamadı.");
      }

      const data = await response.json();
      setFirms(data);
    } catch (error) {
      console.error("Firmalar alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFirms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Atanmış Firmalarım</h1>
      {firms.length === 0 ? (
        <p>Size atanmış herhangi bir firma bulunmamaktadır.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-4">
          {firms.map((firm) => (
            <Card
              key={firm.id}
              title={firm.name}
              subTitle={`Vergi No: ${firm.taxNumber}`}
              className="transition-transform transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-300 hover:border-blue-500 "
            >
              <p>
                <strong>Telefon:</strong> {firm.phone}
              </p>
              <p>
                <strong>Adres:</strong> {firm.address}
              </p>
              <p>
                <strong>Kodu:</strong> {firm.code}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FirmaListesiPage;
