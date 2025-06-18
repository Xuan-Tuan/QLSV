import PropTypes from "prop-types";

export default function DeleteParentForm({
  onConfirm,
  onCancel,
  isLoadingDelete,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <h2 className="text-2xl font-semibold mb-2">
            Xác nhận xoá phụ huynh
          </h2>
          <p className="text-gray-700 mb-6">
            Bạn có chắc chắn muốn xoá phụ huynh này? Thao tác này không thể hoàn
            tác.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoadingDelete}
            className={`px-4 py-2 rounded-lg text-gray-700 border border-gray-300 transition ${
              isLoadingDelete
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Huỷ
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoadingDelete}
            className={`px-4 py-2 rounded-lg text-white font-medium transition ${
              isLoadingDelete
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isLoadingDelete ? "Đang xoá..." : "Xoá"}
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteParentForm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoadingDelete: PropTypes.bool.isRequired,
};
