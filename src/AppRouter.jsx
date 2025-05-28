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
import AdminProfile from "./pages/admin/AdminProfile";
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
  AdminProfile,
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

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to home if not authorized
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRouter = () => {

  // admin 
  const renderAdminRoute = (route) => {
    const Component = componentMap[route.element];
    if (!Component) {
      console.error(`Component ${route.element} not found`);
      return null;
    }

    // For admin login, render without protection
    if (route.path === "/admin/login") {
      return (
        <Route key={route.path} path={route.path} element={<Component />} />
      );
    }

    // For other admin routes, add protection
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <ProtectedRoute requiredRole="admin">
            <Component />
          </ProtectedRoute>
        }
      />
    );
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

    // For patient login and register, render without protection
    if (route.path === "/patient/login" || route.path === "/patient/register") {
      return (
        <Route key={route.path} path={route.path} element={<Component />} />
      );
    }

    // For other patient routes, add protection
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <ProtectedRoute requiredRole="patient">
            <Component />
          </ProtectedRoute>
        }
      />
    );
  };

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {" "}
      <Header />
      <Routes>
        {/* Public routes with header and footer */}
        <Route
          element={
            <main>
              <Outlet />
            </main>
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
              <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <Outlet />
              </AdminLayout>
             </ProtectedRoute>
            }
          >
            {adminRoutes.map(renderAdminRoute)}
            {/* Redirect /admin to /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

        {/* Patient routes */}
        {patientRoutes.map(renderPatientRoute)}

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
