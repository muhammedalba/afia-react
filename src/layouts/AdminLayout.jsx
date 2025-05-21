import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/shared/AdminSidebar";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Sidebar */}

      <AdminSidebar />
      {/* Main Content */}
      <main className="mr-64 pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
