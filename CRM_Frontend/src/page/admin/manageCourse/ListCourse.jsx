import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ListCourse({ courseList, onEdit, onDelete }) {
  return (
    <div className="w-full max-h-96 overflow-y-auto">
      <table className="min-w-full bg-white border border-gray-200 text-center shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b font-bold">STT</th>
            <th className="py-2 px-4 border-b font-bold">Mã môn học</th>
            <th className="py-2 px-4 border-b font-bold">Tên môn</th>
            <th className="py-2 px-4 border-b font-bold">Tên giảng viên</th>
            <th className="py-2 px-4 border-b font-bold">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {courseList.map((course, index) => (
            <tr key={course.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{course.code}</td>
              <td className="py-2 px-4 border-b hover:font-bold hover:text-red-500 hover:shadow-md cursor-pointer ">
                <Link to={`/admin/detailCourse/${course.code}`}>
                  {course.name}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">{course.lecturerName}</td>
              <td className="flex justify-around items-center border px-4 py-2">
                <AiFillEdit
                  className="bg-yellow-500 text-white px-2 py-1 rounded  cursor-pointer transform transition-transform duration-300 hover:scale-110"
                  size={40}
                  onClick={(e) => onEdit(e, course.courseId)}
                >
                  Sửa
                </AiFillEdit>
                <AiFillDelete
                  className="bg-red-500 text-white px-2 py-1 rounded  cursor-pointer transform transition-transform duration-300 hover:scale-110"
                  size={40}
                  onClick={() => onDelete(course.courseId)}
                >
                  Xóa
                </AiFillDelete>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ListCourse.propTypes = {
  courseList: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
