import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback, memo } from "react";
import { formattedDate } from "../../controller/formattedDate";
import { useAuth } from "../../controller/authController";
import moment from "moment";
import { API_SERVICE } from "../../helpers/apiHelper";

export default memo(function ParentDetailCoursePage() {
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

  useEffect(() => {
    if (courseCode) {
      getListData(courseCode);
    }
  }, [courseCode]);

  const getListData = async (code) => {
    const response = await API_SERVICE.get(`courses/${code}/attendances`, {
      parentId: currentUser?.parentId,
    });
    if (response?.status == "success") {
      let schedules = response?.data?.schedules;
      let uniqueDates = [
        ...new Set(schedules?.map((schedule) => schedule?.dateSche)),
      ];

      // Sort the unique dates
      uniqueDates.sort((a, b) => (moment(a).isAfter(moment(b)) ? 1 : -1));
      console.log("schedules---------> ", uniqueDates);

      setScheduleList(uniqueDates);
      let items = {
        ...response?.data,
        startDay: moment(response?.data?.startDay).format("DD/MM/yyyy"),
        code: response?.data?.courseId,
        name: response?.data?.nameCourse,
        lecturerName: response?.data?.lecturer?.fullName,
        week: response?.data?.numberWeek,
        week: response?.data?.numberWeek,
        roomID: response?.data?.roomId,
        onlineURL: response?.data?.onlineURL,
      };
      setCourse(items);
      buildData(currentDay, items?.attendances);
    }
  };

  const buildData = (date, dataOld, e) => {
    e?.preventDefault();
    if (dataOld?.length > 0) {
      let data = dataOld?.filter((item) => item?.dateAtt == date);
      console.log("data--------> ", date, data);

      let dataAttend = data?.filter(
        (e) => e?.attended?.toLowerCase() == "present"
      );
      if (moment(date).isAfter(moment(moment().format("YYYY-MM-DD")))) {
        setAttended("Watching");
      } else if (dataAttend?.length > 0) {
        setAttended("Present");
      } else {
        setAttended("Absent");
      }

      setSchedule(data);

      setAttendanceStats({
        attended: dataAttend?.length,
        total: dataOld?.length,
      });
    }
  };
  return (
    <div className="h-[calc(100vh-70px-50px)] flex flex-col lg:flex-row justify-evenly p-8 bg-gray-50">
      <div className="flex flex-col justify-start items-center space-y-6 mt-8">
        <h2 className="text-2xl text-uit font-semibold mr-4 text-center">
          Môn học: {course.name}
        </h2>
        <div className="flex items-center justify-center border border-uit bg-white rounded-lg shadow-lg px-8 py-6 w-full lg:w-96">
          <div className="flex flex-col space-y-4 text-uit text-lg">
            <div className="flex justify-between">
              <span className="font-semibold mr-4">Giáo viên:</span>
              <span className="text-blue-700">{course.lecturerName}</span>
            </div>
            <div className="flex justify-between flex-col">
              <div className="flex flex-row justify-between">
                <span className="font-semibold mr-4 ">Ngày bắt đầu:</span>
                <span className="text-blue-700">{course.startDay}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center">
              <div className="flex justify-between">
                <span className="font-semibold mr-4">Từ:</span>
                <span className="text-blue-700">{course.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold mr-4">Đến:</span>
                <span className="text-blue-700">{course.endTime}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold mr-4">Tuần học:</span>
              <span className="text-blue-700">{course.week} Tuần</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold mr-4">Phòng học:</span>
              <span className="text-blue-700">{course.roomID}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-center space-y-6 mt-8">
        <h2 className="text-2xl text-uit font-semibold mr-4 text-center">
          Thông tin lịch học hôm nay: {moment(currentDay).format("DD/MM/yyyy")}
        </h2>
        <div className="border border-uit bg-white rounded-lg shadow-lg p-4 font-bold text-base text-uit">
          <select
            value={currentDay}
            onChange={(e) => {
              setCurrentDay(e.target.value);
              buildData(e?.target?.value, course?.attendances, e);
            }}
          >
            <option value="">Select date</option>
            <option value={formattedDate(new Date())}>Hôm nay</option>
            {scheduleList &&
              scheduleList.map((date) => (
                <option key={date} value={date}>
                  {moment(date).format("DD/MM/yyyy")}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center justify-center border border-uit bg-white rounded-lg shadow-lg px-8 py-6 w-full lg:w-96">
          <div className="flex flex-col space-y-4 text-uit text-lg">
            {schedule && schedule.length !== 0 ? (
              <div key={schedule[0].id}>
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
                    {attended === "Watching"
                      ? "Theo dõi"
                      : attended === "Absent"
                      ? "Vắng mặt"
                      : "Đã điểm danh"}
                  </span>
                </div>
              </div>
            ) : (
              <div className=" flex justify-center items-center font-bold text-red-500 text-xl ">
                Không có lịch học
              </div>
            )}
            <div className="flex justify-between border border-uit bg-white rounded-lg shadow-lg p-4">
              <span className="font-semibold mr-4">Trạng thái điểm danh:</span>
              <span className="font-semibold mr-4">
                <span className="text-green-500">
                  {attendanceStats.attended}
                </span>
                {" / "}
                <span className="text-red-500">{attendanceStats.total}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
