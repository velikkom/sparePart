"use client";

import { useState } from "react";

const UnassignedFirmList = ({ firms, users, onAssign }) => {
  const [selectedUsers, setSelectedUsers] = useState({});

  const handleSelectChange = (firmId, userId) => {
    setSelectedUsers((prev) => ({ ...prev, [firmId]: userId }));
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Atanmamış Firmalar</h3>
      {firms.length === 0 ? (
        <p className="text-gray-500 italic">Tüm firmalar atanmış 🎉</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {firms.map((firm) => (
            <div
              key={firm.firmId}
              className="border rounded p-4 shadow-sm bg-white flex flex-col gap-2"
            >
              <div className="font-medium text-gray-800">{firm.firmName}</div>

              <select
                className="border p-1 rounded"
                value={selectedUsers[firm.firmId] || ""}
                onChange={(e) =>
                  handleSelectChange(firm.firmId, e.target.value)
                }
              >
                <option value="">Plasiyer Seç</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  onAssign(firm.firmId, selectedUsers[firm.firmId])
                }
                disabled={!selectedUsers[firm.firmId]}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded disabled:bg-gray-400"
              >
                Ata
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnassignedFirmList;
