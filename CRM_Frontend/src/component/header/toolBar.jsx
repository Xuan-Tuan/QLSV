import { memo } from "react";
import { NavLink } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { CgMenu } from "react-icons/cg";
import PropTypes from "prop-types";

const ToolBar = memo(function ToolBar({ toggleNavbar, isNavbarVisible }) {
  return (
    <header
      className={`bg-uitLight text-uit shadow-md flex items-center justify-between fixed top-0 z-50 h-20 px-4 transition-all duration-300 ${
        isNavbarVisible ? "left-16 md:left-52 right-0" : "left-0 right-0"
      } border-l-2 border-white`}
    >
      {/* Nút Toggle */}
      <div className="cursor-pointer" onClick={toggleNavbar}>
        <CgMenu size={30} />
      </div>

      {/* Thanh Tìm kiếm */}
      <div className="flex-grow mx-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Tên hệ thống */}
      <div className="hidden lg:block text-right mr-6 leading-tight font-bold text-base uppercase">
        <div>Hệ thống quản lý</div>
        <div>Sinh viên</div>
      </div>

      {/* ADMIN avatar hoặc icon */}
      <NavLink to="/admin">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-base hidden md:block">ADMIN</span>
          <RiAdminLine size={36} />
        </div>
      </NavLink>
    </header>
  );
});

ToolBar.propTypes = {
  toggleNavbar: PropTypes.func.isRequired,
  isNavbarVisible: PropTypes.bool.isRequired,
};

export default ToolBar;
