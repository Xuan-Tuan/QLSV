import { memo } from "react";

export default memo(function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-900 text-white py-3 px-6 text-xs lg:text-sm shadow-md">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-2 lg:mb-0">
          <div className="uppercase font-semibold tracking-wider">
            Hệ thống quản lý sinh viên
          </div>
          <div className="text-[11px] text-gray-300 mt-1">
            © {new Date().getFullYear()} FiveTerabyte. All rights reserved.
          </div>
        </div>

        <div className="text-center lg:text-right">
          <div className="font-medium">Thông tin liên hệ</div>
          <div className="flex flex-col text-gray-200 text-[13px] mt-1 leading-snug">
            <span>📞 Phone: 1900 1009 9100</span>
            <span>📧 Email: fiveterabyte@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
});
