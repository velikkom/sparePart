"use client";

import { useEffect, useState } from "react";
import useAuthGuard from "@/helpers/hooks/useAuthGuard"; // ✅ hook eklendi
import { deleteUser, fetchUsers, toggleUserStatus, updateUserRoles } from "@/service/userService";


export default function AdminUserListPage() {
  useAuthGuard("ROLE_ADMIN"); // ✅ sadece admin girebilir

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error("❌ Kullanıcılar alınamadı:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
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

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Kullanıcı Listesi</h2>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <table className="w-full border border-gray-300">
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
      )}
    </div>
  );
}
