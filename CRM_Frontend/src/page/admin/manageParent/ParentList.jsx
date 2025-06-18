import { AiOutlineUserDelete } from "react-icons/ai";
import { TbUserEdit } from "react-icons/tb";
import PropTypes from "prop-types";

export default function ParentList({
  parents,
  handleModifyParent,
  handleDeleteParent,
}) {
  return (
    <div className="flex justify-center my-8">
      {parents.length > 0 ? (
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
              {parents.map((parent, index) => (
                <tr
                  key={parent.parentId}
                  className="bg-white hover:bg-gray-100 transition-colors"
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{parent?.fullName}</td>
                  <td className="border px-4 py-2">{parent.email}</td>
                  <td className="border px-4 py-2">{parent.address}</td>
                  <td className="border px-4 py-2">{parent.phoneNumber}</td>
                  <td className="border px-4 py-2 flex justify-around items-center">
                    <TbUserEdit
                      className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer transform transition-transform duration-300 hover:scale-110"
                      onClick={(e) => handleModifyParent(e, parent.parentId)}
                      size={40}
                    />
                    <AiOutlineUserDelete
                      className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer transform transition-transform duration-300 hover:scale-110"
                      onClick={(e) => handleDeleteParent(e, parent.parentId)}
                      size={40}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Không tìm thấy phụ huynh nào</p>
      )}
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
