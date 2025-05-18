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

// 1. schema yup
const schema = yup.object().shape({
  phone: yup
    .string()
    .required("مطلوب إدخال رقم الهاتف")
    .min(9, "رقم الهاتف يجب أن لا يقل عن 9 أرقام")
    .max(16, "رقم الهاتف يجب أن لا يزيد عن 16 رقمًا"),
  password: yup
    .string()
    .min(5, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .max(30, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("مطلوب إدخال كلمة المرور"),
});

const PatientLogin = () => {
  const [authApi, { data, error: FiledError, isLoading }] =
    useAuthApiMutation();

  // const decodedName = decodeURIComponent(rawName);name20%last => name last name
  const navigate = useNavigate();
  const cookies = new Cookies();

  const { login } = useAuth();
  // 2. handel useForm مع yupResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 3.handel res
  useEffect(() => {
    if (data) {
      cookies.set("token", data?.Token);
      cookies.set("full_name", data?.Data?.full_name);
      cookies.set("role", "patient");
      successNotify("تم تسجيل الدخول بنجاح");
      // send user data to context
      // login({ ...data?.Data, role: "patient" });
      
      navigate("/patient/dashboard");
    }
    if (FiledError) {
      errorNotify("حدث خطا غير متوقع");
    }
  }, [data, File]);

  // 4. send date to server
  const onSubmit = async (formData) => {
    try {
      await authApi({
        url: "/Patient_login",
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-3 px-4 sm:px-6 lg:px-8">
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
              تسجيل دخول المريض
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
              {/* phone Field */}
              <div className="relative">
                <Icon
                  icon="mdi:phone-outline"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bgColor"
                  width="24"
                  height="24"
                />
                <input
                  id="phone"
                  {...register("phone")}
                  type="tel"
                  autoComplete="phone"
                  disabled={isLoading}
                  placeholder="البريد الإلكتروني"
                  className={`pl-10 pr-3 py-2 w-full border rounded-md placeholder-gray-500 focus:outline-none focus:ring-1  sm:text-sm focus:${
                    errors?.phone ? "ring-bgColor" : "ring-green-300"
                  }`}
                />
              </div>
              {errors?.phone && (
                <p className="text-red-600 text-sm mt-0">
                  {errors?.phone?.message}
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

export default PatientLogin;
