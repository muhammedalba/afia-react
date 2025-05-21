import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { adminRoutes, patientRoutes, publicRoutes } from "./routes/routes";
import AdminLayout from "./layouts/AdminLayout";

// Import all page components
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminExaminations from "./pages/admin/AdminExaminations";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminStatistics from "./pages/admin/AdminStatistics";
import PatientLogin from "./pages/patient/PatientLogin";
import PatientRegister from "./pages/patient/PatientRegister";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientExaminations from "./pages/patient/PatientExaminations";
import PatientProfile from "./pages/patient/PatientProfile";
import Home from "./pages/Home";
import Login from "./pages/public/Login";
import About from "./pages/public/About";
import NotFound from "./pages/public/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";

// Component mapping
const componentMap = {
  AdminLogin,
  AdminDashboard,
  AdminPatients,
  AdminDoctors,
  AdminExaminations,
  AdminDonations,
  AdminStatistics,
  PatientLogin,
  PatientRegister,
  PatientDashboard,
  PatientExaminations,
  PatientProfile,
  Home,
  Login,
  NotFound,
  About,
};

const AppRouter = () => {
  const { user } = useAuth();

  const renderAdminRoute = (route) => {
    const Component = componentMap[route.element];
    if (!Component) {
      console.error(`Component ${route.element} not found`);
      return null;
    }

    // For admin login, render without layout
    if (route.path === "/admin/login") {
      return (
        <Route key={route.path} path={route.path} element={<Component />} />
      );
    }

    return null; // Other admin routes will be handled by the admin layout route
  };

  const renderPublicRoute = (route) => {
    const Component = componentMap[route.element];
    if (!Component) {
      console.error(`Component ${route.element} not found`);
      return null;
    }

    return <Route key={route.path} path={route.path} element={<Component />} />;
  };

  const renderPatientRoute = (route) => {
    const Component = componentMap[route.element];
    if (!Component) {
      console.error(`Component ${route.element} not found`);
      return null;
    }

    return <Route key={route.path} path={route.path} element={<Component />} />;
  };

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* Public routes with header and footer */}
        <Route
          element={
            <>
              <Header />
              <main>
                <Outlet />
              </main>
              <Footer />
            </>
          }
        >
          {publicRoutes.map(renderPublicRoute)}
        </Route>

        {/* Admin routes */}
        <Route path="/admin">
          {/* Admin login route */}
          <Route path="login" element={<AdminLogin />} />

          {/* Admin layout routes */}
          <Route
            element={
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="examinations" element={<AdminExaminations />} />
            <Route path="donations" element={<AdminDonations />} />
            <Route path="statistics" element={<AdminStatistics />} />
            {/* Redirect /admin to /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

        {/* Patient routes */}
        {patientRoutes.map(renderPatientRoute)}

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
