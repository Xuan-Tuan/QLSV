import { useState, useEffect, useCallback, memo } from "react";
// import { onSnapshot, collection, query } from "firebase/firestore";
// import { db } from "../../config/firebaseConfig";
// import {
//   doAddCourse,
//   doAddCourseStudent,
//   doAddScheduleCourse,
//   doDeleteCourse,
//   doGetLecturerName,
// } from "../../controller/firestoreController";
import { Link } from "react-router-dom";
import ModifyCourseForm from "./modifyForm/modifyCourseForm";
import { API_SERVICE } from "../../helpers/apiHelper";
// import { formattedDate } from "../../controller/formattedDate";
import moment from "moment";

export default memo(function ManageCoursePage() {
  const [roomList, setRoomList] = useState([]);
  const [lecturerList, setLecturerList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [courseStudentList, setCourseStudentList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [currentCourseID, setCurrentCourseID] = useState("");
  const [isModifyFormOpen, setIsModifyFormOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [course, setCourse] = useState({
    roomID: "",
    lecturerID: "",
    code: "",
    name: "",
    onlineURL: "",
    startDay: new Date(),
    week: 0,
    startTime: "",
    endTime: "",
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (
          course.roomID === "" ||
          course.lecturerID === "" ||
          course.code === "" ||
          course.name === "" ||
          course.startDay === "" ||
          course.week === 0 ||
          course.startTime === "" ||
          course.endTime === ""
        ) {
          alert("Please fill all the fields");
          return;
        }
        if (courseStudentList.length === 0) {
          alert("Please select at least one student");
          return;
        }
        if (course.week < 1 || course.week > 16) {
          alert("Week must be between 1 and 16");
          return;
        }
        if (course.startTime >= course.endTime) {
          alert("End time must be after start time");
          return;
        }
        if (course.onlineURL === "") {
          course.onlineURL = null;
        }
        if (course.startDay < new Date()) {
          alert("Start day must be in the future");
          return;
        }
        const existCourseID = courseList.filter(
          (courseIndex) => course.code == courseIndex.code
        );
        if (existCourseID.length > 0) {
          alert("Course ID already exists");
          return;
        }
        // await doAddCourse( course );
        const courseField = {
          roomID: course.roomID,
          lecturerID: course.lecturerID,
          courseId: course.code,
          name: course.name,
          onlineURL: course.onlineURL,
          startDay: moment(course.startDay).format("yyyy-MM-DD"),
          week: course.week,
          startTime: course.startTime,
          endTime: course.endTime,
          students: courseStudentList?.map((item) => item),
        };

        const response = await API_SERVICE.post("courses", courseField);

        if (response?.status == "success") {
          alert("Course added successfully");
          setIsAddFormOpen(false);
          getListData();
        }
      } catch (error) {
        console.log(error);
        alert("Failed to add course");
      }
    },
    [course, courseList, courseStudentList]
  );

  const handleModifyCourse = useCallback(async (e, courseID) => {
    e.preventDefault();
    setCurrentCourseID(courseID);
    setIsModifyFormOpen(true);
  }, []);

  const handleDeleteCourse = async () => {
    try {
      const response = await API_SERVICE.delete("courses/" + courseToDelete);
      if (response?.status == "success") {
        setIsDeleteModalOpen(false);
        getListData();
        alert("Course deleted successfully");
      } else {
        alert("Failed to delete course");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete course");
    }
  };

  const confirmDeleteCourse = useCallback((courseID) => {
    setCourseToDelete(courseID);
    setIsDeleteModalOpen(true);
  }, []);

  useEffect(() => {
    getListData();
    getListRoom();
    getListLecturers();
    getListStudent();
  }, []);

  const getListData = async () => {
    const response = await API_SERVICE.get("courses");
    if (response?.status == "success") {
      let data = response?.data?.map((item) => {
        item.id = item.courseId;
        item.code = item.courseId;
        item.name = item.nameCourse;
        item.lecturerName = item?.lecturer?.fullName;
        return item;
      });
      setCourseList(data);
    }
  };

  const getListStudent = async () => {
    const response = await API_SERVICE.get("user/student");
    if (response?.status == "success") {
      let data = response?.data?.map((item) => {
        item.id = item.MSSV;
        item.name = item.fullName;
        return item;
      });
      setStudentList(data);
    }
  };

  const getListLecturers = async () => {
    const response = await API_SERVICE.get("user/lecturer");
    if (response?.status == "success") {
      let data = response?.data?.map((item) => {
        item.id = item.lecturerId;
        item.name = item.fullName;
        return item;
      });
      setLecturerList(data);
    }
  };

  const getListRoom = async () => {
    const response = await API_SERVICE.get("rooms");
    if (response?.status == "success") {
      let data = response?.data?.map((item) => {
        item.id = item.roomId;
        item.name = item.nameRoom;
        return item;
      });
      setRoomList(data);
    }
  };

  console.log(studentList);

  return (
    <div>
      <h1 className="text-lg font-bold mb-4 text-uit">Danh sách môn học</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:font-bold"
        onClick={() => setIsAddFormOpen(true)}
      >
        Thêm môn học
      </button>
      <table className="min-w-full bg-white border border-gray-200 text-center shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b font-bold">STT</th>
            <th className="py-2 px-4 border-b font-bold">Mã môn học</th>
            <th className="py-2 px-4 border-b font-bold">Tên môn</th>
            <th className="py-2 px-4 border-b font-bold">Tên giảng viên</th>
            <th className="py-2 px-4 border-b font-bold">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {courseList.map((course, index) => (
            <tr key={course.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{course.code}</td>
              <td className="py-2 px-4 border-b hover:text-blue-500 cursor-pointer ">
                <Link to={`/admin/detailCourse/${course.code}`}>
                  {course.name}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">{course.lecturerName}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
                  onClick={(e) => handleModifyCourse(e, course.courseId)}
                >
                  Sửa
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => confirmDeleteCourse(course.courseId)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <p>Bạn có chắc chắn muốn xóa môn học này không?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDeleteCourse}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {isModifyFormOpen && (
        <ModifyCourseForm
          courseID={currentCourseID || ""}
          closeForm={() => {
            setIsModifyFormOpen(false);
            getListData();
          }}
          roomList={roomList || []}
          lecturerList={lecturerList || []}
          studentList={studentList || []}
          courseIDList={courseList.map((course) => course.courseId) || []}
        />
      )}

      {isAddFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 w-3/4 md:w-1/2 h-4/5 overflow-y-auto rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6">Thêm môn học</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Phòng học</label>
                <select
                  onChange={(e) =>
                    setCourse({ ...course, roomID: e.target.value })
                  }
                  className="block w-full p-2 border rounded"
                >
                  <option value="">Chọn phòng</option>
                  {roomList.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Giảng viên</label>
                <select
                  onChange={(e) =>
                    setCourse({ ...course, lecturerID: e.target.value })
                  }
                  className="block w-full p-2 border rounded"
                >
                  <option value="">Chọn giảng viên</option>
                  {lecturerList.map((lecturer) => (
                    <option key={lecturer.id} value={lecturer.id}>
                      {lecturer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Mã môn học</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setCourse({ ...course, code: e.target.value })
                  }
                  className="block w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Tên môn học</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setCourse({ ...course, name: e.target.value })
                  }
                  className="block w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  URL học trực tuyến
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setCourse({ ...course, onlineURL: e.target.value })
                  }
                  className="block w-full p-2 border rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 font-medium">Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={course.startDay.toISOString().substring(0, 10)}
                    onChange={(e) =>
                      setCourse({
                        ...course,
                        startDay: new Date(e.target.value),
                      })
                    }
                    className="block w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Thời gian bắt đầu
                  </label>
                  <input
                    type="time"
                    onChange={(e) =>
                      setCourse({ ...course, startTime: e.target.value })
                    }
                    className="block w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 font-medium">
                    Thời gian kết thúc
                  </label>
                  <input
                    type="time"
                    onChange={(e) =>
                      setCourse({ ...course, endTime: e.target.value })
                    }
                    className="block w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Tuần</label>
                  <input
                    type="number"
                    onChange={(e) =>
                      setCourse({ ...course, week: Number(e.target.value) })
                    }
                    className="block w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Sinh viên</label>
                <select
                  multiple={true}
                  value={courseStudentList}
                  onChange={(e) => {
                    console.log(e?.target?.value);
                    const options = Array.from(e.target.selectedOptions);
                    console.log(options);

                    const values = options?.map((option) => option.value);
                    setCourseStudentList(values);
                  }}
                  className="block w-full p-2 border rounded"
                >
                  {studentList.map((student, index) => (
                    <option key={index} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  className="mr-3 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  onClick={() => setIsAddFormOpen(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Thêm môn học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});
