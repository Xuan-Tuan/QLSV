import { AiOutlineUserDelete } from "react-icons/ai";
import { TbUserEdit } from "react-icons/tb";
import PropTypes from "prop-types";

export default function LecturerList({ lecturers, onEdit, onDelete }) {
  if (lecturers.length === 0) {
    return <p>Không tìm thấy giáo viên nào</p>;
  }

  return (
    <div className="w-full max-h-96 overflow-y-auto">
      <table className="min-w-full table-auto shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">STT</th>
            <th className="px-4 py-2">Họ tên</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Địa chỉ</th>
            <th className="px-4 py-2">Số điện thoại</th>
            <th className="px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((lecturer, index) => (
            <tr
              key={lecturer.lecturerId}
              className="bg-white hover:bg-gray-100 transition-colors"
            >
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                {lecturer.name || lecturer.fullName}
              </td>
              <td className="border px-4 py-2">{lecturer.email}</td>
              <td className="border px-4 py-2">{lecturer.address}</td>
              <td className="border px-4 py-2">{lecturer.phoneNumber}</td>
              <td className="border px-4 py-2 flex justify-around items-center">
                <TbUserEdit
                  className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer transform transition-transform duration-300 hover:scale-110"
                  onClick={(e) => onEdit(e, lecturer.lecturerId)}
                  size={40}
                />
                <AiOutlineUserDelete
                  className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer transform transition-transform duration-300 hover:scale-110"
                  onClick={(e) => onDelete(e, lecturer.lecturerId)}
                  size={40}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

LecturerList.propTypes = {
  lecturers: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
