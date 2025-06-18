import { useEffect, useState, useCallback, memo } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../controller/authController";
import { API_SERVICE } from "../../helpers/apiHelper";
import moment from "moment";

export default memo(function StudentCoursePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [courseListInfo, setCourseListInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClickCourse = useCallback(
    (e, courseID) => {
      e.preventDefault();
      try {
        navigate(`/student/course/${courseID}`);
      } catch (error) {
        console.log("error: ", error);
      }
    },
    [navigate]
  );

  const getListData = useCallback(async () => {
    setLoading(true);
    // console.log(currentUser);
    try {
      const response = await API_SERVICE.get("courses", {
        studentId: currentUser?.MSSV,
      });
      if (response?.status == "success") {
        const data = response.data.map((item) => ({
          ...item,
          code: item.courseId,
          id: item.courseId,
          name: item.nameCourse,
          lecturerName: item?.lecturer?.fullName,
        }));
        setCourseListInfo(data);
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
    if (currentUser?.MSSV) {
      getListData();
    }
  }, [currentUser, getListData]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-4 px-4 py-6 mx-auto">
      <div className="text-lg text-uit p-4 font-bold text-center uppercase ">
        <div>
          <p>Danh sách môn học của bạn</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 overflow-y-auto max-w-2xl w-full">
        {loading ? (
          <p className="text-center">Đang tải dữ liệu...</p>
        ) : courseListInfo.length === 0 ? (
          <p className="text-center text-blue-700 text-lg">
            Sinh viên hiện tại chưa có môn học nào.
          </p>
        ) : (
          courseListInfo.map((course) => (
            <div
              key={course.courseId}
              className="flex flex-row justify-between items-center px-8 py-4 my-5 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
            >
              <div className="flex flex-col text-start text-uit text-base font-semibold">
                <p className="mb-2">Môn học: {course.name}</p>
                <p className="mb-2">Giảng viên: {course.lecturerName}</p>
                <p className="mb-2">
                  Thời gian: {moment(course.startDay).format("DD/MM/YYYY")}
                </p>
              </div>
              <div>
                <div
                  onClick={(e) => handleClickCourse(e, course.id)}
                  className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
                >
                  <IoArrowForwardCircleOutline className="text-uit" size={50} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});
