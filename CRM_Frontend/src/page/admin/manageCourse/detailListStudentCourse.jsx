import PropTypes from "prop-types";
import { useEffect, useState, memo } from "react";

const DetailListStudentCourse = memo(function DetailListStudentCourse({
  studentList,
  courseCode,
}) {
  const [studentInfo, setStudentInfo] = useState([]);

  useEffect(() => {
    setStudentInfo(studentList);
  }, [courseCode]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-lg font-bold text-uit mb-6 text-center uppercase">
        Danh sách sinh viên của môn học
      </div>

      {studentInfo?.length > 0 ? (
        <div className="overflow-y-auto max-h-96 shadow-md rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full text-center text-sm">
            <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
              <tr>
                <th className="px-4 py-3 border-b">STT</th>
                <th className="px-4 py-3 border-b">Tên sinh viên</th>
                <th className="px-4 py-3 border-b">Điểm danh</th>
              </tr>
            </thead>
            <tbody>
              {studentInfo.map((student, index) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-2 border-t font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-t text-gray-800">
                    {student.name}
                  </td>
                  <td className="px-4 py-2 border-t text-gray-800 font-semibold">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      {student.attended}/{student.total}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500 text-lg mt-8">
          Không có sinh viên nào được đăng ký trong môn học này.
        </p>
      )}
    </div>
  );
});

DetailListStudentCourse.propTypes = {
  studentList: PropTypes.array.isRequired,
  courseCode: PropTypes.string.isRequired,
};

export default DetailListStudentCourse;
