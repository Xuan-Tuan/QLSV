import { useParams } from "react-router-dom";
import { useEffect, useState, memo, useCallback } from "react";
import { formattedDate } from "../../controller/formattedDate";
import { useAuth } from "../../controller/authController";
import { API_SERVICE } from "../../helpers/apiHelper";
import moment from "moment";

const getAttendanceStatus = (attended) => {
  if (attended === "Watching") return "Theo dõi";
  if (attended === "Absent") return "Vắng mặt";
  return "Đã điểm danh";
};

export default memo(function StudentDetailCoursePage() {
  const STATUS_SUCCESS = "success";
  const { courseCode } = useParams();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [attended, setAttended] = useState("Absent");
  const [attendanceStats, setAttendanceStats] = useState({
    attended: 0,
    total: 0,
  });
  const [currentDay, setCurrentDay] = useState(formattedDate(new Date()));
  const [scheduleList, setScheduleList] = useState([]);

  const filterAttendanceByDate = useCallback(
    (attendances, date = currentDay) => {
      const current = moment(date);
      if (attendances?.length > 0) {
        const attendancesForDate = attendances.filter((item) =>
          moment(item?.dateAtt).isSame(current, "day")
        );

        const present = attendancesForDate.some(
          (item) => item.attended?.toLowerCase() === "present"
        );

        if (attendancesForDate.length > 0) {
          const status = attendancesForDate[0].attended?.toLowerCase();
          if (status === "absent") setAttended("Absent");
          else if (status === "watching") setAttended("Watching");
          else if (present) setAttended("Present");
        } else {
          setAttended("Absent");
        }

        setSchedule(attendancesForDate);
      }
    },
    [currentDay]
  );

  const fetchCourseData = useCallback(
    async (code) => {
      try {
        const response = await API_SERVICE.get(`courses/${code}/attendances`, {
          studentId: currentUser?.MSSV,
        });

        const { status, data } = response;

        if (status !== STATUS_SUCCESS || !data) {
          console.warn("Lỗi khi lấy dữ liệu khóa học hoặc dữ liệu rỗng");
          return;
        }

        const {
          courseId,
          nameCourse,
          lecturer,
          numberWeek,
          room,
          schedules,
          startDay,
          attendances,
          onlineURL,
          onlineUrl,
          startTime,
          endTime,
        } = data;

        const sortedSchedules = [...(schedules || [])].sort((a, b) =>
          moment(a?.dateSche).diff(moment(b?.dateSche))
        );
        setScheduleList(sortedSchedules);

        const courseInfo = {
          code: courseId,
          name: nameCourse,
          lecturerName: lecturer?.fullName || "Chưa rõ",
          startDay: moment(startDay).format("DD/MM/YYYY"),
          week: numberWeek,
          nameRoom: room?.nameRoom || "Chưa rõ",
          attendances: attendances || [],
          onlineURL: onlineURL || onlineUrl || "",
          startTime: startTime || "",
          endTime: endTime || "",
        };
        setCourse(courseInfo);

        filterAttendanceByDate(courseInfo.attendances);

        const attendedTotal = courseInfo.attendances.filter(
          (e) => e?.attended?.toLowerCase() === "present"
        ).length;

        setAttendanceStats({
          attended: attendedTotal,
          total: courseInfo.attendances.length || 0,
        });
      } catch (error) {
        console.error("Lỗi khi gọi API lấy dữ liệu khóa học:", error);
      }
    },
    [currentUser, filterAttendanceByDate]
  );

  useEffect(() => {
    if (courseCode) {
      fetchCourseData(courseCode);
    }
  }, [courseCode, fetchCourseData]);

  return (
    <div className=" w-full h-full flex flex-col md:flex-row justify-evenly p-8 bg-gray-50">
      <div className="flex flex-col justify-start items-center space-y-6 mt-8">
        <h2 className="text-lg text-uit font-semibold mr-4 text-center">
          Môn học: {course.name}
        </h2>
        <div className="flex items-center justify-center  bg-white rounded-lg shadow-lg px-8 py-6  border-2 ">
          <div className="flex flex-col space-y-4 text-blue-700 text-base">
            <div className="flex justify-between">
              <span className="font-semibold mr-4 text-uit">Giáo viên:</span>
              <span>{course.lecturerName}</span>
            </div>
            <div className="flex justify-between flex-col">
              <div className="flex flex-row justify-between">
                <span className="font-semibold mr-4 text-uit ">
                  Ngày bắt đầu:
                </span>
                <span>{course.startDay}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center">
              <div className="flex justify-between">
                <span className="font-semibold mr-4 text-uit">Từ:</span>
                <span>{course.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold mr-4 text-uit">Đến:</span>
                <span>{course.endTime}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold mr-4 text-uit">Tuần học:</span>
              <span>{course.week} Tuần</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold mr-4 text-uit">Phòng học:</span>
              <span>{course.nameRoom}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-center space-y-6 mt-8">
        <h2 className="text-lg text-uit font-semibold mr-4 text-center">
          Thông tin lịch học ngày: {currentDay}
        </h2>
        <div className=" bg-white rounded-lg shadow-lg p-4 font-semibold text-base text-uit">
          <select
            value={currentDay}
            onChange={(e) => {
              const newDate = e.target.value;
              setCurrentDay(newDate);
              filterAttendanceByDate(course?.attendances, newDate);
            }}
          >
            <option value="">Chọn ngày</option>
            <option value={formattedDate(new Date())}>Hôm nay</option>
            {scheduleList &&
              scheduleList.map((item) => (
                <option key={item.dateSche} value={item.dateSche}>
                  {moment(item.dateSche).format("DD/MM/YYYY")}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center justify-center  bg-white rounded-lg shadow-lg px-8 py-6 border-2 ">
          <div className="flex flex-col space-y-4 text-uit text-base">
            {schedule && schedule.length !== 0 ? (
              <div key={course.courseId}>
                <div className="flex justify-between">
                  <span className="font-semibold ">Online URL:</span>
                  <span className="text-blue-700">
                    {course?.onlineURL || course?.onlineUrl}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold mr-1">
                    Trạng thái điểm danh:
                  </span>
                  <span
                    className={
                      attended === "Watching"
                        ? "text-blue-500"
                        : attended === "Absent"
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {getAttendanceStatus(attended)}
                  </span>
                </div>
              </div>
            ) : (
              <div className=" flex justify-center items-center font-normal text-red-500 text-base ">
                Ngày được chọn hông có lịch học.
              </div>
            )}
            <div className="flex justify-between border border-uit bg-white rounded-lg shadow-lg p-4">
              <span className="font-semibold mr-4">Thống kê:</span>
              <span className="font-semibold mr-4">
                <span className="text-green-500">
                  {attendanceStats.attended}
                </span>
                {" / "}
                <span className="text-gray-700">{attendanceStats.total}</span>
              </span>
              <div className="font-semibold">
                Tiến độ:{" "}
                {Math.round(
                  (attendanceStats.attended / attendanceStats.total) * 100
                )}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
