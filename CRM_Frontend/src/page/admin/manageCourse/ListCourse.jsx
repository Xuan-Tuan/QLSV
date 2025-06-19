import PropTypes from "prop-types";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

export default function ListCourse({ courseList, onEdit, onDelete }) {
  return (
    <div className="w-full max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-uit scrollbar-track-gray-200 rounded-lg shadow-md p-4">
      <table className="min-w-full table-auto bg-white rounded-lg overflow-hidden">
        <thead className="bg-uitLight text-uit uppercase text-sm sticky top-0 z-10">
          <tr>
            <th className="py-3 px-4 text-left">STT</th>
            <th className="py-3 px-4 text-left">Mã môn học</th>
            <th className="py-3 px-4 text-left">Tên môn học</th>
            <th className="py-3 px-4 text-left">Giảng viên</th>
            <th className="py-3 px-4 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {courseList.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                Không có môn học nào.
              </td>
            </tr>
          ) : (
            courseList.map((course, index) => (
              <tr
                key={course.id}
                className="hover:bg-gray-100 transition-colors text-sm border-b"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{course.code}</td>
                <td className="py-2 px-4 font-medium text-uit flex items-center gap-2 hover:underline">
                  <Link to={`/admin/detailCourse/${course.code}`}>
                    {course.name}
                  </Link>
                  <HiOutlineArrowTopRightOnSquare
                    className="text-uit"
                    size={16}
                  />
                </td>
                <td className="py-2 px-4">{course.lecturerName}</td>
                <td className="py-2 px-4">
                  <div className="flex justify-center gap-3">
                    <AiFillEdit
                      title="Sửa môn học"
                      onClick={(e) => onEdit(e, course.courseId)}
                      className="bg-yellow-500 text-white p-2 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                      size={32}
                    />
                    <AiFillDelete
                      title="Xóa môn học"
                      onClick={() => onDelete(course.courseId)}
                      className="bg-red-500 text-white p-2 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                      size={32}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
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
