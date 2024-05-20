import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/LOGO.png";
import UserProfile from "../account/UserProfile";
import PropTypes from "prop-types";

HeaderAdmin.PropTypes = {
  currentUser: PropTypes.object,
};

export default HeaderAdmin  (currentUser) {
  const navLinkClass = ({ isActive }) =>
    isActive ? "text-red-500" : "text-white";

  return (
    <header className="bg-uit h-[70px] text-white flex items-center justify-between p-2 fixed top-0 left-0 right-0">
      <div className="flex items-center">
        <div className="ml-2 mr-8 w-16">
          <NavLink to="/Admin">
            <img src={Logo} alt="LOGO" />
          </NavLink>
        </div>
        <div className="flex flex-col text-white text-xs lg:text-base font-bold text-center uppercase mr-2">
          <div>Hệ thống quản lý</div>
          <div>sinh viên</div>
        </div>
      </div>
      <nav className="text-white flex flex-row items-center text-xs lg:text-base font-bold space-x-12">
        <NavLink to="/Admin/ManageLectures" className={navLinkClass}>
          Giáo viên
        </NavLink>
        <NavLink to="/Admin/ManageStudent" className={navLinkClass}>
          Sinh viên
        </NavLink>
        <NavLink to="/Admin/ManageParent" className={navLinkClass}>
          Phụ huynh
        </NavLink>
        <NavLink to="/Admin/ManageSubjects" className={navLinkClass}>
          Môn học
        </NavLink>
        <NavLink to="/Admin/Notification" className={navLinkClass}>
          Thông báo
        </NavLink>
      </nav>
      <div className="ml-6 mr-12">
        <NavLink to="/Admin/Account">
          <UserProfile />
        </NavLink>
      </div>
    </header>
  );
};

