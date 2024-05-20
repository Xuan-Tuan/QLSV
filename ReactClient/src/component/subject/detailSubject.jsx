import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useEffect, useState } from "react";

export default function DetailSubject() {
  const location = useLocation();
  const { course } = location.state;
  const { id } = useParams();
  const [schedule, setSchedule] = useState([
    { startTime: "", endTime: "", date: "" },
  ]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({
    attended: 0,
    missed: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        // console.log("Ngay hom nay => ", today);
        // console.log("Ngay mai => ", tomorrow);
        const courseQuery = query(
          collection(db, "schedule"),
          where("courseID", "==", `${id}`)
        );

        const courseSnapshot = await getDocs(courseQuery);
        const courseData = courseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log("Du lieu tat ca lich hoc ==> ", courseData);
        const filteredSchedules = courseData.filter((schedule) => {
          const scheduleDate = schedule.date.toDate();
          return scheduleDate >= today && scheduleDate < tomorrow;
        });
        setSchedule(filteredSchedules);
      } catch (error) {
        console.error("Error fetching schedules: ", error);
      }
    };

    fetchSchedules();
  }, [id]);

  const uid = localStorage.getItem("uid");
  const role = localStorage.getItem("role");

  const GetAll = async () => {
    const querySnapshot = await getDocs(collection(db, "attendance"));
    querySnapshot.forEach((doc) => {
      console.log("du lieu bang diem danh ");
      console.log(doc.id, " => ", doc.data());
    });
  };
  // sử dụng khi đăng nhập là parent
  const GetStudentID = async () => {
    try {
      const q = query(collection(db, "student"), where("parentID", "==", uid));
      const querySnapshot = await getDocs(q);
      let studentUID = null;
      querySnapshot.forEach((doc) => {
        studentUID = doc.data().studentUID;
      });
      return studentUID;
    } catch (error) {
      console.error("Error fetching student ID: ", error);
    }
  };
  // lấy dữ liệu tất cả các điểm danh của sinh viên nào đó học lớp nào đó
  const fetchAttendanceData = async (courseID, studentID) => {
    try {
      const attendanceQuery = query(
        collection(db, "attendance"),
        where("courseID", "==", courseID)
      );
      const querySnapshot = await getDocs(attendanceQuery);
      console.log("Dữ liệu lịch học hôm nay==>", querySnapshot);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Tất cả lịch học của môn ==>", data);
      const filteredData = data.filter(
        (record) => record.studentID === studentID
      );
      setAttendanceData(filteredData);
    } catch (error) {
      console.error("Error fetching attendance data: ", error);
    }
  };

  useEffect(() => {
    const handleFetchAttendance = async () => {
      if (role === "student") {
        fetchAttendanceData(id, uid);
      } else if (role === "parent") {
        const StuID = await GetStudentID();
        if (StuID) {
          fetchAttendanceData(id, StuID);
        }
      }
    };

    handleFetchAttendance();
  }, [id, uid, role]);

  useEffect(() => {
    if (schedule.length > 0) {
      console.log("Dữ liệu lịch học hôm nay ==> ", schedule);
    }
  }, [schedule]);

  useEffect(() => {
    if (attendanceData.length > 0) {
      const total = attendanceData.length;
      const attendedCount = attendanceData.filter(
        (record) => record.attended === true
      ).length;
      const missedCount = attendanceData.filter(
        (record) => record.attended === false
      ).length;
      setAttendanceStats({
        attended: attendedCount,
        missed: missedCount,
        total: total,
      });
    }
  }, [attendanceData]);

  if (!course) {
    return (
      <div className="text-5xl, text-center">
        Không tìm thấy thông tin môn học
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-70px-50px)] flex flex-row justify-evenly ">
      <div className="flex flex-col justify-start items-center space-y-6 mt-8">
        <h2 className="text-lg text-uit font-semibold text-center">
          Môn học: {course.name}
        </h2>
        <div className="flex  items-center justify-center border border-uit rounded-lg shadow-lg px-6 py-6 min-w-80 min-h-80 lg:min-w-96 lg:min-h-96">
          <div className="flex flex-col space-y-4">
            <div>
              <span className="font-semibold">Giáo viên:</span>{" "}
              {course.lecturerName}
            </div>
            <div>
              <span className="font-semibold">Ngày bắt đầu:</span>{" "}
              {course.startDay}
            </div>
            <div>
              <span className="font-semibold">Tuần Học:</span> {course.week}{" "}
              Tuần
            </div>
            <div>
              <span className="font-semibold">Phòng học:</span> {course.roomID}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-center space-y-6 mt-8">
        <h2 className="text-lg text-uit font-semibold text-center">
          Thông tin lịch học hôm nay
        </h2>
        <div className="flex  items-center justify-center border border-uit rounded-lg shadow-lg px-6 py-6 min-w-80 min-h-80 lg:min-w-96 lg:min-h-96 ">
          <div className="flex flex-col space-y-4">
            <div>
              <span className="font-semibold">Online URL:</span>{" "}
              {course.onlineURL}
            </div>
            {schedule.length > 0 ? (
              schedule.map((schedule) => (
                <div key={schedule.id}>
                  {schedule.date ? (
                    <div className="">
                      <span className="font-semibold">Lịch học ngày:</span>{" "}
                      {new Date(
                        schedule.date.seconds * 1000
                      ).toLocaleDateString()}
                    </div>
                  ) : (
                    <div>Không có thông tin ngày học.</div>
                  )}
                  <div>
                    <span className="font-semibold">Từ:</span>{" "}
                    {schedule.startTime}
                  </div>
                  <div>
                    <span className="font-semibold">Đến:</span>{" "}
                    {schedule.endTime}
                  </div>
                </div>
              ))
            ) : (
              <div>Không có lịch học hôm nay.</div>
            )}

            <div>
              <span className="font-semibold">Trạng thái điểm danh:</span>{" "}
              {attendanceStats.attended}/{attendanceStats.missed}/
              {attendanceStats.total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
