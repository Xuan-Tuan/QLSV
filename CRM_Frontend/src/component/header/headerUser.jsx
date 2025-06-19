import Logo from "../../assets/LOGO.png";
import { memo, useCallback } from "react";
import { NavLink } from "react-router-dom";
import UserProfile from "../account/userProfile";
import { useAuth } from "../../controller/authController";
import { MdOutlineManageAccounts } from "react-icons/md";
import { LiaHomeSolid } from "react-icons/lia";

export default memo(function HeaderUser() {
  const { role } = useAuth();

  const navLinkClass = useCallback(
    ({ isActive }) =>
      `transition-all duration-200 px-3 py-2 rounded-md font-medium
     ${
       isActive
         ? "bg-white text-red-500 shadow-md font-bold text-md"
         : "text-white hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:bg-indigo-500 hover:shadow-inner"
     }`,
    []
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-900 shadow-md text-white flex items-center justify-between h-20 px-4 z-50">
      {/* Logo & Title */}
      <div className="flex items-center space-x-4">
        <NavLink to={`/${role}`}>
          <img src={Logo} alt="LOGO" className="h-12 w-auto" />
        </NavLink>
        <div className="hidden sm:block">
          <h1 className="text-sm lg:text-lg font-bold uppercase leading-tight">
            Hệ thống
            <br />
            quản lý sinh viên
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-6 text-sm lg:text-base font-medium">
        <NavLink to={`/${role}/course`} className={navLinkClass}>
          <span className="hidden sm:inline">Môn học</span>
          <LiaHomeSolid className="inline sm:hidden" size={26} />
        </NavLink>
        <NavLink to={`/${role}/account`} className={navLinkClass}>
          <span className="hidden sm:inline">Tài khoản</span>
          <MdOutlineManageAccounts className="inline sm:hidden" size={26} />
        </NavLink>
      </nav>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        <div className="hidden sm:block">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm..."
            className="rounded-full px-4 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner"
          />
        </div>
        <NavLink to={`/${role}`} className="hidden sm:block">
          <UserProfile />
        </NavLink>
      </div>
    </header>
  );
});
