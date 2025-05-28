import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/AfiaLogo.png";
import { Icon } from "@iconify/react";
const Footer = () => {
  return (
    <footer className="bg-bgColor text-minColor relative">
      <img
        src={logo}
        width={75}
        alt="logo"
        className="absolute z-30  -top-[30px] right-[30px]"
      />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* معلومات الشركة */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">عافية</h3>

            <p className="hover:text-textColor transition">
              منصتك الموثوقة للفحوصات الطبية والتبرع بالدم.
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-textColor transition">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  to="/patient/login"
                  className="hover:text-textColor transition"
                >
                  تسجيل كمريض
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="hover:text-textColor transition"
                >
                  تسجيل دخول المسؤول
                </Link>
              </li>
            </ul>
          </div>

          {/* الخدمات */}
          <div>
            <h3 className="text-lg font-semibold mb-4">الخدمات</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-textColor transition">
                  الفحوصات الطبية
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-textColor transition">
                  التبرع بالدم
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-textColor transition">
                  السجلات الصحية
                </Link>
              </li>
            </ul>
          </div>

          {/* التواصل */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-2">
              <li className="hover:text-gray-900 text-white">
                <a
                  href="https://medlife.hurufy.com/"
                  className="flex items-center justify-start gap-x-2"
                >
                  <span>
                    <Icon
                      icon="icon-park-outline:earth"
                      width="25"
                      height="25"
                    />
                  </span>
                  medlife.hurufy.com{" "}
                </a>{" "}
              </li>
              <li className="hover:text-gray-900 text-white">
                <a
                  href="mailto:medlife056@gmail.com"
                  className="flex items-center justify-start gap-x-2"
                >
                  <span>
                    {" "}
                    <Icon icon="iconamoon:email-thin" width="25" height="25" />
                  </span>
                  medlife056@gmail.com
                </a>{" "}
              </li>
              <li className="hover:text-gray-900 text-white">
                <a
                  href="tel:+963998942124"
                  className="flex items-center justify-start gap-x-2"
                >
                  <span>
                    {" "}
                    <Icon icon="iconamoon:phone-thin" width="25" height="25" />
                  </span>
                  0963998942124
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
