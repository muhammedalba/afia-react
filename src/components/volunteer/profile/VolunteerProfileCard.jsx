import React from "react";
import PropTypes from "prop-types";

const VolunteerProfileCard = ({ volunteer, onEditClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="flex justify-between items-start">
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
              رقم المتطوع: {volunteer.id}
            </div>
            <button
              onClick={onEditClick}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="h-4 w-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              تعديل
            </button>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {volunteer.full_name}
          </h2>
          <p className="mt-2 text-gray-600">
            {volunteer.role} في {volunteer.volunteer_place}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {volunteer.study_status && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                {volunteer.study_status}
              </span>
            )}
            {volunteer.academic_degree && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {volunteer.academic_degree}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

VolunteerProfileCard.propTypes = {
  volunteer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    full_name: PropTypes.string.isRequired,
    role: PropTypes.string,
    volunteer_place: PropTypes.string,
    study_status: PropTypes.string,
    academic_degree: PropTypes.string,
  }).isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default VolunteerProfileCard;
