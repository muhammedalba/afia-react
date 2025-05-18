import React from "react";
import { Link } from "react-router-dom";
import { useGetAllResourcesQuery } from "../../redux/features/api/apiSlice";
import Preloader from "../../components/Preloader/Preloader";

const AdminDashboard = () => {
  // جلب بيانات الأطباء
  const { data, error, isLoading } =
    useGetAllResourcesQuery("/Display_doctors");

  const {
    data: patientsData,
    error: patientsError,
    isLoading: LoadingPatients,
  } = useGetAllResourcesQuery("/Display_patients");

  const {
    data: examinationsData,
    error: examinationsError,
    isLoading: LoadingExaminations,
  } = useGetAllResourcesQuery("/Display_examinations");

  const StatCard = ({ title, value, link, color }) => (
    <Link to={link} className="block">
      <div className={`bg-white overflow-hidden shadow rounded-lg ${color}`}>
        <div className="px-4 py-5 sm:p-6 text-right">
          <dt className="text-sm font-medium text-gray-500 truncate">
            {title}
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
        </div>
      </div>
    </Link>
  );
  if (isLoading || LoadingPatients || LoadingExaminations) {
    return <Preloader />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-right">
        لوحة التحكم الإدارية
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="إجمالي الأطباء"
          value={'50'}
          link="/admin/doctors"
          color="hover:bg-blue-50"
        />
        <StatCard
          title="إجمالي المرضى"
          value={patientsData?.Data?.total}
          link="/admin/patients"
          color="hover:bg-green-50"
        />
        <StatCard
          title="إجمالي الفحوصات"
          value={examinationsData?.Data?.total}
          link="/admin/examinations"
          color="hover:bg-yellow-50"
        />
        <StatCard
          title="إجمالي التبرعات"
          value={patientsData?.Data?.total}
          link="/admin/donations"
          color="hover:bg-purple-50"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6 text-right">
            <h3 className="text-lg font-medium text-gray-900">إجراءات سريعة</h3>
            <div className="mt-4 space-y-4">
              <Link
                to="/admin/doctors/approve"
                className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                الموافقة على الأطباء الجدد
              </Link>
              <Link
                to="/admin/patients/approve"
                className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                الموافقة على المرضى الجدد
              </Link>
              <Link
                to="/admin/donations/approve"
                className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                الموافقة على التبرعات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
