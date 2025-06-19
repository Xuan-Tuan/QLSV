import { useContext } from "react";
import LecturerContext from "../../component/lecturerContext";
import PropTypes from "prop-types";

export default function LecturerDetailAttendanceDatePage(props) {
  const { currentDay } = useContext(LecturerContext);
  return (
    <div className="container max-h-72 overflow-y-scroll scrollbar-thin scrollbar-thumb-uit scrollbar-track-gray-200">
      <table className="min-w-full table-auto bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Số thứ tự</th>
            <th className="py-2 px-4 border-b">Tên</th>
            <th className="py-2 px-4 border-b">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {currentDay && props?.attendanceList?.length > 0 ? (
            props?.attendanceList?.map((student, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
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
          )}
        </tbody>
      </table>
    </div>
  );
}

LecturerDetailAttendanceDatePage.propTypes = {
  attendanceList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      attended: PropTypes.string,
    })
  ),
};
