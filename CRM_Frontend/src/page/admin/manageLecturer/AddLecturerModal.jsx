import { useState } from "react";
import PropTypes from "prop-types";
import { API_SERVICE } from "../../../helpers/apiHelper";
import { toast } from "react-toastify";
export default function AddLecturerModal({ onClose, onSuccess }) {
  const [authLec, setAuthLec] = useState({
    email: "",
    password: "",
    role: "lecturer",
  });
  const [lecInfo, setLecInfo] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // ✅ Hàm validate riêng
  const validateForm = () => {
    const { email, password } = authLec;
    const { name, address, phoneNumber } = lecInfo;

    if (!email || !password || !name || !address || !phoneNumber)
      return "Vui lòng điền đầy đủ thông tin";

    if (password.length < 6) return "Mật khẩu phải ít nhất 6 ký tự";

    if (phoneNumber.length < 10 || phoneNumber.length > 15)
      return "SĐT phải từ 10 đến 15 ký tự";

    if (email.length < 6 || email.length > 50)
      return "Email phải từ 6 đến 50 ký tự";

    if (name.length < 3) return "Tên phải ít nhất 3 ký tự";

    return null; // Không có lỗi
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) return toast.error(error);

    setIsLoading(true);
    try {
      const result = await API_SERVICE.post("user/lecturer", {
        ...authLec,
        ...lecInfo,
      });

      if (result?.status === "success") {
        toast.success("Thêm giảng viên thành công");
        onSuccess();
        onClose();
      } else {
        toast.error("Thêm giảng viên thất bại");
      }
    } catch {
      toast.error("Đã xảy ra lỗi khi thêm giảng viên");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-md lg:w-1/2 w-11/12 max-w-lg">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
          Thêm giảng viên
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {[
            {
              label: "Email",
              type: "email",
              value: authLec.email,
              onChange: (val) => setAuthLec({ ...authLec, email: val }),
            },
            {
              label: "Mật khẩu",
              type: "password",
              value: authLec.password,
              onChange: (val) => setAuthLec({ ...authLec, password: val }),
            },
            {
              label: "Họ tên",
              type: "text",
              value: lecInfo.name,
              onChange: (val) => setLecInfo({ ...lecInfo, name: val }),
            },
            {
              label: "Địa chỉ",
              type: "text",
              value: lecInfo.address,
              onChange: (val) => setLecInfo({ ...lecInfo, address: val }),
            },
            {
              label: "Số điện thoại",
              type: "text",
              value: lecInfo.phoneNumber,
              onChange: (val) => setLecInfo({ ...lecInfo, phoneNumber: val }),
            },
          ].map(({ label, type, value, onChange }, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {isLoading && (
            <p className="text-sm text-blue-600 text-right">Đang xử lý...</p>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-4 py-2 rounded-lg`}
            >
              {isLoading ? "Đang thêm..." : "Thêm giảng viên"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddLecturerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
