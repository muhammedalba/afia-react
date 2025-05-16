import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { allRoutes } from "./routes/routes";
import Header from "./components/Header";

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
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import NotFound from "./pages/public/NotFound";

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
};

const AppRouter = () => {
  const { user } = useAuth();

  const renderRoute = (route) => {
    const Component = componentMap[route.element];

    if (!Component) {
      console.error(`Component ${route.element} not found`);
      return null;
    }

    return <Route key={route.path} path={route.path} element={<Component />} />;
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="py-4">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate
                    to={
                      user.role === "admin"
                        ? "/admin/dashboard"
                        : "/patient/dashboard"
                    }
                  />
                ) : (
                  <Home />
                )
              }
            />

            {allRoutes.map(renderRoute)}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
