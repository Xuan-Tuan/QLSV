import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { API_SERVICE } from "../../../helpers/apiHelper";

export default function AddCourseModal({
  onClose,
  onSuccess,
  roomList,
  studentList,
  lecturerList,
  courseList,
}) {
  const [course, setCourse] = useState({
    roomID: "",
    lecturerID: "",
    code: "",
    name: "",
    onlineURL: "",
    startDay: new Date(),
    week: 0,
    startTime: "",
    endTime: "",
  });

  const [courseStudentList, setCourseStudentList] = useState([]);

  const validateCourseData = () => {
    const {
      roomID,
      lecturerID,
      code,
      name,
      startDay,
      week,
      startTime,
      endTime,
    } = course;

    if (
      !roomID ||
      !lecturerID ||
      !code ||
      !name ||
      !startDay ||
      !week ||
      !startTime ||
      !endTime
    ) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc.");
      return false;
    }

    if (courseStudentList.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sinh viên.");
      return false;
    }

    if (week < 1 || week > 16) {
      toast.error("Tuần phải nằm trong khoảng từ 1 đến 16.");
      return false;
    }

    if (startTime >= endTime) {
      toast.error("Thời gian kết thúc phải sau thời gian bắt đầu.");
      return false;
    }

    if (new Date(startDay) < new Date().setHours(0, 0, 0, 0)) {
      toast.error("Ngày bắt đầu phải lớn hơn ngày hiện tại.");
      return false;
    }

    const exists = courseList.some((c) => c.code === code);
    if (exists) {
      toast.error("Mã môn học đã tồn tại.");
      return false;
    }

    return true;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateCourseData()) return;

      try {
        const courseField = {
          roomID: course.roomID,
          lecturerID: course.lecturerID,
          courseId: course.code,
          name: course.name,
          onlineURL: course.onlineURL || null,
          startDay: moment(course.startDay).format("YYYY-MM-DD"),
          week: course.week,
          startTime: course.startTime,
          endTime: course.endTime,
          students: courseStudentList,
        };

        const response = await API_SERVICE.post("courses", courseField);

        if (response?.status === "success") {
          toast.success("Thêm môn học thành công!");
          await onSuccess();
          onClose();
        } else {
          toast.error("Thêm môn học thất bại.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Lỗi trong quá trình thêm môn học.");
      }
    },
    [course, courseList, courseStudentList]
  );

  const handleChange = (field) => (e) =>
    setCourse({ ...course, [field]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className=" text-blue-600 text-2xl font-bold px-6 py-4 flex items-center justify-center">
          Thêm môn học mới
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          {/* Phần 1: Thông tin môn học */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Thông tin môn học
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mã môn học <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={course.code}
                  onChange={handleChange("code")}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-blue-500"
                  placeholder="VD: IT1234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên môn học <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={course.name}
                  onChange={handleChange("name")}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-blue-500"
                  placeholder="VD: Công nghệ phần mềm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giảng viên <span className="text-red-500">*</span>
                </label>
                <select
                  value={course.lecturerID}
                  onChange={handleChange("lecturerID")}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">-- Chọn giảng viên --</option>
                  {lecturerList.map((lecturer) => (
                    <option key={lecturer.id} value={lecturer.id}>
                      {lecturer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phòng học <span className="text-red-500">*</span>
                </label>
                <select
                  value={course.roomID}
                  onChange={handleChange("roomID")}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">-- Chọn phòng --</option>
                  {roomList.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL học online
                </label>
                <input
                  type="text"
                  value={course.onlineURL}
                  onChange={handleChange("onlineURL")}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="https://..."
                />
              </div>
            </div>
          </section>

          {/* Phần 2: Lịch học */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Lịch học
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày bắt đầu <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={moment(course.startDay).format("YYYY-MM-DD")}
                  onChange={(e) =>
                    setCourse({ ...course, startDay: new Date(e.target.value) })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thời gian bắt đầu <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={course.startTime}
                  onChange={handleChange("startTime")}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thời gian kết thúc <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={course.endTime}
                  onChange={handleChange("endTime")}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số tuần <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={course.week}
                  onChange={(e) =>
                    setCourse({ ...course, week: Number(e.target.value) })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </section>

          {/* Phần 3: Danh sách sinh viên */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Danh sách sinh viên <span className="text-red-500">*</span>
            </h3>
            <select
              multiple
              value={courseStudentList}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map(
                  (opt) => opt.value
                );
                setCourseStudentList(selected);
              }}
              className="w-full h-48 border border-gray-300 rounded-lg px-3 py-2"
            >
              {studentList.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </section>

          {/* Nút hành động */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            >
              Thêm môn học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddCourseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  roomList: PropTypes.array.isRequired,
  lecturerList: PropTypes.array.isRequired,
  studentList: PropTypes.array.isRequired,
  courseList: PropTypes.array.isRequired,
};
