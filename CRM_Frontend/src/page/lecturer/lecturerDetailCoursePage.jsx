import { useEffect, useState, memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import LecListStudentPage from "./lecturerListStudent";
import LecturerDetailAttendanceDatePage from "./lecturerDetailAttendanceDate";
import { formattedDate } from "../../controller/formattedDate";
import { FiEdit } from "react-icons/fi";
import PropTypes from "prop-types";
import { API_SERVICE } from "../../helpers/apiHelper";
import { filterAttendanceByDate } from "../../helpers/attendanceHelper";
import LecturerContext from "../../component/lecturerContext";
import moment from "moment";

// Hiển thị thông tin chi tiếttiết môn học
const CourseInfo = memo(function CourseInfo({ course, handleAddLinkOnline }) {
  return (
    <div className="flex items-center justify-between border border-uit bg-white rounded-lg shadow-lg px-8 py-6 lg:w-96 ">
      <div className="flex flex-col space-y-4 text-uit text-lg  rounded-lg p-4">
        <div className="flex justify-between ">
          <span className="font-semibold mr-6">Mã môn học:</span>
          <span className="text-blue-700">{course?.code}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold mr-6">Ngày bắt đầu:</span>
          <span className="text-blue-700">{course?.startDay}</span>
        </div>
        <div className="flex flex-col justify-between items-center">
          <div className="flex justify-between text-gray-500">
            <span className="font-semibold mr-4">Từ:</span>
            <span className="text-blue-700">{course?.startTime}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span className="font-semibold mr-4">Đến:</span>
            <span className="text-blue-700">{course?.endTime}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold mr-6">Tuần học:</span>
          <span className="text-blue-700">{course?.week} Tuần</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold mr-6">Phòng học:</span>
          <span className="text-blue-700">{course?.nameRoom}</span>
        </div>

        <div className="flex justify-between space-x-4">
          <span className="font-semibold">Online URL:</span>
          <span className="text-blue-700">
            {course?.onlineUrl || "Chưa có"}
          </span>
          <FiEdit
            className="border-2 rounded-md text-uit cursor-pointer transform transition-transform duration-300 hover:scale-110"
            size={30}
            onClick={(e) => handleAddLinkOnline(e)}
          />
        </div>
      </div>
    </div>
  );
});

CourseInfo.propTypes = {
  course: PropTypes.object,
  handleAddLinkOnline: PropTypes.func,
};
// Hiển thị thông tin điểm danh theo ngày có lịch học và thống kê điểm danh theo ngày
const ScheduleInfo = memo(function ScheduleInfo({
  currentDay,
  setCurrentDay,
  scheduleDate,
  courseCode,
  // course,
}) {
  const [attendanceList, setAttendedList] = useState([]); // Danh sách các điểm danh trong ngày được chọn để hiển thị trạng thái điểm danh theo ngày của môn học.
  const [listAll, setListAll] = useState([]); // Danh sách điểm danh của tất cả sinh viên trong môn học đã được sắp xếp.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState({ attended: 0, total: 0 }); // Thống kê điểm danh từng buổi học của môn học.

  const getListAttendances = useCallback(async (code) => {
    setLoading(true);
    try {
      const response = await API_SERVICE.get(`courses/${code}/attendances`);
      console.log("check res in scheduleInfo: ", response);
      if (response?.status === "success") {
        const data = response?.data?.attendances || [];
        data.sort((a, b) => a.name.localeCompare(b.name));
        setListAll(data);
      } else {
        setError("Không thể tải dữ liệu điểm danh");
      }
    } catch (err) {
      setError("Lỗi khi tải điểm danh");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (courseCode) {
      getListAttendances(courseCode);
    }
  }, [courseCode, getListAttendances]);

  useEffect(() => {
    if (currentDay && listAll.length > 0) {
      const { filtered, stats } = filterAttendanceByDate(listAll, currentDay);
      setAttendedList(filtered);
      setTotal(stats);
    }
  }, [currentDay, listAll]);

  if (loading)
    return <div className="text-uit">Đang tải dữ liệu điểm danh...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="flex flex-col justify-start items-center space-y-6 mt-8">
      <div className="flex items-center justify-center border border-uit bg-white rounded-lg shadow-lg px-8 py-6 w-full">
        <div className="flex flex-col space-y-4 text-uit">
          <div className="flex flex-row justify-between items-center">
            <select
              value={scheduleDate.includes(currentDay) ? currentDay : ""}
              onChange={(e) => setCurrentDay(e.target.value)}
              className="text-center shadow-lg p-4"
            >
              <option value="">Chọn ngày</option>
              <option value={moment().format("YYYY-MM-DD")}>Hôm nay</option>
              {Array.isArray(scheduleDate) && scheduleDate.length === 0 ? (
                <option disabled>Không có lịch dạy</option>
              ) : (
                scheduleDate.map((date) => (
                  <option key={date} value={date}>
                    {moment(date).format("DD/MM/YYYY")}
                  </option>
                ))
              )}
            </select>

            <div className="flex justify-between  shadow-lg p-4 font-semibold ">
              <span>Trạng thái điểm danh:</span>
              <span className="font-semibold">
                <span className="text-green-500">{total.attended}</span>
                <span>/</span>
                <span className="text-red-500">{total.total}</span>
              </span>
            </div>
          </div>
          <LecturerDetailAttendanceDatePage attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  );
});

ScheduleInfo.propTypes = {
  currentDay: PropTypes.string,
  setCurrentDay: PropTypes.func,
  scheduleDate: PropTypes.array,
  // course: PropTypes.object,
  courseCode: PropTypes.string,
};
// Hiển thị danh sách sinh viên và thông kê điểm danh trong môn học đó theo từng sinh viên
const StudentList = memo(function StudentList({
  courseCode,
  course,
  studentList,
}) {
  return (
    <>
      <div
        className="bg-white p-6 rounded-lg shadow-2xl border-2 border-gray-300 w-auto text-uit"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl font-bold mb-4 text-center">
          {`Danh sách sinh viên học lớp ${courseCode}`}
        </div>
        {course ? (
          <LecListStudentPage
            studentList={studentList}
            courseCode={courseCode}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
});

StudentList.propTypes = {
  courseCode: PropTypes.string,
  course: PropTypes.object,
  studentList: PropTypes.array,
};

export default memo(function LecturerDetailCoursePage() {
  const { courseCode } = useParams();

  const [course, setCourse] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [onlineUrl, setOnlineUrl] = useState("");
  const [studentList, setStudentList] = useState([]); // danh sách sinh viên của môn học
  const [scheduleDate, setScheduleDate] = useState([]); // danh sách lịch học của môn học

  const [currentDay, setCurrentDay] = useState(formattedDate(new Date()));
  const [activeTab, setActiveTab] = useState(1);

  const handleOnlineLinkSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await API_SERVICE.put("courses/link/" + courseCode, {
          ...course,
          onlineUrl: onlineUrl,
        });
        if (response?.status === "success") {
          setShowModal(false);
          setOnlineUrl("");
          setCourse((prev) => ({ ...prev, onlineUrl }));
          alert("Cập nhật thành công!");
        } else {
          console.error("Cập nhật link học online thất bại:", response);
          alert("Cập nhật link học online thất bại.");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [courseCode, onlineUrl, course]
  );

  const handleAddLinkOnline = useCallback((e) => {
    e.preventDefault();
    setShowModal(true);
  }, []);

  const getDetailData = async (code) => {
    try {
      const response = await API_SERVICE.get("courses/" + code);
      // console.log("check res mon hoc: ", response);
      const { data, status } = response;
      const {
        startDay,
        courseId,
        nameCourse,
        numberWeek,
        room,
        onlineUrl,
        students,
        schedules,
      } = data;
      if (status === "success") {
        let items = {
          ...data,
          startDay: moment(startDay).format("DD/MM/YYYY"),
          code: courseId,
          name: nameCourse,
          week: numberWeek,
          nameRoom: room.nameRoom || "Chưa rõ",
          onlineUrl: onlineUrl,
        };
        setCourse(items);
        if (Array.isArray(students)) setStudentList(students);
        if (Array.isArray(schedules)) {
          const date = [
            ...new Set(schedules.map((item) => item.dateSche)),
          ].sort((a, b) => moment(a).diff(moment(b)));
          setScheduleDate(date);
        }
      } else {
        console.error("Failed to fetch course detail", response);
      }
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  useEffect(() => {
    if (courseCode) {
      getDetailData(courseCode);
    }
  }, [courseCode]);

  const values = {
    studentList,
    courseCode,
    currentDay,
    startDay: course?.startDay,
  };
  // console.log("check lich hoc seted: ", scheduleDate);
  return (
    <LecturerContext.Provider value={values}>
      <div className="flex flex-col justify-start items-center space-y-6 mt-8">
        <h1 className="text-2xl text-uit font-bold">Chi tiết môn học</h1>
        <div className="flex">
          <button
            onClick={() => setActiveTab(1)}
            className={`mr-4 py-2 px-6 rounded ${
              activeTab === 1 ? "bg-uit text-white" : "bg-gray-200"
            }`}
          >
            Thông tin môn học
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`mr-4 py-2 px-6 rounded ${
              activeTab === 2 ? "bg-uit text-white" : "bg-gray-200"
            }`}
          >
            Thông tin lịch dạy
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`py-2 px-6 rounded ${
              activeTab === 3 ? "bg-uit text-white" : "bg-gray-200"
            }`}
          >
            Danh sách sinh viên
          </button>
        </div>
        {activeTab === 1 && (
          <CourseInfo
            course={course}
            handleAddLinkOnline={handleAddLinkOnline}
          />
        )}
        {activeTab === 2 && (
          <ScheduleInfo
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            scheduleDate={scheduleDate}
            // course={course}
            courseCode={courseCode}
          />
        )}
        {activeTab === 3 && (
          <StudentList
            courseCode={courseCode}
            course={course}
            studentList={studentList}
          />
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl border-2 border-gray-300 w-auto text-uit">
            <div className="text-xl font-bold mb-4">Thêm link học Online</div>
            <form onSubmit={handleOnlineLinkSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="onlineLink"
                  className="block font-semibold mb-2"
                >
                  Link học Online:
                </label>
                <input
                  id="onlineLink"
                  type="text"
                  value={onlineUrl}
                  onChange={(e) => setOnlineUrl(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-4 py-2 px-4 bg-red-500 text-white rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-uit text-white rounded-lg"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </LecturerContext.Provider>
  );
});
