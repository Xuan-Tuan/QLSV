import { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { API_SERVICE } from "../../../helpers/apiHelper";
import moment from "moment";
import { toast } from "react-toastify";
const ModifyCourseForm = memo(function ModifyCourseForm({
  courseID,
  closeForm,
  roomList,
  lecturerList,
  studentList,
}) {
  console.log("cournstId--------> ", courseID);
  const [courseData, setCourseData] = useState({
    code: "",
    name: "",
    roomID: "",
    lecturerID: "",
    onlineURL: "",
    startTime: "",
    endTime: "",
    week: 0,
    startDay: "",
  });
  const [courseStudents, setCourseStudents] = useState([]);

  const handleInputCourseChange = useCallback((event) => {
    const { name, value } = event.target;
    setCourseData((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    if (courseID) {
      getDetail(courseID);
    }
  }, [courseID]);

  const getDetail = async (id) => {
    const response = await API_SERVICE.get("courses/" + id);
    if (response?.status == "success") {
      let data = response?.data;

      setCourseData({
        code: data?.courseId || "",
        name: data?.nameCourse || "",
        roomID: data?.roomId || "",
        lecturerID: data?.lecturerId || "",
        onlineURL: data?.onlineUrl || "",
        startTime: data?.startTime || "",
        endTime: data?.endTime || "",
        week: data?.numberWeek ?? 0, // dùng ?? để giữ số 0 nếu có
        startDay: data?.startDay || "",
      });
      let students = data?.students?.map((item) => item?.MSSV);
      console.log(students);
      setCourseStudents(students);
    }
  };

  const validateCourseData = () => {
    const { roomID, lecturerID, name, startTime, endTime } = courseData;
    if (!roomID || !lecturerID || !name || !startTime || !endTime) {
      toast.error("Vui lòng điền đầy đủ các trường!");
      return false;
    }
    if (courseStudents.length === 0) {
      alert("Please select at least one student");
      return false;
    }
    if (courseData.startTime >= courseData.endTime) {
      alert("End time must be after start time");
      return false;
    }
    if (courseData.week < 1 || courseData.week > 16) {
      alert("Week must be between 1 and 16");
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        if (!validateCourseData()) return;
        const courseField = {
          roomID: courseData.roomID,
          lecturerID: courseData.lecturerID,
          courseId: courseData.code,
          name: courseData.name,
          onlineURL: courseData.onlineURL,
          startDay: moment(courseData.startDay).format("YYYY-MM-DD"),
          week: courseData.week,
          startTime: moment(courseData.startTime, "HH:mm").format("HH:mm:ss"),
          endTime: moment(courseData.endTime, "HH:mm").format("HH:mm:ss"),
          students: courseStudents.map((item) => item),
        };
        console.log("Payload gửi lên:", courseField); // debug
        const response = await API_SERVICE.put(
          "courses/" + courseID,
          courseField
        );

        if (response?.status == "success") {
          alert("Course added successfully");
          closeForm();
        }
      } catch (error) {
        console.log(error);
        alert("Failed to update course");
      }
    },
    [courseData, courseStudents, courseID, closeForm]
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-full flex flex-col">
        <div className="text-uit text-lg uppercase font-bold px-6 py-4 text-center border-b border-gray-200 bg-white shadow-sm">
          Chỉnh sửa môn học
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        >
          {/* Thông tin môn học */}
          <section className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Thông tin môn học
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mã môn học
                </label>
                <input
                  type="text"
                  name="code"
                  value={courseData.code}
                  disabled
                  className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên môn học
                </label>
                <input
                  type="text"
                  name="name"
                  value={courseData.name || ""}
                  onChange={handleInputCourseChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-uit focus:border-uit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giảng viên
                </label>
                <select
                  name="lecturerID"
                  value={courseData.lecturerID || ""}
                  onChange={handleInputCourseChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-uit focus:border-uit"
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
                  Phòng học
                </label>
                <select
                  name="roomID"
                  value={courseData.roomID || ""}
                  onChange={handleInputCourseChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-uit focus:border-uit"
                >
                  <option value="">-- Chọn phòng --</option>
                  {roomList.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.nameRoom}
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
                  name="onlineURL"
                  value={courseData.onlineURL || ""}
                  onChange={handleInputCourseChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-uit focus:border-uit"
                />
              </div>
            </div>
          </section>

          {/* Lịch học */}
          <section className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Lịch học
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  name="startDay"
                  value={courseData.startDay || ""}
                  disabled
                  className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thời gian bắt đầu
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={courseData.startTime || ""}
                  onChange={handleInputCourseChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-uit focus:border-uit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thời gian kết thúc
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={courseData.endTime || ""}
                  onChange={handleInputCourseChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-uit focus:border-uit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số tuần
                </label>
                <input
                  type="number"
                  name="week"
                  value={courseData.week || ""}
                  disabled
                  className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </section>

          {/* Danh sách sinh viên */}
          <section className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Danh sách sinh viên <span className="text-red-500">*</span>
            </h3>
            <select
              multiple
              value={courseStudents}
              onChange={(e) =>
                setCourseStudents(
                  [...e.target.selectedOptions].map((opt) => opt.value)
                )
              }
              className="w-full h-48 border border-gray-300 rounded-lg px-3 py-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100"
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
              onClick={closeForm}
              className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-uit text-white hover:bg-green-700 font-semibold"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

ModifyCourseForm.propTypes = {
  courseID: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  roomList: PropTypes.array.isRequired,
  lecturerList: PropTypes.array.isRequired,
  studentList: PropTypes.array.isRequired,
};

export default ModifyCourseForm;
