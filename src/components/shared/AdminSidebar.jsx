import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      title: "لوحة التحكم",
      path: "/admin/dashboard",
      icon: "material-symbols:dashboard-outline",
    },
    {
      title: "الأطباء",
      path: "/admin/doctors",
      icon: "openmoji:male-doctor",
    },
    {
      title: "المرضى",
      path: "/admin/patients",
      icon: "mdi:patient",
    },
    {
      title: "الفحوصات",
      path: "/admin/examinations",
      icon: "flat-color-icons:inspection",
    },
    {
      title: "التبرعات",
      path: "/admin/donations",
      icon: "mdi:donation-outline",
    },
    {
      title: "الإحصائيات",
      path: "/admin/statistics",
      icon: "material-symbols:bar-chart",
    },
  ];

  return (
    <div className="fixed right-0 top-0 h-screen w-64 bg-white shadow-lg z-20">
      <div className="p-4 pt-20">
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center justify-end p-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-bgColor text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.title}</span>
                  <Icon icon={item.icon} width="24" height="24" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
