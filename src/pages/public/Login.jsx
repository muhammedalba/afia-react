import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from"../../assets/AfiaLogo.png"
import { pageTitle } from "../../helper";
const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    pageTitle('تسجيل الدخول')
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <img src={logo} alt="logo" loading="lazy" width={150} className="m-auto black " />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          مرحبًا بك في عافية
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          الرجاء اختيار طريقة تسجيل الدخول
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <Link
                to="/admin/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bgColor hover:bg-[#c1545a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bgColor"
              >
                تسجيل الدخول مسؤول
              </Link>
            </div>

            <div>
              <Link
                to="/patient/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bgColor hover:bg-[#c1545a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bgColor"
              >
                تسجيل الدخول كمريض
              </Link>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                لا تملك حسابًا؟{" "}
                <Link
                  to="/patient/register"
                  className="font-medium text-indigo-600 hover:text-bgColor"
                >
                 انشاء حساب جديد
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
