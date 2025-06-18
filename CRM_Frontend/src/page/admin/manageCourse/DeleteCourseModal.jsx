import PropTypes from "prop-types";
import { API_SERVICE } from "../../../helpers/apiHelper";
import { toast } from "react-toastify";
export default function DeleteCourseModal({
  closeModal,
  onSuccess,
  courseToDelete,
}) {
  const handleDeleteCourse = async () => {
    try {
      const response = await API_SERVICE.delete("courses/" + courseToDelete);
      if (response?.status == "success") {
        await onSuccess();
        closeModal();
        toast.success("Course deleted successfully");
      } else {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete course");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <h2 className="text-2xl font-semibold mb-2">
            Xác nhận xoá giảng viên
          </h2>
          <p className="text-gray-700 mb-6">
            Bạn có chắc chắn muốn xoá giảng viên này? Hành động này không thể
            hoàn tác.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100"
          >
            Huỷ
          </button>
          <button
            onClick={handleDeleteCourse}
            className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteCourseModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  courseToDelete: PropTypes.string.isRequired,
};
