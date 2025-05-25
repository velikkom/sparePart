"use client";

import { useState, useEffect } from "react";
import { getAllFirms } from "@/service/firmservice";
import FirmForm from "../components/firms/FirmForm";
import FirmList from "../components/firms/FirmList";
import { Container, Row, Col } from "react-bootstrap";

const FirmaPaneli = () => {
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [firms, setFirms] = useState([]);

  const fetchFirms = async () => {
    try {
      const data = await getAllFirms();
  
      if (Array.isArray(data)) {
        // ✅ backend doğrudan list dönüyor
        setFirms(data);
      } else if (Array.isArray(data?.content)) {
        // ✅ Spring pagination yapısı
        setFirms(data.content);
      } else if (Array.isArray(data?.data)) {
        // ✅ {"data": [firm1, firm2]} gibi yapı
        setFirms(data.data);
      } else {
        console.error("Beklenmeyen firma veri yapısı:", data);
        setFirms([]);
      }
    } catch (error) {
      console.error("Firmaları çekerken hata oluştu:", error);
      setFirms([]);
    }
  };
  
  

  useEffect(() => {
    fetchFirms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <Container>
        <h2 className="text-3xl text-center font-bold mb-6">Firma Paneli</h2>

        <Row className="g-4">
          <Col xs={12} lg={4}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-center mb-4">
                Firma Ekle/Düzenle
              </h3>
              <FirmForm
                selectedFirm={selectedFirm}
                setSelectedFirm={setSelectedFirm}
                fetchFirms={fetchFirms}
              />
            </div>
          </Col>

          <Col xs={12} lg={8}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-center mb-4">
                Firma Listesi
              </h3>
              <FirmList
                firms={firms}
                setSelectedFirm={setSelectedFirm}
                fetchFirms={fetchFirms}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FirmaPaneli;
