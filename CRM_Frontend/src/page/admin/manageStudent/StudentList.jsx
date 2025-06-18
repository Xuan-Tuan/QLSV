import { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import ModifyStudentForm from "./ModifyStudentForm";
import { AiOutlineUserDelete } from "react-icons/ai";
import { TbUserEdit } from "react-icons/tb";
import DeleteStudentForm from "./DeleteStudentForm";

const StudentListComponent = memo(function StudentListComponent({
  students,
  parents,
  getListData,
}) {
  const [studentList, setStudentList] = useState([]);
  const [parentList, setParentList] = useState([]);

  const [currentStudentId, setCurrentStudentId] = useState("");
  const [isModifyFormOpen, setIsModifyFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteStudentId, setDeleteStudentId] = useState(null);

  const handleModifyStudent = (e, id) => {
    e.preventDefault();
    setCurrentStudentId(id);
    setIsModifyFormOpen(true);
  };

  const openDeleteConfirm = useCallback((e, id) => {
    e.preventDefault();
    setDeleteStudentId(id);
    setIsDeleteConfirmOpen(true);
  }, []);

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setDeleteStudentId(null);
  };

  useEffect(() => {
    setStudentList(students);
    setParentList(parents);
  }, [students, parents]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-center text-uit">
        Danh sách sinh viên
      </h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-lg font-semibold">
            <th className="py-2 px-3">STT</th>
            <th className="py-2 px-3">Họ tên</th>
            <th className="py-2 px-3">Phụ huynh</th>
            <th className="py-2 px-3">Địa chỉ</th>
            <th className="py-2 px-3">Số điện thoại</th>
            <th className="py-2 px-3">RFID</th>
            <th className="py-2 px-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {studentList.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                Không có sinh viên nào.
              </td>
            </tr>
          ) : (
            studentList.map((student, index) => (
              <tr key={student.MSSV} className="hover:bg-gray-100 text-center">
                <td className="py-2 px-3 border-b">{index + 1}</td>
                <td className="py-2 px-3 border-b">{student?.fullName}</td>
                <td className="py-2 px-3 border-b">
                  {student?.parent?.name || student?.parent?.fullName}
                </td>
                <td className="py-2 px-3 border-b">{student.address}</td>
                <td className="py-2 px-3 border-b">{student.phoneNumber}</td>
                <td className="py-2 px-3 border-b">{student.RFID}</td>
                <td className="border px-4 py-2 flex justify-around items-center">
                  <TbUserEdit
                    title="Sửa thông tin sinh viênviên"
                    onClick={(e) => handleModifyStudent(e, student.MSSV)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded  cursor-pointer transform transition-transform duration-300 hover:scale-110"
                    size={40}
                  >
                    Sửa
                  </TbUserEdit>
                  <AiOutlineUserDelete
                    title="Xóa sinh viên"
                    onClick={(e) =>
                      openDeleteConfirm(e, student.MSSV, student.parentId)
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded  cursor-pointer transform transition-transform duration-300 hover:scale-110"
                    size={40}
                  >
                    Xóa
                  </AiOutlineUserDelete>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isModifyFormOpen && (
        <ModifyStudentForm
          studentId={currentStudentId}
          parents={parentList}
          closeForm={() => {
            getListData();
            setIsModifyFormOpen(false);
          }}
        />
      )}

      {isDeleteConfirmOpen && (
        <DeleteStudentForm
          studentId={deleteStudentId}
          onClose={closeDeleteConfirm}
          onSuccess={getListData}
        />
      )}
    </div>
  );
});

StudentListComponent.propTypes = {
  students: PropTypes.array,
  parents: PropTypes.array,
  getListData: PropTypes.func,
};

export default StudentListComponent;
