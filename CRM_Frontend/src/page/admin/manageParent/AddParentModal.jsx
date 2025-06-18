import PropTypes from "prop-types";
export default function AddParentModal({
  authPar,
  setAuthPar,
  parInfo,
  setParInfo,
  onSubmit,
  onClose,
}) {
  const fields = [
    {
      label: "Email",
      type: "email",
      value: authPar.email,
      onChange: (val) => setAuthPar({ ...authPar, email: val }),
    },
    {
      label: "Mật khẩu",
      type: "password",
      value: authPar.password,
      onChange: (val) => setAuthPar({ ...authPar, password: val }),
    },
    {
      label: "Họ tên",
      type: "text",
      value: parInfo.name,
      onChange: (val) => setParInfo({ ...parInfo, name: val }),
    },
    {
      label: "Địa chỉ",
      type: "text",
      value: parInfo.address,
      onChange: (val) => setParInfo({ ...parInfo, address: val }),
    },
    {
      label: "Số điện thoại",
      type: "text",
      value: parInfo.phoneNumber,
      onChange: (val) => setParInfo({ ...parInfo, phoneNumber: val }),
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-md lg:w-1/2 w-11/12 max-w-lg">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-700">
          Thêm phụ huynh
        </h2>
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
          {fields.map(({ label, type, value, onChange }, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Thêm phụ huynh
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddParentModal.propTypes = {
  authPar: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  setAuthPar: PropTypes.func.isRequired,

  parInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
  setParInfo: PropTypes.func.isRequired,

  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
