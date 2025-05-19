import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Icon } from "@iconify/react";
import logo from "../../assets/a1-removebg-preview.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthApiMutation } from "../../redux/features/api/users/AuthSlice";
import Preloader from "../../components/Preloader/Preloader";
import { useAuth } from "../../contexts/AuthContext";
import { errorNotify, successNotify } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import { pageTitle } from "../../helper";

// 1.  schema validation
const schema = yup.object().shape({
  email: yup
    .string()
    .email("البريد الإلكتروني غير صالح")
    .required("مطلوب إدخال البريد الإلكتروني"),
  password: yup
    .string()
    .min(5, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .max(30, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("مطلوب إدخال كلمة المرور"),
});
//
const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [authApi, { data, error: FiledError, isLoading }] =
    useAuthApiMutation();

  // 2.  useForm  yupResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    pageTitle(" تسجيل دخول المسؤول");
  }, []);
  useEffect(() => {
    if (data) {
      cookies.set("token", data.token);
      cookies.set("full_name", data.admin.full_name);
      cookies.set("role", "admin");
      successNotify("تم تسجيل الدخول بنجاح");
      console.log("data", data?.admin);
      login({ ...data?.admin, role: "admin" });
      navigate("/admin/dashboard");
    }
    if (FiledError) {
      errorNotify("حدث خطا غير متوقع");
    }
  }, [data, FiledError]);

  // 4. send data to server
  const onSubmit = async (formData) => {
    try {
      await authApi({
        url: "/login",
        body: formData,
        method: "POST",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Preloader />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <img
            src={logo}
            alt="logo"
            width="200"
            height="auto"
            loading="lazy"
            className="m-auto"
          />
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              تسجيل دخول المسؤول
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {FiledError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  {FiledError?.data?.message}
                </span>
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
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  placeholder="البريد الإلكتروني"
                  className={`pl-10 pr-3 py-2 w-full border rounded-md placeholder-gray-500 focus:outline-none focus:ring-1  sm:text-sm focus:${
                    errors?.email ? "ring-bgColor" : "ring-green-300"
                  }`}
                />
              </div>
              {errors?.email && (
                <p className="text-red-600 text-sm mt-0">
                  {errors?.email?.message}
                </p>
              )}
              {/* Password Field */}
              <div className="relative ">
                <Icon
                  icon="mdi:lock-outline"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bgColor"
                  width="24"
                  height="24"
                />
                <input
                  id="password"
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  placeholder="كلمة المرور"
                  className={`pl-10 pr-3 py-2 w-full border rounded-md placeholder-gray-500 focus:outline-none focus:ring-1  sm:text-sm focus:${
                    errors?.password ? "ring-bgColor" : "ring-green-300"
                  }`}
                />
              </div>{" "}
              {errors?.password && (
                <p className="text-red-600 text-sm mt-0">
                  {errors?.password?.message}
                </p>
              )}
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
    </>
  );
};

export default AdminLogin;
