import React from "react";

const ComplaintsTab = ({ complaints = [] }) => (
  <div className="space-y-4">
    {complaints.length > 0 ? (
      complaints.map((complaint) => (
        <div key={complaint.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  complaint.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {complaint.status === "pending"
                  ? "قيد الانتظار"
                  : "تمت المعالجة"}
              </span>
              <p className="mt-2 text-gray-700">{complaint.content}</p>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(complaint.created_at).toLocaleDateString("ar-EG")}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-12 bg-white rounded-xl shadow">
        <p className="text-gray-500">لا توجد شكاوى</p>
      </div>
    )}
  </div>
);

export default ComplaintsTab;
