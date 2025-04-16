import {
  useState,
  useEffect,
  useContext,
  memo,
  useCallback,
  useMemo,
} from "react";
import { LecturerContext } from "./lecturerDetailCoursePage";
// import { convertDateFormat } from "../../controller/formattedDate";
// import { API_SERVICE } from "../../helpers/apiHelper";

export default function LecturerDetailAttendanceDatePage(props) {
  const { courseCode, currentDay, startDay } = useContext(LecturerContext);
  console.log("dasdas", props, currentDay, startDay);

  return (
    <div className="container mx-auto mt-8 overflow-scroll">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Số thứ tự</th>
              <th className="py-2 px-4 border-b">Tên</th>
              <th className="py-2 px-4 border-b">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {
              // new Date( convertDateFormat( currentDay ) ) >=
              // 	new Date( convertDateFormat( startDay ) ) &&
              currentDay && props?.attendanceList?.length > 0 ? (
                props?.attendanceList?.map((student, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b">{student.name}</td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={
                          student.attended === "Present"
                            ? "text-green-500"
                            : student.attended === "Absent"
                            ? "text-red-500"
                            : "text-blue-500"
                        }
                      >
                        {student.attended === "Present"
                          ? "Đã điểm danh"
                          : student.attended === "Absent"
                          ? "Vắng mặt"
                          : "Theo dõi"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 text-center">
                    Không có sinh viên nào
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
