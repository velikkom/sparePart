"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  fetchAssignedFirms,
  handleAssignFirm,
  handleUnassignFirm,
} from "@/actions/userFirmActions";
import FirmAssignList from "@/app/components/admin/user-firm-assign/firm-assign-list";
import { getAllFirms } from "@/service/firmservice";

const Page = () => {
  const { userId } = useParams();
  const [firms, setFirms] = useState([]);
  const [assignedFirms, setAssignedFirms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFirms = async () => {
      try {
        const response = await getAllFirms();
        if (response.success) {
          setFirms(response.data);
        }
      } catch (error) {
        console.error("❌ Firma listesi alınamadı:", error.message);
      }
    };

    fetchFirms();
    fetchAssignedFirms(userId, setAssignedFirms, setLoading);
  }, [userId]);

  const assignFirm = async (firmId) => {
    await handleAssignFirm(
      userId,
      firmId,
      (msg) => {
        alert(msg);
        fetchAssignedFirms(userId, setAssignedFirms, setLoading);
      },
      (err) => {
        alert("Hata: " + err);
      }
    );
  };

  const unassignFirm = async (firmId) => {
    await handleUnassignFirm(
      userId,
      firmId,
      (msg) => {
        alert(msg);
        fetchAssignedFirms(userId, setAssignedFirms, setLoading);
      },
      (err) => {
        alert("Hata: " + err);
      }
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Firma Atama</h2>

      {loading ? (
        <p className="text-gray-500">Yükleniyor...</p>
      ) : (
        <FirmAssignList
          firms={firms}
          assignedFirms={assignedFirms}
          onAssign={assignFirm}
          onUnassign={unassignFirm}
        />
      )}
    </div>
  );
};

export default Page;

