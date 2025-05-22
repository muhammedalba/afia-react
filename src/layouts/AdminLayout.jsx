import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/shared/AdminSidebar";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";

const AdminLayout = () => {
  return (
    <div className="w-full">
      <Header />
      <main className="min-h-screen gap-2 flex bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 px-4 py-7 overflow-x-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};


export default AdminLayout;
