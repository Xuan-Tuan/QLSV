import { useState, useEffect, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { API_SERVICE } from "../../../helpers/apiHelper";
import { toast } from "react-toastify";
const ModifyStudentForm = memo(function ModifyStudentForm({
  studentId,
  parents,
  closeForm,
}) {
  const [studentData, setStudentData] = useState({
    name: "",
    parentID: "",
    address: "",
    phoneNumber: "",
    RFID: "",
    email: "",
  });

  // Lấy chi tiết sinh viên
  const getDetail = async (id) => {
    const response = await API_SERVICE.get("user/student/" + id);
    if (response?.status == "success") {
      const data = response?.data;
      console.log("check api:", data);
      const newData = {
        name: data?.fullName || "",
        address: data?.address || "",
        phoneNumber: data?.phoneNumber || "",
        RFID: data?.RFID || "",
        parentID: data?.parentId || "",
        email: data?.email || "",
      };
      setStudentData(newData);
    }
  };

  useEffect(() => {
    if (studentId) {
      getDetail(studentId);
    } else {
      setStudentData({
        name: "",
        parentID: "",
        address: "",
        phoneNumber: "",
        RFID: "",
      });
    }
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { name, address, phoneNumber, parentID, RFID } = studentData;

      if (!name || !address || !phoneNumber || !parentID || !RFID) {
        toast.warn("Vui lòng điền đầy đủ thông tin");
        return;
      }

      if (
        phoneNumber.length < 10 ||
        phoneNumber.length > 15 ||
        !/^\d+$/.test(phoneNumber)
      ) {
        toast.warn("Số điện thoại phải từ 10-15 ký tự và chỉ chứa số");
        return;
      }

      if (name.length < 3 || name.length > 50) {
        toast.warn("Tên phải từ 3-50 ký tự");
        return;
      }
      console.log("Submitting student data:", studentData);
      const res = await API_SERVICE.put("user/student/" + studentId, {
        ...studentData,
        parentId: studentData.parentID,
      });

      if (res?.status === "success") {
        closeForm();
      } else {
        toast.error(res?.message || "Cập nhật thất bại");
      }
    },
    [studentData, studentId, closeForm]
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-5"
      >
        <div className="text-lg font-bold text-center text-uit mb-2 uppercase">
          Chỉnh sửa sinh viên
        </div>

        {/* Các trường nhập */}
        {[
          {
            label: "Họ tên",
            name: "name",
            placeholder: "Nhập họ tên",
            value: studentData.name,
          },
          {
            label: "Địa chỉ",
            name: "address",
            placeholder: "Nhập địa chỉ",
            value: studentData.address,
          },
          {
            label: "Số điện thoại",
            name: "phoneNumber",
            placeholder: "Nhập số điện thoại",
            value: studentData.phoneNumber,
          },
          {
            label: "RFID",
            name: "RFID",
            placeholder: "Nhập mã RFID",
            value: studentData.RFID,
          },
        ].map(({ label, name, placeholder, value }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type="text"
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uit transition"
            />
          </div>
        ))}

        {/* Select phụ huynh */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phụ huynh
          </label>
          <select
            name="parentID"
            value={studentData.parentID}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uit transition"
          >
            <option value="">Chọn phụ huynh</option>
            {parents
              ?.filter(
                (p) => !p.hasChild || p.parentId === studentData.parentID
              )
              .map((p) => (
                <option key={p.parentId} value={p.parentId}>
                  {p.name || p.fullName}
                </option>
              ))}
          </select>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={closeForm}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-uit text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
});

ModifyStudentForm.propTypes = {
  studentId: PropTypes.string.isRequired,
  parents: PropTypes.array.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default ModifyStudentForm;
