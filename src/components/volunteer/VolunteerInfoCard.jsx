import React from "react";

const VolunteerInfoCard = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
      {title}
    </h3>
    <div className="space-y-3">{children}</div>
  </div>
);

export default VolunteerInfoCard;
