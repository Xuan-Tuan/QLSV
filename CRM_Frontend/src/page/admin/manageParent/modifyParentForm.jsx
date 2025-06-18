import { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { API_SERVICE } from "../../../helpers/apiHelper";

const ModifyParentForm = memo(function ModifyParentForm({
  parentId,
  closeForm,
}) {
  const [parentData, setParentData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getDetail = async (id) => {
    try {
      const response = await API_SERVICE.get("user/parent/" + id);
      if (response?.status === "success") {
        setParentData({
          name: response.data.fullName,
          address: response.data.address,
          phoneNumber: response.data.phoneNumber,
          authId: response.data.authId,
          email: response.data.email,
        });
      } else {
        toast.error("Không thể lấy dữ liệu phụ huynh");
      }
    } catch (error) {
      toast.error("Lỗi khi lấy dữ liệu phụ huynh");
    }
  };

  useEffect(() => {
    if (parentId) {
      getDetail(parentId);
    }
  }, [parentId]);

  const handleInputChange = (event) => {
    setParentData({
      ...parentData,
      [event.target.name]: event.target.value,
    });
  };

  const validateParentData = () => {
    const { name, phoneNumber, address } = parentData;

    if (!name || !address || !phoneNumber) {
      toast.warn("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    if (name.length < 3 || name.length > 50) {
      toast.warn("Tên phải từ 3 đến 50 ký tự");
      return false;
    }
    if (!/^\d+$/.test(phoneNumber)) {
      toast.warn("Số điện thoại phải là số");
      return false;
    }
    if (phoneNumber.length < 10 || phoneNumber.length > 15) {
      toast.warn("Số điện thoại phải từ 10 đến 15 số");
      return false;
    }

    return true;
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!validateParentData()) return;

      setIsLoading(true);
      try {
        const response = await API_SERVICE.put(
          "user/parent/" + parentId,
          parentData
        );
        if (response?.status === "success") {
          toast.success("Cập nhật thành công");
          closeForm();
        } else {
          toast.error(response?.message || "Cập nhật thất bại");
        }
      } catch (error) {
        toast.error("Lỗi khi cập nhật phụ huynh");
      } finally {
        setIsLoading(false);
      }
    },
    [parentData, parentId, closeForm]
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa phụ huynh</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên
            </label>
            <input
              type="text"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={parentData.name}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={parentData.address}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phoneNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={parentData.phoneNumber}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:scale-110"
              } text-white font-semibold px-4 py-2 rounded transition-transform duration-300`}
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
            <button
              type="button"
              className="bg-gray-300 font-semibold px-4 py-2 rounded cursor-pointer transform transition-transform duration-300 hover:scale-110"
              onClick={closeForm}
              disabled={isLoading}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

ModifyParentForm.propTypes = {
  parentId: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default ModifyParentForm;
