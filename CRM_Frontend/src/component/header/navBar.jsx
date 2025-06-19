import { useState, useCallback, useMemo, memo } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/LOGO.png";
import FCE from "../../assets/FCE.png";
import { RiParentLine } from "react-icons/ri";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineSubject } from "react-icons/md";
import { MdOutlineDevices } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

export default memo(function Navbar() {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = useCallback((item) => {
    setActiveItem(item);
  }, []);

  const listNavbarItem = useMemo(
    () => [
      {
        id: 1,
        title: "Giảng viên",
        link: "/admin/manageLecturer",
        icon: <GiTeacher size={30} />,
      },
      {
        id: 2,
        title: "Sinh viên",
        link: "/admin/manageStudent",
        icon: <PiStudent size={30} />,
      },
      {
        id: 3,
        title: "Phụ huynh",
        link: "/admin/manageParent",
        icon: <RiParentLine size={30} />,
      },
      {
        id: 4,
        title: "Môn học",
        link: "/admin/manageCourse",
        icon: <MdOutlineSubject size={30} />,
      },
      {
        id: 5,
        title: "Thiết bị",
        link: "/admin/manageDevice",
        icon: <MdOutlineDevices size={30} />,
      },
      {
        id: 6,
        title: "Phòng học",
        link: "/admin/manageRoom",
        icon: <SiGoogleclassroom size={30} />,
      },
    ],
    []
  );

  return (
    <div className="fixed top-0 left-0 h-full font-poppins text-white bg-uit border-r w-16 md:w-52 flex flex-col justify-between transition-all duration-300 shadow-lg z-40">
      {/* Logo trên cùng */}
      <div className="flex justify-center items-center py-4">
        <NavLink to="/admin">
          <img
            src={Logo}
            alt="LOGO"
            className="w-10 md:w-16 h-auto object-contain"
          />
        </NavLink>
      </div>

      {/* Danh sách menu */}
      <div className="flex-grow flex flex-col items-center md:items-stretch space-y-2 px-2">
        {listNavbarItem.map((item) => (
          <NavLink
            to={item.link}
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`flex items-center space-x-4 w-full px-3 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeItem === item.id
                ? "bg-white text-red-500 border-l-4 border-uit"
                : "hover:bg-white hover:text-red-500"
            }`}
          >
            <div>{item.icon}</div>
            <span className="hidden md:inline">{item.title}</span>
          </NavLink>
        ))}
      </div>

      {/* Logo FCE dưới cùng */}
      <div className="flex justify-center items-center py-4">
        <NavLink to="/admin">
          <img src={FCE} alt="FCE" className="w-16 h-10  object-contain" />
        </NavLink>
      </div>
    </div>
  );
});
