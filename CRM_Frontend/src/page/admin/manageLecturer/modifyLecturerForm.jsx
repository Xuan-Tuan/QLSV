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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Chỉnh sửa giảng viên</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={lecturerData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address:
            </label>
            <input
              type="text"
              name="address"
              value={lecturerData.address}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number:
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={lecturerData.phoneNumber}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-end">
            <div className="flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className={`${
                  isLoading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              >
                {isLoading ? "Đang cập nhật..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
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
