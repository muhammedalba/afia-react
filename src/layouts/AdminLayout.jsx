import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/shared/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-64 h-16 bg-white shadow-sm z-10">
        <div className="h-full flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              نظام إدارة المستشفى
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Add any header actions here */}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="mr-64 pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-64 h-16 bg-white shadow-sm z-10">
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-600">
            © 2024 نظام إدارة المستشفى. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
