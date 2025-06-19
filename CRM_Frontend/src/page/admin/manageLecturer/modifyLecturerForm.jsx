import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { API_SERVICE } from "../../../helpers/apiHelper";
import { toast } from "react-toastify";
const ModifyLecturerForm = memo(function ModifyLecturerForm({
  lecturerId,
  closeForm,
}) {
  const [lecturerData, setLecturerData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getDetail = async (id) => {
    try {
      const response = await API_SERVICE.get("user/lecturer/" + id);
      if (response?.status === "success") {
        const { fullName, address, phoneNumber, authId, email } = response.data;
        setLecturerData({
          name: fullName,
          address,
          phoneNumber,
          authId,
          email,
        });
      } else {
        toast.error("Không lấy được dữ liệu giảng viên");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin giảng viên:", error);
      toast.error("Đã xảy ra lỗi khi lấy thông tin");
    }
  };

  useEffect(() => {
    if (lecturerId) {
      getDetail(lecturerId);
    } else {
      setLecturerData({
        name: "",
        address: "",
        phoneNumber: "",
      });
    }
  }, [lecturerId]);

  const handleInputChange = (event) => {
    setLecturerData({
      ...lecturerData,
      [event.target.name]: event.target.value,
    });
  };

  const validateLecturerData = () => {
    const { name, address, phoneNumber } = lecturerData;

    if (!name || !address || !phoneNumber)
      return "Vui lòng điền đầy đủ thông tin";

    if (!/^\d+$/.test(phoneNumber)) return "Số điện thoại phải là số";

    if (phoneNumber.length < 10 || phoneNumber.length > 15)
      return "Số điện thoại phải từ 10 đến 15 ký tự";

    if (name.length < 3) return "Tên phải dài ít nhất 3 ký tự";

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validateLecturerData();
    if (error) return toast.error(error);

    setIsLoading(true);
    try {
      const response = await API_SERVICE.put(
        "user/lecturer/" + lecturerId,
        lecturerData
      );
      if (response?.status === "success") {
        closeForm();
      } else {
        toast.error(response?.message || "Cập nhật thất bại");
      }
    } catch (err) {
      toast.error("Lỗi mạng hoặc server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="text-lg uppercase font-bold text-center text-uit mb-6">
          Chỉnh sửa giảng viên
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              label: "Họ tên",
              name: "name",
              placeholder: "Nhập họ và tên",
              value: lecturerData.name,
            },
            {
              label: "Địa chỉ",
              name: "address",
              placeholder: "Nhập địa chỉ",
              value: lecturerData.address,
            },
            {
              label: "Số điện thoại",
              name: "phoneNumber",
              placeholder: "Nhập số điện thoại",
              value: lecturerData.phoneNumber,
            },
          ].map(({ label, name, placeholder, value }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uit transition"
              />
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeForm}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-5 py-2 rounded-lg text-white font-semibold transition ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-uit hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Đang cập nhật..." : "Xác nhận"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

ModifyLecturerForm.propTypes = {
  lecturerId: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default ModifyLecturerForm;
