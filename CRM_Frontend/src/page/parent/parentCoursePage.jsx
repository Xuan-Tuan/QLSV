import { useEffect, useState, useCallback, memo } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../controller/authController";
import { API_SERVICE } from "../../helpers/apiHelper";
import moment from "moment";

export default memo(function ParentCoursePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [studentName, setStudentName] = useState("");
  const [courseListInfo, setCourseListInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClickCourse = useCallback(
    (e, courseID) => {
      e.preventDefault();
      try {
        navigate(`/parent/course/${courseID}`);
      } catch (error) {
        console.log("error: ", error);
      }
    },
    [navigate]
  );

  const getListData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API_SERVICE.get("courses", {
        parentId: currentUser?.parentId,
      });
      console.log("Check response", response);
      if (response?.status === "success") {
        const data = response?.data || [];

        // Nếu có ít nhất một môn học, thì cũng có một sinh viên
        if (data.length > 0) {
          const firstStudent = data[0]?.students?.[0];
          setStudentName(firstStudent?.fullName || "Không rõ");
        }

        const courses = data.map((item) => ({
          ...item,
          code: item.courseId,
          id: item.courseId,
          name: item.nameCourse || item.courseName,
          lecturerName: item?.lecturer?.fullName,
        }));
        setCourseListInfo(courses);
      } else {
        console.error(
          "Lỗi lấy danh sách khóa học:",
          response?.message || "unknown error"
        );
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error);
    }
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.parentId) {
      getListData();
    }
  }, [currentUser, getListData]);

  return (
    <div className="h-[calc(100vh-70px-50px)]">
      <div className="text-base text-uit p-4 font-bold text-left pl-10">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : courseListInfo.length === 0 ? (
          <p>Phụ huynh hiện tại chưa có sinh viên nào.</p>
        ) : (
          <p>Danh sách môn học của sinh viên: {studentName}</p>
        )}
      </div>

      <div className="h-[calc(100vh-70px-50px-80px)] md:w-3/5 w-full lg:mr-20 lg:ml-20 shadow-lg flex flex-col gap-5 p-5 overflow-y-scroll will-change-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500">
        {loading ? (
          <p className="text-center">Đang tải dữ liệu...</p>
        ) : courseListInfo.length === 0 ? (
          <p className="text-center text-blue-700 text-base">
            Không có môn học nào.
          </p>
        ) : (
          courseListInfo.map((course) => (
            <div
              key={course.courseId}
              className="flex flex-row justify-between items-center px-8 py-4 my-5 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
            >
              <div className="flex flex-col text-start text-uit text-base font-bold">
                <p className="mb-2">Môn học: {course.name}</p>
                <p className="mb-2">Giảng viên: {course.lecturerName}</p>
                <p className="mb-2">
                  Thời gian: {moment(course.startDay).format("DD/MM/YYYY")}
                </p>
              </div>
              <div
                onClick={(e) => handleClickCourse(e, course.id)}
                className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                <IoArrowForwardCircleOutline className="text-uit" size={50} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});
