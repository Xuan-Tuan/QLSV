import { useEffect, useState, memo } from "react";
import ModifyLecturerForm from "./modifyLecturerForm";
import AddLecturerModal from "./AddLecturerModal";
import DeleteLecturerModal from "./DeleteLecturerModal";
import { API_SERVICE } from "../../../helpers/apiHelper";
import LecturerList from "./LecturerList";

export default memo(function ManageLecturerPage() {
  const [lecturers, setLecturers] = useState([]);
  const [currentLecturerId, setCurrentLecturerId] = useState("");
  const [isModifyFormOpen, setIsModifyFormOpen] = useState(false);
  const [isDeleteModalOpen, SetIsDeleteModalOpen] = useState(false);
  const [lecturerToDelete, setLecturerToDelete] = useState(null);
  const [isAddLecturerFormOpen, setIsAddLecturerFormOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleModifyLecturer = (e, lecturerId) => {
    e.preventDefault();
    setIsModifyFormOpen(true);
    setCurrentLecturerId(lecturerId);
  };

  const handleDeleteLecturer = (e, id) => {
    e.preventDefault();
    setLecturerToDelete(id);
    SetIsDeleteModalOpen(true);
  };

  const getListData = async () => {
    try {
      setLoading(true);
      const response = await API_SERVICE.get("user/lecturer");
      if (response?.status === "success") {
        setLecturers(response?.data || []);
      } else {
        setError("Không thể tải dữ liệu.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between items-center mb-8">
        <div className="flex flex-col justify-between items-center text-uit">
          <div className="font-semibold p-4 text-2xl">Quản lý giảng viên</div>
          <div>{lecturers.length} giảng viên</div>
        </div>
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:text-red-500 hover:bg-white hover:shadow-md"
          onClick={() => setIsAddLecturerFormOpen(true)}
        >
          Thêm giảng viên
        </button>
      </div>

      {loading ? (
        <p>Đang tải danh sách giảng viên...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <LecturerList
          lecturers={lecturers}
          onEdit={handleModifyLecturer}
          onDelete={handleDeleteLecturer}
        />
      )}

      {isModifyFormOpen && (
        <ModifyLecturerForm
          lecturerId={currentLecturerId}
          closeForm={() => {
            setIsModifyFormOpen(false);
            getListData();
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteLecturerModal
          lecturerId={lecturerToDelete}
          onClose={() => {
            SetIsDeleteModalOpen(false);
            setLecturerToDelete(null);
          }}
          onSuccess={getListData}
        />
      )}

      {isAddLecturerFormOpen && (
        <AddLecturerModal
          onClose={() => setIsAddLecturerFormOpen(false)}
          onSuccess={getListData}
        />
      )}
    </div>
  );
});
