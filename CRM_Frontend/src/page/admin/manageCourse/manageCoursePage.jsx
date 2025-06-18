import { useState, useEffect, useCallback, memo } from "react";
import ModifyCourseForm from "./modifyCourseForm";
import { API_SERVICE } from "../../../helpers/apiHelper";
import AddCourseModal from "./AddCourseModal";
import DeleteCourseModal from "./DeleteCourseModal";
import ListCourse from "./ListCourse";

export default memo(function ManageCoursePage() {
  //state quản lý thông tin call api
  const [courseList, setCourseList] = useState([]);
  const [lecturerList, setLecturerList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  //state quản lý đóng mở modal chức năng thêm sửa xóa
  const [isModifyFormOpen, setIsModifyFormOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCourseID, setCurrentCourseID] = useState(""); // state quản lý môn học chỉnh sửa
  const [courseToDelete, setCourseToDelete] = useState(null); // state quản lý môn học xóa
  //state loading, err
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleModifyCourse = useCallback(async (e, courseID) => {
    e.preventDefault();
    setCurrentCourseID(courseID);
    setIsModifyFormOpen(true);
  }, []);

  const confirmDeleteCourse = useCallback((courseID) => {
    setCourseToDelete(courseID);
    setIsDeleteModalOpen(true);
  }, []);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError("");

    try {
      const [courseRes, roomRes, lecturerRes, studentRes] = await Promise.all([
        API_SERVICE.get("courses"),
        API_SERVICE.get("rooms"),
        API_SERVICE.get("user/lecturer"),
        API_SERVICE.get("user/student"),
      ]);

      // Xử lý dữ liệu courses
      if (courseRes?.status === "success") {
        const courseData = courseRes.data.map((item) => ({
          ...item,
          id: item.courseId,
          code: item.courseId,
          name: item.nameCourse,
          lecturerName: item?.lecturer?.fullName,
        }));
        setCourseList(courseData);
      } else {
        setError("Không thể tải danh sách môn học.");
      }

      // Xử lý dữ liệu rooms
      if (roomRes?.status === "success") {
        const roomData = roomRes.data.map((item) => ({
          ...item,
          id: item.roomId,
          name: item.nameRoom,
        }));
        setRoomList(roomData);
      }

      // Xử lý dữ liệu lecturers
      if (lecturerRes?.status === "success") {
        const lecturerData = lecturerRes.data.map((item) => ({
          ...item,
          id: item.lecturerId,
          name: item.fullName,
        }));
        setLecturerList(lecturerData);
      } else {
        setError("Không thể tải danh sách giảng viên.");
      }

      // Xử lý dữ liệu students
      if (studentRes?.status === "success") {
        const studentData = studentRes.data.map((item) => ({
          ...item,
          id: item.MSSV,
          name: item.fullName,
        }));
        setStudentList(studentData);
      } else {
        setError("Không thể tải danh sách sinh viên.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between items-center mb-8">
        <div className="text-lg font-bold mb-4 text-uit">Danh sách môn học</div>
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:text-red-500 hover:bg-white hover:shadow-md"
          onClick={() => setIsAddFormOpen(true)}
        >
          Thêm môn học
        </button>
      </div>

      {loading ? (
        <p>Đang tải danh sách giảng viên...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ListCourse
          courseList={courseList}
          onEdit={handleModifyCourse}
          onDelete={confirmDeleteCourse}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteCourseModal
          closeModal={() => setIsDeleteModalOpen(false)}
          onSuccess={fetchAllData}
          courseToDelete={courseToDelete}
        />
      )}

      {isModifyFormOpen && (
        <ModifyCourseForm
          courseID={currentCourseID || ""}
          closeForm={() => {
            setIsModifyFormOpen(false);
            fetchAllData();
          }}
          roomList={roomList || []}
          lecturerList={lecturerList || []}
          studentList={studentList || []}
          courseIDList={courseList.map((course) => course.courseId)}
        />
      )}

      {isAddFormOpen && (
        <AddCourseModal
          onClose={() => setIsAddFormOpen(false)}
          onSuccess={fetchAllData}
          roomList={roomList || []}
          lecturerList={lecturerList || []}
          studentList={studentList || []}
          courseList={courseList || []}
        />
      )}
    </div>
  );
});
