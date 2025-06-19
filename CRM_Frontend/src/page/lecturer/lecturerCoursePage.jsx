import { useEffect, useState, memo, useCallback } from "react";
import { useAuth } from "../../controller/authController";
import { useNavigate } from "react-router-dom";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { API_SERVICE } from "../../helpers/apiHelper";
import moment from "moment";

export default memo(function LecturerCoursePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [courseLec, setCourseLec] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClickCourse = useCallback(
    (e, courseID) => {
      e.preventDefault();
      try {
        navigate(`/lecturer/course/${courseID}`);
      } catch (error) {
        console.log("error: ", error);
      }
    },
    [navigate]
  );

  const handleClickNotification = useCallback(
    (e, courseID) => {
      e.preventDefault();
      try {
        navigate(`/lecturer/course/${courseID}/notification`);
      } catch (error) {
        console.log("error: ", error);
      }
    },
    [navigate]
  );

  const getListCourse = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API_SERVICE.get("courses", {
        lecturerId: currentUser?.lecturerId,
      });
      if (response?.status == "success" && response?.data) {
        const data = response.data.map((item) => ({
          ...item,
          code: item.courseId,
          id: item.courseId,
          name: item.courseName,
        }));
        setCourseLec(data);
      } else {
        console.error(
          "Lỗi lấy danh sách khóa học:",
          response?.message || "unknown error"
        );
      }
    } catch (err) {
      console.error("Lỗi gọi API:", err);
    }
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.lecturerId) {
      getListCourse();
    }
  }, [currentUser, getListCourse]);

  return (
    <div className=" w-full h-full mx-auto flex flex-col items-center gap-4 py-6">
      {/* Tiêu đề */}
      <div className="text-lg font-bold text-uit uppercase">
        Danh sách môn học đang giảng dạy:
      </div>

      {/* Danh sách môn học */}
      <div className="flex flex-col gap-5 overflow-y-auto scrollbar-thin scrollbar-thumb-uit scrollbar-track-gray-200 w-full max-w-2xl ">
        {loading ? (
          <p className="text-center">Đang tải dữ liệu...</p>
        ) : courseLec.length > 0 ? (
          courseLec.map((course) => (
            <div
              key={course.id}
              className="flex flex-row justify-between items-center px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
            >
              <div className="flex flex-col text-start text-base font-bold text-uit">
                <p className="mb-2">Môn học: {course.name}</p>
                <p className="mb-2">Mã môn học: {course.code}</p>
                <p className="mb-2">
                  Thời gian bắt đầu:{" "}
                  {moment(course.startDay).format("DD/MM/YYYY")}
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <div
                  onClick={(e) => handleClickNotification(e, course.id)}
                  className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
                >
                  <IoIosNotificationsOutline className="text-uit" size={40} />
                </div>
                <div
                  onClick={(e) => handleClickCourse(e, course.id)}
                  className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
                >
                  <IoArrowForwardCircleOutline className="text-uit" size={40} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center text-uit font-semibold bg-white rounded-lg shadow-lg p-4 border border-uit">
            Bạn chưa giảng dạy môn học nào
          </div>
        )}
      </div>
    </div>
  );
});
