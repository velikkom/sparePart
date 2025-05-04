"use client";

import React from "react";

const TahsilatFormActions = ({ onSubmit, isSubmitting = false }) => {
  return (
    <div className="mt-4">
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
};

export default TahsilatFormActions;
