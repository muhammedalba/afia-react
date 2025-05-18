import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useGetAllResourcesQuery } from "../../redux/features/api/apiSlice";
import { Icon } from "@iconify/react";
import Preloader from "../../components/Preloader/Preloader";

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>{icon}</div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const PatientDashboard = () => {
  const { data, isLoading } = useGetAllResourcesQuery("/My_examinations");

  const { data: AcceptedData, isLoading: AcceptedLoading } =
    useGetAllResourcesQuery("/Accepted_examinations");

  const [stats] = useState({
    totalExaminations: 20,
    pendingExaminations: 40,
    acceptedExaminations: 20,
    totalDonations: 50,
  });

  const { user } = useAuth();

  if (isLoading || AcceptedLoading)
    return <Preloader/>

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">لوحة تحكم المريض</h1>
        <div className="space-x-4 space-x-reverse">
          <Link
            to="/patient/examinations/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            طلب فحص جديد
          </Link>
          <Link
            to="/patient/donations/new"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            التبرع بالدم
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي الفحوصات"
          value={stats.totalExaminations}
          icon={<Icon icon="mdi:flask" className="text-blue-600 w-6 h-6" />}
          color="text-blue-600"
        />
        <StatCard
          title="الفحوصات قيد الانتظار"
          value={stats.pendingExaminations}
          icon={
            <Icon
              icon="mdi:clock-outline"
              className="text-yellow-600 w-6 h-6"
            />
          }
          color="text-yellow-600"
        />
        <StatCard
          title="الفحوصات المقبولة"
          value={stats.acceptedExaminations}
          icon={
            <Icon
              icon="mdi:check-circle-outline"
              className="text-green-600 w-6 h-6"
            />
          }
          color="text-green-600"
        />
        <StatCard
          title="تبرعات الدم"
          value={stats.totalDonations}
          icon={<Icon icon="mdi:water" className="text-red-600 w-6 h-6" />}
          color="text-red-600"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الإجراءات السريعة */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">إجراءات سريعة</h2>
          <div className="space-y-4">
            <Link
              to="/patient/examinations"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:file-document-outline"
                  className="text-gray-500 w-5 h-5"
                />
                <span className="text-gray-700">عرض جميع الفحوصات</span>
              </div>
              <Icon icon="mdi:chevron-left" className="text-gray-400 w-4 h-4" />
            </Link>

            <Link
              to="/patient/donations"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:hand-heart-outline"
                  className="text-gray-500 w-5 h-5"
                />
                <span className="text-gray-700">عرض تبرعات الدم</span>
              </div>
              <Icon icon="mdi:chevron-left" className="text-gray-400 w-4 h-4" />
            </Link>

            <Link
              to="/patient/profile"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:account-circle-outline"
                  className="text-gray-500 w-5 h-5"
                />
                <span className="text-gray-700">تحديث الملف الشخصي</span>
              </div>
              <Icon icon="mdi:chevron-left" className="text-gray-400 w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* آخر الأنشطة */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">آخر الأنشطة</h2>
          <div className="space-y-4">
            {stats.pendingExaminations > 0 && (
              <div className="flex items-center p-4 bg-yellow-50 rounded-lg gap-2">
                <Icon
                  icon="mdi:clock-outline"
                  className="w-5 h-5 text-yellow-700"
                />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    لديك {stats.pendingExaminations} فحص قيد الانتظار
                  </p>
                  <p className="text-sm text-yellow-600">
                    بانتظار موافقة الطبيب
                  </p>
                </div>
              </div>
            )}

            {stats.acceptedExaminations > 0 && (
              <div className="flex items-center p-4 bg-green-50 rounded-lg gap-2">
                <Icon
                  icon="mdi:check-circle-outline"
                  className="w-5 h-5 text-green-700"
                />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    لديك {stats.acceptedExaminations} فحص مقبول
                  </p>
                  <p className="text-sm text-green-600">
                    جاهز للاستشارة الطبية
                  </p>
                </div>
              </div>
            )}

            {stats.totalDonations > 0 && (
              <div className="flex items-center p-4 bg-red-50 rounded-lg gap-2">
                <Icon icon="mdi:water" className="w-5 h-5 text-red-700" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    قمت بـ {stats.totalDonations} تبرع بالدم
                  </p>
                  <p className="text-sm text-red-600">
                    شكرًا لمساهمتك الإنسانية!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
