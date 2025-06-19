import PropTypes from "prop-types";

export default function AddStudentForm({
  authStu,
  setAuthStu,
  stuInfo,
  setStuInfo,
  parents,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl">
        <div className="text-lg uppercase font-bold text-center text-uit mb-6">
          Thêm sinh viên
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Email",
                type: "text",
                value: authStu.email,
                placeholder: "Nhập email",
                onChange: (val) => setAuthStu({ ...authStu, email: val }),
              },
              {
                label: "Mật khẩu",
                type: "password",
                value: authStu.password,
                placeholder: "Nhập mật khẩu",
                onChange: (val) => setAuthStu({ ...authStu, password: val }),
              },
              {
                label: "Tên",
                type: "text",
                value: stuInfo.name,
                placeholder: "Nhập họ và tên",
                onChange: (val) => setStuInfo({ ...stuInfo, name: val }),
              },
              {
                label: "Địa chỉ",
                type: "text",
                value: stuInfo.address,
                placeholder: "Nhập địa chỉ",
                onChange: (val) => setStuInfo({ ...stuInfo, address: val }),
              },
              {
                label: "Số điện thoại",
                type: "text",
                value: stuInfo.phoneNumber,
                placeholder: "Nhập số điện thoại",
                onChange: (val) => setStuInfo({ ...stuInfo, phoneNumber: val }),
              },
              {
                label: "RFID",
                type: "text",
                value: stuInfo.RFID,
                placeholder: "Nhập mã RFID",
                onChange: (val) => setStuInfo({ ...stuInfo, RFID: val }),
              },
            ].map(({ label, type, value, onChange, placeholder }, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  value={value}
                  placeholder={placeholder}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uit transition"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phụ huynh
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uit transition"
              value={stuInfo.parentID}
              onChange={(e) =>
                setStuInfo({ ...stuInfo, parentID: e.target.value })
              }
            >
              <option value="">-- Chọn phụ huynh --</option>
              {parents
                ?.filter((item) => !item.hasChild)
                .map((parent) => (
                  <option key={parent.parentId} value={parent.parentId}>
                    {parent.name || parent.fullName}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-lg text-white font-semibold transition ${
                isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-uit hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddStudentForm.propTypes = {
  authStu: PropTypes.object.isRequired,
  setAuthStu: PropTypes.func.isRequired,
  stuInfo: PropTypes.object.isRequired,
  setStuInfo: PropTypes.func.isRequired,
  parents: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
