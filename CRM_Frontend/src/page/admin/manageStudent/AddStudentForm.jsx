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
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Thêm sinh viên
          </h2>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Email",
                  type: "text",
                  value: authStu.email,
                  onChange: (val) => setAuthStu({ ...authStu, email: val }),
                },
                {
                  label: "Mật khẩu",
                  type: "password",
                  value: authStu.password,
                  onChange: (val) => setAuthStu({ ...authStu, password: val }),
                },
                {
                  label: "Tên",
                  type: "text",
                  value: stuInfo.name,
                  onChange: (val) => setStuInfo({ ...stuInfo, name: val }),
                },
                {
                  label: "Địa chỉ",
                  type: "text",
                  value: stuInfo.address,
                  onChange: (val) => setStuInfo({ ...stuInfo, address: val }),
                },
                {
                  label: "Số điện thoại",
                  type: "text",
                  value: stuInfo.phoneNumber,
                  onChange: (val) =>
                    setStuInfo({ ...stuInfo, phoneNumber: val }),
                },
                {
                  label: "RFID",
                  type: "text",
                  value: stuInfo.RFID,
                  onChange: (val) => setStuInfo({ ...stuInfo, RFID: val }),
                },
              ].map(({ label, type, value, onChange }, idx) => (
                <div key={idx}>
                  <label className="block text-gray-700 font-semibold mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Phụ huynh
              </label>
              <select
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={stuInfo.parentID}
                onChange={(e) =>
                  setStuInfo({ ...stuInfo, parentID: e.target.value })
                }
              >
                <option value="">Chọn phụ huynh</option>
                {parents
                  ?.filter((item) => !item.hasChild)
                  .map((parent) => (
                    <option key={parent.parentId} value={parent.parentId}>
                      {parent.name || parent.fullName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
              </button>
            </div>
          </form>
        </div>
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
