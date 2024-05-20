import React, { useState, useEffect } from "react";
import Logo from "../../assets/LOGO.png";
import { NavLink } from "react-router-dom";
import UserProfile from "../account/userProfile";
// import { useAuth } from "../../controller/authController";

export default function HeaderUser() {
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole !== role) {
      setRole(storedRole);
    }
  }, [role]);

  // const { currentUser } = useAuth();
  // console.log("Thông tin người dùng hiện tại ==> ", currentUser);

  return (
    <header className="bg-uit h-[70px] text-white flex items-center justify-between p-2">
      <div className="flex items-center">
        <div className="ml-2 mr-8 w-16">
          <NavLink to={`/${role}`}>
            <img src={Logo} alt="LOGO" />
          </NavLink>
        </div>
        <div className="flex flex-col text-while text-xs lg:text-base font-bold text-center uppercase mr-2">
          <div>Hệ thống quản lý</div>
          <div>sinh viên</div>
        </div>
      </div>
      <div className="flex items-center">
        <nav className="text-white flex flex-row items-center justify-between text-xs lg:text-base font-bold">
          <div className="mr-16">
            <NavLink
              to={`/${role}/listSubject`}
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-white"
              }
            >
              Trang chủ
            </NavLink>
          </div>
          <div className="mr-16">
            <NavLink
              to={`/${role}/notification`}
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-white"
              }
            >
              Thông báo
            </NavLink>
          </div>
          <div className="mr-6">
            <NavLink
              to={`/${role}/account`}
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-white"
              }
            >
              Tài khoản
            </NavLink>
          </div>
        </nav>
      </div>
      <div className="flex items-center justify-between mx-6">
        <div>
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="rounded-full pl-4 pr-8 py-1 text-black"
            aria-label="Tìm kiếm"
          />
        </div>
        <div className="ml-6 mr-12">
          <NavLink to={`/${role}/Account`}>
            <UserProfile />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
