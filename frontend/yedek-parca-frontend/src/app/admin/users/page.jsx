"use client";
import { useEffect, useState } from "react";
import {
  fetchUsers,
  deleteUser,
  toggleUserStatus,
  updateUserRoles,
} from "@/service/userService";
import {
  fetchAllFirmAssignmentsAndUsers,
  adminAssignFirm,
  adminReassignFirm,
  adminUnassignFirm,
} from "@/actions/userFirmActions";
import UnassignedFirmList from "@/app/components/admin/user-firm-assign/unaassigned-firm-list";
import AssignedFirmGroup from "@/app/components/admin/user-firm-assign/assigned-firm-group";

export default function AdminUserListPage() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [firmAssignments, setFirmAssignments] = useState([]);
  const [loadingFirms, setLoadingFirms] = useState(true);

  const getUsers = async () => {
    try {
      setLoadingUsers(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error("❌ Kullanıcılar alınamadı:", err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  const getFirmAssignmentData = () =>
    fetchAllFirmAssignmentsAndUsers(setFirmAssignments, setUsers, setLoadingFirms);

  useEffect(() => {
    getUsers();
    getFirmAssignmentData();
  }, []);

  const handleToggle = async (id) => {
    await toggleUserStatus(id);
    getUsers();
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bu kullanıcı silinsin mi?");
    if (!confirm) return;
    await deleteUser(id);
    getUsers();
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRoles(userId, [newRole]);
      getUsers();
    } catch (err) {
      alert("Rol güncellenirken hata oluştu");
    }
  };

  const handleAssign = (firmId, userId) =>
    adminAssignFirm(firmId, userId, getFirmAssignmentData);

  const handleReassign = (firmId, newUserId) =>
    adminReassignFirm(firmId, newUserId, getFirmAssignmentData);

  const handleUnassign = (firmId) =>
    adminUnassignFirm(firmId, getFirmAssignmentData);

  const plasiyerUsers = users.filter((u) => u.roles.includes("ROLE_PLASIYER"));
  const unassignedFirms = firmAssignments.filter((f) => !f.assignedUserId);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Kullanıcı Yönetimi</h1>

      {loadingUsers ? (
        <p>Yükleniyor...</p>
      ) : (
        <>
          {/* Responsive Scrollable Table */}
          <div className="overflow-x-auto mb-12">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Ad</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Aktif</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t text-center">
                    <td className="p-2">{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        value={user.roles[0]}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="ROLE_ADMIN">Admin</option>
                        <option value="ROLE_PLASIYER">Plasiyer</option>
                        <option value="ROLE_USER">Kullanıcı</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className={`px-2 py-1 rounded ${
                          user.active ? "bg-green-500" : "bg-red-500"
                        } text-white text-sm`}
                        onClick={() => handleToggle(user.id)}
                      >
                        {user.active ? "Aktif" : "Pasif"}
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-600 hover:bg-red-700 px-2 py-1 text-white rounded text-sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Firma Atama Paneli */}
          <h2 className="text-2xl font-semibold mb-4">Firma Atama Paneli</h2>

          {loadingFirms ? (
            <p>Firmalar yükleniyor...</p>
          ) : (
            <>
              <UnassignedFirmList
                firms={unassignedFirms}
                users={plasiyerUsers}
                onAssign={handleAssign}
              />

              {plasiyerUsers.map((user) => {
                const userFirms = firmAssignments.filter(
                  (f) => f.assignedUserId === user.id
                );
                return (
                  <AssignedFirmGroup
                    key={user.id}
                    userId={user.id}
                    username={user.username}
                    firms={userFirms}
                    users={plasiyerUsers}
                    onReassign={handleReassign}
                    onUnassign={handleUnassign}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}
