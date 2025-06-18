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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 md:p-8 w-[95%] md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transition-all">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Chỉnh sửa môn học
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Room select */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">
              Phòng học
            </label>
            <select
              name="roomID"
              value={courseData.roomID || ""}
              onChange={handleInputCourseChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn phòng</option>
              {roomList.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.nameRoom}
                </option>
              ))}
            </select>
          </div>

          {/* Lecturer select */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">
              Giảng viên
            </label>
            <select
              name="lecturerID"
              value={courseData.lecturerID || ""}
              onChange={handleInputCourseChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn giảng viên</option>
              {lecturerList.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.id}>
                  {lecturer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Course code & name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Mã môn học
              </label>
              <input
                type="text"
                name="code"
                value={courseData.code}
                disabled
                className="w-full p-3 border border-gray-200 bg-gray-100 rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Tên môn học
              </label>
              <input
                type="text"
                name="name"
                value={courseData.name || ""}
                onChange={handleInputCourseChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Online URL */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">
              URL học trực tuyến
            </label>
            <input
              type="text"
              name="onlineURL"
              value={courseData.onlineURL || ""}
              onChange={handleInputCourseChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Thời gian & ngày bắt đầu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                name="startDay"
                value={courseData.startDay || ""}
                disabled
                className="w-full p-3 border border-gray-200 bg-gray-100 rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Thời gian bắt đầu
              </label>
              <input
                type="time"
                name="startTime"
                value={courseData.startTime || ""}
                onChange={handleInputCourseChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* End time & number of weeks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Thời gian kết thúc
              </label>
              <input
                type="time"
                name="endTime"
                value={courseData.endTime || ""}
                onChange={handleInputCourseChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Tuần
              </label>
              <input
                type="number"
                name="week"
                value={courseData.week || ""}
                disabled
                className="w-full p-3 border border-gray-200 bg-gray-100 rounded-lg"
              />
            </div>
          </div>

          {/* Student select */}
          <div className="mb-6">
            <label className="block mb-1 font-semibold text-gray-700">
              Sinh viên
            </label>
            <select
              multiple
              value={courseStudents}
              onChange={(e) =>
                setCourseStudents(
                  [...e.target.selectedOptions].map((opt) => opt.value)
                )
              }
              className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {studentList.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="w-28 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              onClick={closeForm}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-28 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Xác nhận
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
