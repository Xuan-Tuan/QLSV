import React, { useState, useEffect } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function UserProfile(currentUser) {
  const [name, setName] = useState("");
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const role = localStorage.getItem("role");
  const info = localStorage.getItem("info");

  useEffect(() => {
    if (role === "admin") {
      setName("Admin");
    } else {
      setName(info);
    }
  }, [role, info]);

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className="flex items-center space-x-4 relative">
      <p className="text-lg font-semibold">{name}</p>
      <div className="h-[70px] relative flex items-center justify-between space-x-4">
        <RiAccountCircleFill size={56} />
        <FaAngleDown
          size={24}
          className="text-gray-500 cursor-pointer"
          onClick={() => setIsLogoutVisible(!isLogoutVisible)}
        />
        {isLogoutVisible && (
          <div className="absolute right-0 top-[65px] bg-white shadow-md rounded-lg p-2 min-h-10 min-w-[150px]">
            <Link to="/LogIn" onClick={handleLogout}>
              <button className="text-center py-2 px-2 text-uit hover:text-red-600 hover:font-medium transition duration-200">
                Đăng xuất
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
