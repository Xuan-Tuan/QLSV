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
    <div className="w-full max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-uit scrollbar-track-gray-200 rounded-lg shadow-lg p-4">
      <table className="min-w-full table-auto bg-white rounded-lg overflow-hidden">
        <thead className="bg-uitLight text-uit uppercase text-sm sticky top-0 z-10">
          <tr>
            <th className="py-3 px-4 text-left">STT</th>
            <th className="py-3 px-4 text-left">Họ tên</th>
            <th className="py-3 px-4 text-left">Phụ huynh</th>
            <th className="py-3 px-4 text-left">Địa chỉ</th>
            <th className="py-3 px-4 text-left">SĐT</th>
            <th className="py-3 px-4 text-left">RFID</th>
            <th className="py-3 px-4 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {studentList.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                Không có sinh viên nào.
              </td>
            </tr>
          ) : (
            studentList.map((student, index) => (
              <tr
                key={student.MSSV}
                className="hover:bg-gray-100 transition-colors border-b text-sm"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{student?.fullName}</td>
                <td className="py-2 px-4">
                  {student?.parent?.name || student?.parent?.fullName}
                </td>
                <td className="py-2 px-4">{student.address}</td>
                <td className="py-2 px-4">{student.phoneNumber}</td>
                <td className="py-2 px-4">{student.RFID}</td>
                <td className="py-2 px-4">
                  <div className="flex justify-center gap-4">
                    <TbUserEdit
                      title="Sửa thông tin"
                      onClick={(e) => handleModifyStudent(e, student.MSSV)}
                      className="bg-yellow-500 text-white p-2 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                      size={32}
                    />
                    <AiOutlineUserDelete
                      title="Xoá sinh viên"
                      onClick={(e) => openDeleteConfirm(e, student.MSSV)}
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
