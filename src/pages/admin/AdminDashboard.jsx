import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStatistics } from "../../services/adminService";
import { useGetAllResourcesQuery } from "../../redux/features/api/apiSlice";

const AdminDashboard = () => {
  // get brands from the database
  const { data, error, isLoading, isSuccess } =
    useGetAllResourcesQuery("/Display_doctors");

  const {
    data: patientsData,
    error: patientsError,
    isLoadingL: patientsLoading,
    isSuccess: patientsSuccess,
  } = useGetAllResourcesQuery("/Display_patients");
  const {
    data: examinationsData,
    error: examinationsError,
    isLoadingL: examinationsLoading,
    isSuccess: examinationsSuccess,
  } = useGetAllResourcesQuery("/Display_examinations");
  // const {
  //   data: docktorsNum,
  //   error: docktorsNumError,
  //   isLoadingL: docktorsNumLoading,
  //   isSuccess:docktorsNumSuccess,
  // } = useGetAllResourcesQuery("/numbers_of_doctors");

  // console.log("docktorsNum", docktorsNum);
  console.log("data", patientsData);
  console.log("data", patientsData?.Data?.total);
  console.log("error", error);

  // /numbers_of_doctors
  const [statistics, setStatistics] = useState({
    doctors: 0,
    patients: 10,
    examinations: 20,
    donations: 50,
  });


  const StatCard = ({ title, value, link, color }) => (
    <Link to={link} className="block">
      <div className={`bg-white overflow-hidden shadow rounded-lg ${color}`}>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            {title}
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Doctors"
          value={data?.Data?.total}
          link="/admin/doctors"
          color="hover:bg-blue-50"
        />
        <StatCard
          title="Total Patients"
          value={patientsData?.Data?.total}
          link="/admin/patients"
          color="hover:bg-green-50"
        />
        <StatCard
          title="Total Examinations"
          value={examinationsData?.Data?.total}
          link="/admin/examinations"
          color="hover:bg-yellow-50"
        />
        <StatCard
          title="Total Donations"
          value={statistics.donations}
          link="/admin/donations"
          color="hover:bg-purple-50"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-4 space-y-4">
              <Link
                to="/admin/doctors/approve"
                className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Approve New Doctors
              </Link>
              <Link
                to="/admin/patients/approve"
                className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Approve New Patients
              </Link>
              <Link
                to="/admin/donations/approve"
                className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                Approve Donations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
