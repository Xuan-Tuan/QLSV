import { AiOutlineUserDelete } from "react-icons/ai";
import { TbUserEdit } from "react-icons/tb";
import PropTypes from "prop-types";

export default function LecturerList({ lecturers, onEdit, onDelete }) {
  if (lecturers.length === 0) {
    return (
      <div className="text-center text-uit font-semibold bg-white rounded-lg shadow-md p-4">
        Không tìm thấy giáo viên nào
      </div>
    );
  }

  return (
    <div className="w-full max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-uit scrollbar-track-gray-200 rounded-lg shadow-lg">
      <table className=" w-full table-auto bg-white rounded-lg overflow-hidden">
        <thead className="bg-uitLight text-uit uppercase text-sm sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left">STT</th>
            <th className="px-4 py-3 text-left">Họ tên</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Địa chỉ</th>
            <th className="px-4 py-3 text-left">Số điện thoại</th>
            <th className="px-4 py-3 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((lecturer, index) => (
            <tr
              key={lecturer.lecturerId}
              className="hover:bg-gray-100 transition-colors border-b"
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                {lecturer.name || lecturer.fullName}
              </td>
              <td className="px-4 py-2">{lecturer.email}</td>
              <td className="px-4 py-2">{lecturer.address}</td>
              <td className="px-4 py-2">{lecturer.phoneNumber}</td>
              <td className="px-4 py-2">
                <div className="flex justify-center gap-4">
                  <TbUserEdit
                    title="Chỉnh sửa"
                    className="bg-yellow-500 text-white p-2 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                    size={32}
                    onClick={(e) => onEdit(e, lecturer.lecturerId)}
                  />
                  <AiOutlineUserDelete
                    title="Xoá"
                    className="bg-red-500 text-white p-2 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                    size={32}
                    onClick={(e) => onDelete(e, lecturer.lecturerId)}
                  />
                </div>
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
