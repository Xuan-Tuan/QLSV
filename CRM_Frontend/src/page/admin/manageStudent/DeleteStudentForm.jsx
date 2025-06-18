import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import { API_SERVICE } from "../../../helpers/apiHelper";
import { toast } from "react-toastify";
export default function DeleteStudentForm({ studentId, onClose, onSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      const result = await API_SERVICE.delete("user/student/" + studentId);
      if (result?.status === "success") {
        toast.success("Student deleted successfully");
        onSuccess();
        onClose();
      } else {
        toast.error(result?.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete student");
    } finally {
      setIsDeleting(false);
    }
  }, [studentId, onClose, onSuccess]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <h2 className="text-2xl font-semibold mb-2">
            Xác nhận xoá sinh viên
          </h2>
          <p className="text-gray-700 mb-6">
            Bạn có chắc chắn muốn xoá sinh viên này? Thao tác này không thể hoàn
            tác.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
          >
            Huỷ
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`px-4 py-2 rounded-lg text-white font-medium transition ${
              isDeleting
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isDeleting ? "Đang xoá..." : "Xoá"}
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteStudentForm.propTypes = {
  studentId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
