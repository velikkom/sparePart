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
              className="bg-white p-4 border rounded shadow-md flex flex-col justify-between transition-transform hover:scale-[1.02] hover:shadow-lg hover:border-blue-500"
            >
              <div className="font-semibold text-gray-800 text-lg">
                {firm.firmName}
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <select
                  className="border p-2 rounded w-full"
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:bg-gray-300"
                >
                  Ata
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnassignedFirmList;
