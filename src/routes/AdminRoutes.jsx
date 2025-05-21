import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDoctors from "../pages/admin/AdminDoctors";
import AdminPatients from "../pages/admin/AdminPatients";
import AdminExaminations from "../pages/admin/AdminExaminations";
import AdminDonations from "../pages/admin/AdminDonations";
import AdminStatistics from "../pages/admin/AdminStatistics";
import AdminLogin from "../pages/admin/AdminLogin";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="patients" element={<AdminPatients />} />
        <Route path="examinations" element={<AdminExaminations />} />
        <Route path="donations" element={<AdminDonations />} />
        <Route path="statistics" element={<AdminStatistics />} />
        {/* Redirect /admin to /admin/dashboard */}
        <Route path="/" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
