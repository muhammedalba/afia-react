import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const AdminSidebar = () => {
  const location = useLocation();

  // 1. استرجاع الحالة من localStorage (true / false)
  const [isOpen, setOpen] = useState(() => {
    const storedState = localStorage.getItem("adminSidebarOpen");
    return storedState ? JSON.parse(storedState) : false;
  });


  useEffect(() => {
    localStorage.setItem("adminSidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const toggleSidebar = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const navItems = useMemo(
    () => [
      {
        title: "الملف الشخصي",
        path: "/admin/profile",
        icon: "mdi:account-circle-outline",
      },
      {
        title: "لوحة التحكم",
        path: "/admin/dashboard",
        icon: "mingcute:dashboard-line",
      },
      {
        title: "الأطباء",
        path: "/admin/doctors",
        icon: "openmoji:male-doctor",
      },
      { title: "المرضى", path: "/admin/patients", icon: "mdi:patient" },
      {
        title: "الفحوصات",
        path: "/admin/examinations",
        icon: "healthicons:i-exam-multiple-choice",
      },
      {
        title: "التبرعات",
        path: "/admin/donations",
        icon: "mdi:donation-outline",
      },
    ],
    []
  );

  return (
    <div
      className={`
        bg-white shadow-lg z-20 
        transition-all duration-300 text-nowrap w-auto
      `}
    >
      <div className="p-3 space-y-4 sticky top-20 right-0">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className=" flex text-bgColor hover:text-pink-600 transition-colors relative w-full  justify-end"
        >
          <Icon icon="gravity-ui:bars-unaligned" width="28" height="28" />
        </button>

        {/* Navigation */}
        <ul className="space-y-2 mt-6">
          {navItems.map((item) => (
            <li key={item.path} className="relative group">
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-all duration-200
        ${
          location.pathname === item.path
            ? "bg-bgColor text-white"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
              >
                <Icon
                  icon={item.icon}
                  width="24"
                  height="24"
                  color={location.pathname === item.path ? "white" : "fc4c56"}
                />

                {isOpen && <span className="mr-3">{item.title}</span>}
              </Link>

              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
