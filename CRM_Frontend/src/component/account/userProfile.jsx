import { useState, useEffect, useCallback, memo, useRef } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../controller/authController";
import { useAuth } from "../../controller/authController";

export default memo(function UserProfile() {
  const { currentUser } = useAuth();
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.fullName);
    }
  }, [currentUser]);

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLogoutVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await doSignOut();
        navigator("/login");
      } catch (error) {
        console.error(error);
      }
    },
    [navigator]
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsLogoutVisible(!isLogoutVisible)}
      >
        <div className="hidden sm:block text-sm font-semibold truncate max-w-[120px]">
          {name}
        </div>
        <div className="rounded-full bg-gray-200 p-1">
          <RiAccountCircleFill size={36} className="text-gray-700" />
        </div>
        <FaAngleDown size={18} className="text-white" />
      </div>

      {isLogoutVisible && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-50 animate-fade-in">
          <button
            onClick={handleLogOut}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
});
