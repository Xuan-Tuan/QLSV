import React from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
export default function Notification() {
  return (
    <div className="h-[calc(100vh-70px-50px)]">
      <div className=" text-base h-12 mt-8 font-bold text-left align-middle pl-10 text-blue-700 text">
        Thông báo sinh viên
      </div>
      <div className="h-[calc(100vh-60px-50px-64px-64px)] ml-20 mr-60  bg-gray-100 shadow-md flex flex-col gap-5 p-5 overflow-y-scroll will-change-scroll">
        <div className="flex flex-row justify-between text-center px-8 py-4 my-5 border-uit border-2">
          <div className="flex flex-col text-start text-uit text-lg font-bold">
            <p>Môn học: </p>
            <p>Nội dung: </p>
          </div>
          <div>
            <IoArrowForwardCircleOutline size={40} />
          </div>
        </div>
        <div
          className="flex flex-row justify-between text-center px-8 py-4 my-5
        border-uit border-2"
        >
          <div className="flex flex-col text-start text-uit text-lg font-bold">
            <p>Môn học: </p>
            <p>Nội dung: </p>
          </div>
          <div>
            <IoArrowForwardCircleOutline size={40} />
          </div>
        </div>
        <div className="flex flex-row justify-between text-center px-8 py-4 my-5 border-uit border-2">
          <div className="flex flex-col text-start text-uit text-lg font-bold">
            <p>Môn học: </p>
            <p>Nội dung: </p>
          </div>
          <div>
            <IoArrowForwardCircleOutline size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
