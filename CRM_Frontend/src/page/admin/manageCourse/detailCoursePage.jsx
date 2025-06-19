import { useEffect, useState, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import DetailListStudentCourse from "./detailListStudentCourse";
import { FiEdit } from "react-icons/fi";
import { API_SERVICE } from "../../../helpers/apiHelper";
import moment from "moment";

export default memo(function DetailCoursePage() {
  const { courseCode } = useParams();
  const [course, setCourse] = useState({});
  const [info, setInFo] = useState({ title: "", content: "" });
  const [infoList, setInfoList] = useState([{}]);
  const [onlineURL, setOnlineURL] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);
  const [visibleSection, setVisibleSection] = useState("info");
  const [showAddInfoModal, setShowAddInfoModal] = useState(false);
  const [showDeleteInfoModal, setShowDeleteInfoModal] = useState(false);
  const [infoToDelete, setInfoToDelete] = useState(null);

  const fetchDetailCourse = async (code) => {
    const response = await API_SERVICE.get("courses/" + code);
    console.log("check res: ", response);
    if (response?.status == "success") {
      let data = {
        ...response?.data,
        lecturerName: response?.data?.lecturer?.fullName,
        name: response?.data?.nameCourse,
        roomID: response?.data?.roomId,
        week: response?.data?.numberWeek,
        onlineURL: response?.data?.onlineUrl,
      };
      setCourse(data);
      setStudentList(response?.data?.students);
    }
  };

  const getListInfo = async (code) => {
    const response = await API_SERVICE.get("infos");
    if (response?.status == "success") {
      let data = response?.data?.filter((item) => item?.courseId == code);
      setInfoList(data);
    }
  };

  const handleOnlineLinkSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await API_SERVICE.put("courses/link/" + courseCode, {
          ...course,
          onlineUrl: onlineURL,
        });
        if (response?.status == "success") {
          console.log("Add online link success");
          setShowAddLinkModal(false);
          setCourse({ ...course, onlineURL: onlineURL });
        } else {
          alert(response?.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [courseCode, onlineURL]
  );

  const handleInfoSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const response = await API_SERVICE.post("infos", {
        ...info,
        courseId: courseCode,
      });
      console.log(response);
      if (response?.status == "success") {
        console.log("Add info success");
        setShowAddInfoModal(false);
        getListInfo(courseCode);
        setInFo({ title: "", content: "" });
      } else {
        alert(response?.message);
      }
    },
    [info, courseCode]
  );
  const handleDeleteInfo = useCallback(async () => {
    try {
      const response = await API_SERVICE.delete("infos/" + infoToDelete);
      if (response?.status == "success") {
        getListInfo(courseCode);
        setShowDeleteInfoModal(false);
        console.log("Delete info success");
      } else {
        alert(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [infoToDelete]);

  const handleAddLinkOnline = useCallback((e) => {
    e.preventDefault();
    setShowAddLinkModal(true);
  }, []);

  useEffect(() => {
    if (courseCode) {
      fetchDetailCourse(courseCode);
      getListInfo(courseCode);
    }
  }, [courseCode]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setVisibleSection("info")}
          className={`px-5 py-2 rounded-full font-semibold shadow transition-all ${
            visibleSection === "info"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          📢 Thông báo
        </button>
        <button
          onClick={() => setVisibleSection("course")}
          className={`px-5 py-2 rounded-full font-semibold shadow transition-all ${
            visibleSection === "course"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          📘 Chi tiết môn học
        </button>
        <button
          onClick={() => setVisibleSection("students")}
          className={`px-5 py-2 rounded-full font-semibold shadow transition-all ${
            visibleSection === "students"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          👥 Danh sách sinh viên
        </button>
      </div>

      {visibleSection === "info" && (
        <div>
          <div className="mb-6">
            <button
              onClick={() => setShowAddInfoModal(true)}
              className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              ➕ Thêm thông báo
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {infoList.map((info, index) => (
              <div
                key={index}
                className="p-5 bg-white rounded-xl shadow-lg border-l-4 border-blue-500 flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    📌 {info.title}
                  </h3>
                  <p className="text-gray-700">{info.content}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDeleteInfoModal(true);
                    setInfoToDelete(info.id);
                  }}
                  className="ml-4 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleSection === "course" && (
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            📚 Thông tin chi tiết môn học
          </h2>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Mã môn học:</span>
              <span>{courseCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Tên môn học:</span>
              <span>{course.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Giảng viên:</span>
              <span>{course.lecturerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Phòng học:</span>
              <span>{course.room?.nameRoom}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Ngày bắt đầu:</span>
              <span>{moment(course.startDay).format("DD/MM/YYYY")}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Thời gian:</span>
              <span>
                {course.startTime} - {course.endTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Số tuần học:</span>
              <span>{course.week}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                Link học online:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={course.onlineURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline break-all"
                >
                  {course.onlineURL || "Chưa có"}
                </a>
                <FiEdit
                  size={20}
                  onClick={(e) => handleAddLinkOnline(e)}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                  title="Sửa link"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {visibleSection === "students" &&
        (course ? (
          <DetailListStudentCourse
            studentList={studentList}
            courseCode={courseCode}
          />
        ) : (
          <div>Loading...</div>
        ))}

      {showAddLinkModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl border border-gray-300 text-uit">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
              Thêm link học Online
            </h2>
            <form onSubmit={handleOnlineLinkSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="onlineLink"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Link học Online
                </label>
                <input
                  id="onlineLink"
                  type="text"
                  value={onlineURL}
                  onChange={(e) => setOnlineURL(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddLinkModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddInfoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl border border-gray-300 text-uit">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-600">
              Thêm thông báo mới
            </h2>
            <form onSubmit={handleInfoSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="infoTitle"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  id="infoTitle"
                  type="text"
                  value={info.title}
                  onChange={(e) =>
                    setInFo((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tiêu đề"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="infoContent"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="infoContent"
                  rows={4}
                  value={info.content}
                  onChange={(e) =>
                    setInFo((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập nội dung thông báo"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddInfoModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Thêm thông báo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteInfoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl border border-gray-300 text-uit">
            <h2 className="text-xl font-bold mb-4 text-center text-red-600">
              Xác nhận xóa
            </h2>
            <p className="text-center text-gray-700 mb-6">
              Bạn có chắc chắn muốn xóa thông báo này không?
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowDeleteInfoModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteInfo}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
