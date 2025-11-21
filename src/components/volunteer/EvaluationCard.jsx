import React from "react";
import ScoreItem from "./ScoreItem";
import ProgressBar from "./ProgressBar";

const EvaluationCard = ({ evaluation }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ar-EG", options);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">
            تقييم الفريق: {evaluation.team_name}
          </h3>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            {formatDate(evaluation.evaluation_date)}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Final Score */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="relative">
              <svg className="w-32 h-32">
                <circle
                  className="text-gray-200"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="50"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-blue-600"
                  strokeWidth="10"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="50"
                  cx="64"
                  cy="64"
                  strokeDasharray={`${evaluation.final_score * 3.14} 314`}
                  transform="rotate(-90 64 64)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">
                  {evaluation.final_score}%
                </span>
              </div>
            </div>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mt-2">
            التقييم النهائي
          </h4>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ScoreItem
            label="التقييم الأولي"
            score={evaluation.initial_score}
            color="from-blue-500 to-blue-400"
          />
          <ScoreItem
            label="التقييم الشهري"
            score={evaluation.monthly_score}
            color="from-green-500 to-green-400"
          />
          <ScoreItem
            label="درجة المشاركات"
            score={evaluation.posts_score}
            color="from-purple-500 to-purple-400"
          />
          <ScoreItem
            label="درجة النشاط"
            score={evaluation.activity_score}
            color="from-yellow-500 to-yellow-400"
          />
        </div>

        {/* Additional Scores */}
        <div className="space-y-3 mb-6">
          <ProgressBar
            label="درجة الإبداع"
            value={evaluation.creativity_score}
            max={10}
          />
          <ProgressBar
            label="درجة الالتزام"
            value={evaluation.commitment_score}
            max={10}
          />
          <ProgressBar
            label="حضور الاجتماعات"
            value={evaluation.meetings_attendance}
            max={5}
          />
          <ProgressBar
            label="المشاركة في التواصل"
            value={evaluation.networking_participation}
            max={5}
          />
        </div>

        {/* Notes Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">ملاحظات المشرف</h4>
            <p className="text-gray-700">{evaluation.supervisor_opinion}</p>
          </div>

          {evaluation.negatives_notes && (
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">ملاحظات سلبية</h4>
              <p className="text-gray-700">{evaluation.negatives_notes}</p>
            </div>
          )}

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">الأفكار المقدمة</h4>
            <p className="text-gray-700">{evaluation.ideas_presented}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationCard;
