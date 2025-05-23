import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Preloader from "../../components/Preloader/Preloader";
import { useGetAllResourcesQuery } from "../../redux/features/api/apiSlice";

const AdminProfile = () => {
  const { data, isLoading, error } = useGetAllResourcesQuery("/admin_profile");

  if (isLoading) return <Preloader />;
  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        حدث خطأ أثناء تحميل البيانات
      </div>
    );

  const profile = data?.Data;

  return (
    <div className="container mx-auto px-4 py-10 text-right">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-l from-bgColor to-secondary text-white px-6 md:px-10 py-8 relative">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white/50 flex items-center justify-center">
                <Icon
                  icon="mdi:account-circle"
                  color="fc4c56"
                  className="w-24 h-24 text-white"
                />
              </div>
              <div className="text-center md:text-right">
                <h1 className="text-3xl md:text-4xl font-bold">{profile?.full_name}</h1>
                <p className="text-white/80 text-lg mt-1">مدير النظام</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 md:px-10 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Personal Info */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  المعلومات الشخصية
                </h2>
                <div className="space-y-5">
                  <ProfileItem
                    icon="mdi:email-outline"
                    label="البريد الإلكتروني"
                    value={profile?.email}
                  />
                  <ProfileItem
                    icon="mdi:account-outline"
                    label="الاسم الكامل"
                    value={profile?.full_name}
                  />
                </div>
              </section>

              {/* Account Info */}
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  معلومات الحساب
                </h2>
                <div className="space-y-5">
                  <ProfileItem
                    icon="mdi:calendar-outline"
                    label="عضو منذ"
                    value={
                      profile?.created_at
                        ? new Date(profile.created_at).toLocaleDateString("ar-EG")
                        : "غير متوفر"
                    }
                  />
                  <ProfileItem
                    icon="mdi:shield-check-outline"
                    label="حالة الحساب"
                    value={<span className="text-green-600 font-semibold">نشط</span>}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 flex-row-reverse">
    <div className="flex-shrink-0">
      <Icon icon={icon} color="fc4c56" className="w-6 h-6 text-primary mt-1" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-800 font-medium break-words">{value}</p>
    </div>
  </div>
);

export default AdminProfile;
