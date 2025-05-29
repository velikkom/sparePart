"use client";

import { useState } from "react";

const AssignedFirmGroup = ({
  userId,
  username,
  firms,
  users,
  onReassign,
  onUnassign,
}) => {
  const [selectedUsers, setSelectedUsers] = useState({});

  const handleChange = (firmId, newUserId) => {
    setSelectedUsers((prev) => ({ ...prev, [firmId]: newUserId }));
  };

  return (
    <div className="mb-8 border rounded p-4 shadow-sm bg-gray-50">
      <h3 className="text-lg font-semibold text-blue-700 mb-4">
        {username} adlı plasiyere atanmış firmalar
      </h3>

      {firms.length === 0 ? (
        <p className="text-sm text-gray-500">
          Bu kullanıcıya atanmış firma yok.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {firms.map((firm) => (
            <div
              key={firm.firmId}
              className="bg-white p-4 border rounded shadow-md flex flex-col justify-between transition-transform hover:scale-[1.02] hover:shadow-lg hover:border-blue-500"
            >
              <span className="font-semibold text-gray-800 text-lg">
                {firm.firmName}
              </span>

              <div className="flex flex-col gap-2 mt-3">
                <select
                  value={selectedUsers[firm.firmId] || ""}
                  onChange={(e) => handleChange(firm.firmId, e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Başka plasiyere ata</option>
                  {users
                    .filter((u) => u.id !== userId)
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
                </select>

                <div className="flex gap-2 justify-between">
                  <button
                    disabled={!selectedUsers[firm.firmId]}
                    onClick={() =>
                      onReassign(firm.firmId, selectedUsers[firm.firmId])
                    }
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm disabled:bg-gray-300"
                  >
                    Güncelle
                  </button>

                  <button
                    onClick={() => onUnassign(firm.firmId)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedFirmGroup;
