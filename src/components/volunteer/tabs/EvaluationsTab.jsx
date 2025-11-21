import React from "react";
import EvaluationCard from "../EvaluationCard";

const EvaluationsTab = ({ evaluations = [] }) => (
  <div className="space-y-6">
    {evaluations.length > 0 ? (
      evaluations.map((evaluation) => (
        <EvaluationCard key={evaluation.id} evaluation={evaluation} />
      ))
    ) : (
      <div className="text-center py-12 bg-white rounded-xl shadow">
        <p className="text-gray-500">لا توجد سجلات تقييم</p>
      </div>
    )}
  </div>
);

export default EvaluationsTab;
