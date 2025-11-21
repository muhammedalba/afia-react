import React from "react";

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-600 font-medium w-40 flex-shrink-0">
      {label}
    </span>
    <span className="text-gray-800 break-words">{value || "N/A"}</span>
  </div>
);

export default InfoItem;
