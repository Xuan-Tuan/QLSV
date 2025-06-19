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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="text-lg uppercase font-bold text-center text-uit mb-6">
          Chỉnh sửa phụ huynh
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              label: "Họ tên",
              name: "name",
              placeholder: "Nhập họ tên",
              value: parentData.name,
            },
            {
              label: "Địa chỉ",
              name: "address",
              placeholder: "Nhập địa chỉ",
              value: parentData.address,
            },
            {
              label: "Số điện thoại",
              name: "phoneNumber",
              placeholder: "Nhập số điện thoại",
              value: parentData.phoneNumber,
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
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uit transition"
              />
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeForm}
              disabled={isLoading}
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

ModifyParentForm.propTypes = {
  parentId: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default ModifyParentForm;
