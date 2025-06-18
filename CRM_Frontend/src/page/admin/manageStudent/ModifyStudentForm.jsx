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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Chỉnh sửa sinh viên
        </h2>

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Tên</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-uit"
          />
        </div>

        {/* Parent */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Phụ huynh
          </label>
          <select
            name="parentID"
            value={studentData.parentID}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-uit"
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

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            value={studentData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-uit"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={studentData.phoneNumber}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-uit"
          />
        </div>

        {/* RFID */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">RFID</label>
          <input
            type="text"
            name="RFID"
            value={studentData.RFID}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-uit"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={closeForm}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-uit hover:bg-green-700 text-white px-4 py-2 rounded"
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
