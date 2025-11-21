
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "../assets/AfiaLogo.png";
import { Icon } from "@iconify/react";


const Header = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const adminLinks = [{ to: "/admin/dashboard", label: "لوحة التحكم" }];

  const patientLinks = [{ to: "/patient/dashboard", label: "لوحة التحكم" }];

  const renderNavLinks = () => {
    if (!user?.role) return null;

    const links = user?.role === "admin" ? adminLinks : patientLinks;

    return (
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-textColor hover:text-primary px-3 py-2 rounded-md "
          >
            {link.label}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <>
      <nav className="sticky  w-full top-0 z-50  ">
        {/* top bar */}
        <div className=" bg-gray-100  ">
          <div className="p-2 ">
            <div className=" w-full flex  items-center justify-between">
              <div className="">
                <ul className="w-full flex  items-center justify-between">
                  <li className="px-2 flex  items-center justify-between">
                    <a target="_blank" href="https://medlife.hurufy.com/">
                      <Icon
                        icon="icon-park-outline:earth"
                        width="24"
                        height="24"
                        color="fc4c55"
                      />
                    </a>
                  </li>
                  <li className="px-2 flex  items-center justify-between">
                    <Link to="/About">من نحن </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="  w-full flex   items-center justify-between">
                  <li className="px-2   ">
                    <a
                      href="tel:+963998942124"
                      className="items-center flex justify-between "
                    >
                      <span className=" hidden md:block">963998942124+</span>
                      <Icon
                        icon={"carbon:phone-filled"}
                        width={"20"}
                        color="fc4c55"
                      />
                    </a>
                  </li>
                  <li className="px-2">
                    <a
                      href="mailto:mailto:medlife741@gmail.com"
                      className="text-decoration-none flex  items-center justify-between"
                    >
                      <span className=" hidden md:block">
                        mailto:medlife741@gmail.com
                      </span>
                      <Icon
                        className="mx-1"
                        icon={"line-md:email"}
                        width={"20"}
                        color="fc4c55"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* nav bar */}
        <div className="bg-minColor text-textColor border  mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" ">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {user?.role ? (
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Icon
                          color="fc4c55"
                          icon="si:user-fill"
                          width="24"
                          height="24"
                        />
                        {/* <Icon
                        icon="icon-park-outline:earth"
                        width="24"
                        height="24"
                      /> */}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <div className="p-1 flex items-center gap-2 ">
                            {renderNavLinks()}
                            <Icon
                              color="fc4c55"
                              icon={
                                "material-symbols-light:settings-heart-outline-rounded"
                              }
                              width={"30"}
                              height={"30"}
                            />
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button
                            onClick={handleLogout}
                            className="p-1 flex items-center gap-2 w-full justify-between"
                          >
                            تسجيل خروج
                            <Icon
                              color="fc4c55"
                              icon="solar:logout-broken"
                              width={"30"}
                            />
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <span className="text-textColor hidden sm:block">
                      مرحباً، <span>{user?.full_name || user?.email}</span>
                    </span>
                    <Link to="/" className="flex items-center">
                      <Icon
                        color="fc4c55"
                        icon="line-md:home-twotone"
                        width="24"
                        height="24"
                        path="/"
                      />
                    </Link>
                    <Link to="/admin/dashboard" className="flex items-center">
                      <Icon
                        color="fc4c55"
                        icon="mingcute:dashboard-line"
                        width="24"
                        height="24"
                      />
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Icon
                          color="fc4c55"
                          icon="si:user-fill"
                          width="24"
                          height="24"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/* <DropdownMenuLabel> تسجيل </DropdownMenuLabel> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link
                            to="/patient/login"
                            className="text-textColor hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                          >
                            تسجيل دخول المريض
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                            to="/admin/login"
                            className="text-textColor hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                          >
                            تسجيل دخول المسؤول
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Link to="/" className="flex items-center">
                      <Icon
                        color="fc4c55"
                        icon="line-md:home-twotone"
                        width="24"
                        height="24"
                        path="/"
                      />
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to="/" className="flex items-center">
                    <img
                      src={logo}
                      alt="Afia Logo"
                      className="h-[3.8rem]  w-auto mr-2"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
