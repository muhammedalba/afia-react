import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/patients", label: "Patients" },
    { to: "/admin/doctors", label: "Doctors" },
    { to: "/admin/examinations", label: "Examinations" },
    { to: "/admin/donations", label: "Donations" },
    { to: "/admin/statistics", label: "Statistics" },
  ];

  const patientLinks = [
    { to: "/patient/dashboard", label: "Dashboard" },
    { to: "/patient/examinations", label: "My Examinations" },
    { to: "/patient/profile", label: "Profile" },
  ];

  const renderNavLinks = () => {
    if (!user) return null;

    const links = user.role === "admin" ? adminLinks : patientLinks;

    return (
      <div className="hidden md:flex items-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            {link.label}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                Afia
              </Link>
            </div>
            {renderNavLinks()}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">
                  Welcome, {user.full_name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admin Login
                </Link>
                <Link
                  to="/patient/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Patient Login
                </Link>
                <Link
                  to="/patient/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {user &&
            (user.role === "admin" ? adminLinks : patientLinks).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
