"use client";

import { useEffect, useState } from "react";
import { getFirmById } from "@/service/firmservice";

const FirmaDetayPage = ({ firmId }) => {
    const [firm, setFirm] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFirm = async () => {
            try {
                const data = await getFirmById(firmId);
                setFirm(data);
            } catch (err) {
                console.error("Firma detay alınamadı:", err);
            } finally {
                setLoading(false);
            }
        };

        if (firmId) {
            fetchFirm();
        }
    }, [firmId]);

    if (loading) return <p className="text-center">Yükleniyor...</p>;
    if (!firm) return <p className="text-center text-red-500">Firma bulunamadı.</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">{firm.name}</h1>
            <p><strong>Vergi No:</strong> {firm.taxNumber}</p>
            <p><strong>Adres:</strong> {firm.address}</p>
            <p><strong>Telefon:</strong> {firm.phone}</p>
            <p><strong>Kodu:</strong> {firm.code}</p>
        </div>
    );
};

export default FirmaDetayPage;
