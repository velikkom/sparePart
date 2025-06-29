"use client";

import { useEffect, useState } from "react";
//import UnassignedFirmList from "@/app/components/admin/user-firm-assign/unassigned-firm-list";
import UnassignedFirmList from "@/app/components/admin/user-firm-assign/unaassigned-firm-list";
import AssignedFirmGroup from "@/app/components/admin/user-firm-assign/assigned-firm-group";
//import UnassignedFirmList from '@/app/components/admin/user-firm-assign/UnassignedFirmList';


import {
  fetchAllFirmAssignmentsAndUsers,
  adminAssignFirm,
  adminReassignFirm,
  adminUnassignFirm,
} from "@/actions/userFirmActions";


export default function FirmaAtamaAdminPage() {
  const [firmAssignments, setFirmAssignments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllFirmAssignmentsAndUsers(setFirmAssignments, setUsers, setLoading);
  }, []);

  const handleAssign = (firmId, userId) =>
    adminAssignFirm(firmId, userId, () =>
      fetchAllFirmAssignmentsAndUsers(setFirmAssignments, setUsers, setLoading)
    );

  const handleReassign = (firmId, newUserId) =>
    adminReassignFirm(firmId, newUserId, () =>
      fetchAllFirmAssignmentsAndUsers(setFirmAssignments, setUsers, setLoading)
    );

  const handleUnassign = (firmId) =>
    adminUnassignFirm(firmId, () =>
      fetchAllFirmAssignmentsAndUsers(setFirmAssignments, setUsers, setLoading)
    );

  const unassignedFirms = firmAssignments.filter((f) => !f.assignedUserId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Admin Firma Atama Paneli
      </h1>

      {loading ? (
        <p className="text-gray-500">Yükleniyor...</p>
      ) : (
        <>
          <UnassignedFirmList
            firms={unassignedFirms}
            users={users}
            onAssign={handleAssign}
          />

          {users.map((user) => {
            const userFirms = firmAssignments.filter(
              (f) => f.assignedUserId === user.id
            );

            return (
              <AssignedFirmGroup
                key={user.id}
                userId={user.id}
                username={user.username}
                firms={userFirms}
                users={users}
                onReassign={handleReassign}
                onUnassign={handleUnassign}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
