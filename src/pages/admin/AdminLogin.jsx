import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAutapiMutation } from "../../redux/features/api/users/AuthSlice";
import Cookies from "universal-cookie";
import { Icon } from "@iconify/react";

const AdminLogin = () => {
  const [Autapi, { data: user, error: FiledError, isLoading, isSuccess }] =
    useAutapiMutation();

  const navigate = useNavigate();
  const cookies = new Cookies();

  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Autapi({
        url: "/login",
        body: formData,
        method: "POST",
      });
      login(user.data);
      cookies.set("token", user?.token);
      cookies.set("role", "admin");
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            تسجيل دخول المسؤول
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <Icon
                icon="mdi:email-outline"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bgColor"
                width="24"
                height="24"
              />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bgColor focus:border-bgColor sm:text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Icon
                icon="mdi:lock-outline"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bgColor"
                width="24"
                height="24"
              />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="كلمة المرور"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bgColor focus:border-bgColor sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-bgColor hover:bg-[#c1545a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bgColor"
            >
              {isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
