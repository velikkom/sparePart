"use client";

import React from "react";

const FirmAssignList = ({ firms, assignedFirms, onAssign, onUnassign }) => {
  const assignedFirmIds = assignedFirms.map((f) => f.firmId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
      {firms.map((firm) => {
        const isAssigned = assignedFirmIds.includes(firm.id);

        return (
          <div
            key={firm.id}
            className={`flex flex-col justify-between p-4 border rounded shadow-sm ${
              isAssigned ? "bg-green-50 border-green-300" : "bg-white"
            }`}
          >
            <span className={`mb-2 text-sm font-medium ${isAssigned ? "text-green-700" : "text-gray-800"}`}>
              {firm.name}
            </span>

            {isAssigned ? (
              <button
                onClick={() => onUnassign(firm.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Kaldır 
              </button>
            ) : (
              <button
                onClick={() => onAssign(firm.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
              >
                Ata 
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FirmAssignList;
