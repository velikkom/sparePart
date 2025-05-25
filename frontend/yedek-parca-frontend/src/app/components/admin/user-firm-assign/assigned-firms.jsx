"use client";

import React from "react";

const AssignedFirms = ({ assignedFirms }) => {
  if (!assignedFirms?.length) {
    return (
      <div className="mt-6 text-gray-500 italic">
        Henüz atanmış bir firma yok.
      </div>
    );
  }
  console.log("AssignedFirms:", assignedFirms);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Atanmış Firmalar</h3>
      <ul className="list-disc list-inside space-y-1 text-gray-800">
        {assignedFirms.map((firms) => (
          <li key={firms.firmId}>{firms.firmName}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssignedFirms;
