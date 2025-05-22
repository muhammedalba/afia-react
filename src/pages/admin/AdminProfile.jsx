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
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          {/* رأس الصفحة */}
          <div className="bg-gradient-to-l from-primary to-secondary text-white px-10 py-8 relative">
            <div className="flex items-center gap-6 flex-row-reverse">
              <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white/20 flex items-center justify-center">
                <Icon
                  icon="mdi:account-circle"
                  className="w-24 h-24 text-white"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{profile?.full_name}</h1>
                <p className="text-white/80 text-lg mt-1">مدير النظام</p>
              </div>
            </div>
          </div>

          {/* محتوى الملف */}
          <div className="px-10 py-8">
            <div className="grid md:grid-cols-2 gap-10">
              {/* القسم الشخصي */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
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

              {/* القسم الإداري */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                  معلومات الحساب
                </h2>
                <div className="space-y-5">
                  <ProfileItem
                    icon="mdi:calendar-outline"
                    label="عضو منذ"
                    value={
                      profile?.created_at
                        ? new Date(profile.created_at).toLocaleDateString(
                            "ar-EG"
                          )
                        : "غير متوفر"
                    }
                  />
                  <ProfileItem
                    icon="mdi:shield-check-outline"
                    label="حالة الحساب"
                    value={
                      <span className="text-green-600 font-semibold">نشط</span>
                    }
                  />
                </div>
              </section>
            </div>

            {/* الإجراءات السريعة */}
            {/* <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                إجراءات سريعة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <ActionButton
                  icon="mdi:pencil-outline"
                  label="تعديل الملف"
                  color="blue"
                />
                <ActionButton
                  icon="mdi:shield-lock-outline"
                  label="تغيير كلمة المرور"
                  color="green"
                />
                <ActionButton
                  icon="mdi:bell-outline"
                  label="إعدادات الإشعارات"
                  color="purple"
                />
              </div>
            </div> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProfileItem = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-3 flex-row-reverse">
    <Icon icon={icon} className="w-6 h-6 text-primary mt-1" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  </div>
);

const ActionButton = ({
  icon,
  label,
  color,
}) => {
  const bg = `bg-${color}-50`;
  const text = `text-${color}-600`;
  const hover = `hover:bg-${color}-100`;

  return (
    <button
      className={`flex items-center justify-center gap-2 ${bg} ${text} px-4 py-3 rounded-xl transition-colors ${hover} text-sm font-medium`}
    >
      <Icon icon={icon} className="w-5 h-5" />
      {label}
    </button>
  );
};

export default AdminProfile;
