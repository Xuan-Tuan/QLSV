import { AiOutlineUserDelete } from "react-icons/ai";
import { TbUserEdit } from "react-icons/tb";
import PropTypes from "prop-types";

export default function ParentList({
  parents,
  handleModifyParent,
  handleDeleteParent,
}) {
  if (parents.length === 0) {
    return (
      <div className="text-center text-uit font-semibold bg-white rounded-lg shadow-md p-4">
        Không tìm thấy phụ huynh nào
      </div>
    );
  }

  return (
    <div className="w-full max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-uit scrollbar-track-gray-200 rounded-lg shadow-lg">
      <table className="min-w-full table-auto bg-white rounded-lg overflow-hidden">
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
          {parents.map((parent, index) => (
            <tr
              key={parent.parentId}
              className="hover:bg-gray-100 transition-colors border-b"
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{parent?.fullName}</td>
              <td className="px-4 py-2">{parent.email}</td>
              <td className="px-4 py-2">{parent.address}</td>
              <td className="px-4 py-2">{parent.phoneNumber}</td>
              <td className="px-4 py-2">
                <div className="flex justify-center gap-4">
                  <TbUserEdit
                    title="Chỉnh sửa"
                    className="bg-yellow-500 text-white p-2 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                    size={32}
                    onClick={(e) => handleModifyParent(e, parent.parentId)}
                  />
                  <AiOutlineUserDelete
                    title="Xoá"
                    className="bg-red-500 text-white p-2 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                    size={32}
                    onClick={(e) => handleDeleteParent(e, parent.parentId)}
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

ParentList.propTypes = {
  parents: PropTypes.arrayOf(
    PropTypes.shape({
      parentId: PropTypes.string.isRequired,
      fullName: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      phoneNumber: PropTypes.string,
    })
  ).isRequired,
  handleModifyParent: PropTypes.func.isRequired,
  handleDeleteParent: PropTypes.func.isRequired,
};
