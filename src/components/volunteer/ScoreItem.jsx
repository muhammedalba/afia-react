import React from "react";

const ScoreItem = ({ label, score, color }) => (
  <div className={`bg-gradient-to-r ${color} p-4 rounded-lg text-white`}>
    <p className="text-sm font-medium">{label}</p>
    <p className="text-2xl font-bold">{score}%</p>
  </div>
);

export default ScoreItem;
