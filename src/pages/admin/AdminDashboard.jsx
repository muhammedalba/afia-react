import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAllResourcesQuery } from "../../redux/features/api/apiSlice";
import Preloader from "../../components/Preloader/Preloader";
import { pageTitle } from "../../helper";
import StatCard from "../../components/shared/StatCard";
import CustomActiveShapePieChart from "../../components/charts/CustomActiveShapePieChart";
import PieChartWithCustomizedLabel from "../../components/charts/PieChartWithCustomizedLabel";

const AdminDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    pageTitle(" لوحة التحكم");
  }, []);

  const { data, error, isLoading } = useGetAllResourcesQuery(
    "/numbers_of_doctors"
  );
  const {
    data: patientsData,
    error: patientsError,
    isLoading: LoadingPatients,
  } = useGetAllResourcesQuery("/numbers_of_patients");

  const {
    data: examinationsData,
    error: examinationsError,
    isLoading: LoadingExaminations,
  } = useGetAllResourcesQuery("/numbers_of_examinations");

  const {
    data: numbersDonationsData,
    error: numbersDonationsError,
    isLoading: LoadingDonations,
  } = useGetAllResourcesQuery("/numbers_of_blood_donations");

  const Donations = numbersDonationsData?.Data?.map((data, n) => (
    <StatCard
      key={n}
      title={` ( ${data?.blood_type?.toString()} ) نوع  زمرة الدم  `}
      value={data?.count}
      link="/admin/doctors"
      color="hover:bg-blue-50"
      icon={"openmoji:male-doctor"}
    />
  ));

  const chartSummaryData = [
    { name: "الأطباء", value: data?.Data || 0 },
    { name: "المرضى", value: patientsData?.Data || 0 },
    { name: "الفحوصات", value: examinationsData?.Data || 0 },
    { name: "التبرعات", value: numbersDonationsData?.Data?.length || 0 },
  ];

  if (isLoading || LoadingPatients || LoadingExaminations || LoadingDonations) {
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
          value={data?.Data}
          link="/admin/doctors"
          color="hover:bg-blue-50"
          icon={"openmoji:male-doctor"}
        />
        <StatCard
          title="إجمالي المرضى"
          value={patientsData?.Data}
          link="/admin/patients"
          color="hover:bg-green-50"
          icon={"mdi:patient"}
        />
        <StatCard
          title="إجمالي الفحوصات"
          value={examinationsData?.Data}
          link="/admin/examinations"
          color="hover:bg-yellow-50"
          icon={"flat-color-icons:inspection"}
        />
        <StatCard
          title="إجمالي التبرعات"
          value={numbersDonationsData?.Data?.length}
          link="/admin/donations"
          color="hover:bg-purple-50"
          icon={"mdi:donation-outline"}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 mt-3 sm:grid-cols-2 lg:grid-cols-4">
        {Donations}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-right">ملخص إحصائي</h2>
          <CustomActiveShapePieChart data={chartSummaryData} />
        </div>

        {numbersDonationsData?.Data && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-right">
              توزيع التبرعات حسب الزمرة
            </h2>
            <PieChartWithCustomizedLabel data={numbersDonationsData.Data} />
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6 text-right">
            <h3 className="text-lg font-medium text-gray-900">إجراءات سريعة</h3>
            <div className="mt-4 space-y-4">
              <Link
                to="/admin/patients"
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
