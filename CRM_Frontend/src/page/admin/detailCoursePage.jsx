import { useEffect, useState, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import DetailListStudentCourse from "./detailListStudentCourse";
import { FiEdit } from "react-icons/fi";
import { API_SERVICE } from "../../helpers/apiHelper";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [infoToDelete, setInfoToDelete] = useState(null);

  const getDetailData = async (code) => {
    const response = await API_SERVICE.get("courses/" + code);
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
        setShowDeleteModal(false);
        console.log("Delete info success");
      } else {
        alert(res?.message);
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
      getDetailData(courseCode);
      getListInfo(courseCode);
    }
  }, [courseCode]);

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setVisibleSection("info")}
          className={`px-4 py-2 rounded ${
            visibleSection === "info" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Thông báo
        </button>
        <button
          onClick={() => setVisibleSection("course")}
          className={`px-4 py-2 rounded ${
            visibleSection === "course"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Chi tiết môn học
        </button>
        <button
          onClick={() => setVisibleSection("students")}
          className={`px-4 py-2 rounded ${
            visibleSection === "students"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Danh sách sinh viên
        </button>
      </div>
      {visibleSection === "info" && (
        <div>
          <div className="mb-6">
            <button
              onClick={() => setShowAddInfoModal(true)}
              className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600"
            >
              Thêm thông báo
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {infoList.map((info, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="text-xl font-semibold mb-2 text-uit">
                    {info.title}
                  </div>
                  <div>{info.content}</div>
                </div>
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setInfoToDelete(info.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {visibleSection === "course" && (
        <div className="flex flex-col items-start justify-between bg-white rounded-lg shadow-lg px-8 py-6 lg:w-96 p-8 space-y-4 ">
          <h2 className="text-xl font-bold mb-4 text-center">
            Thông tin chi tiết môn học
          </h2>
          <div className="flex flex-row items-center justify-between">
            <div className="font-semibold mr-6">Mã môn học:</div>{" "}
            <div>{courseCode}</div>
          </div>
          {Object.keys(course).length > 0 && (
            <>
              <div className="flex justify-between">
                <div className="font-semibold mr-6">Name:</div>{" "}
                <div>{course.name}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold mr-6">Lecturer:</div>{" "}
                <div>{course.lecturerName}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold mr-6">Room:</div>{" "}
                <div>{course.roomID}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold mr-6">Start Day:</div>{" "}
                <div>{moment(course.startDay).format("DD/MM/yyyy")}</div>
              </div>
              <div className="flex flex-col justify-between items-center">
                <div className="flex justify-between  text-gray-500">
                  <div className="font-semibold mr-4 ml-4">Từ:</div>
                  <div>{course.startTime}</div>
                </div>
                <div className="flex justify-between text-gray-500">
                  <div className="font-semibold mr-4 ml-4">Đến:</div>
                  <div>{course.endTime}</div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold mr-6">Week:</div>{" "}
                <div>{course.week}</div>
              </div>
              <div className="flex justify-between space-x-4">
                <div className="font-semibold mr-6">Online Link:</div>
                <div
                  href={course.onlineURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline ml-2"
                >
                  {course.onlineURL}
                </div>
                <FiEdit
                  className="border-2 rounded-md text-uit cursor-pointer transform transition-transform duration-300 hover:scale-110"
                  size={30}
                  onClick={(e) => handleAddLinkOnline(e)}
                />
              </div>
            </>
          )}
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
                  value={onlineURL}
                  onChange={(e) => setOnlineURL(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddLinkModal(false)}
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
      {showAddInfoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl border-2 border-gray-300 w-auto text-uit">
            <div className="text-xl font-bold mb-4">Thêm thông báo</div>
            <form onSubmit={handleInfoSubmit}>
              <div className="mb-4">
                <label htmlFor="infoTitle" className="block font-semibold mb-2">
                  Tiêu đề
                </label>
                <input
                  id="infoTitle"
                  type="text"
                  onChange={(e) =>
                    setInFo({
                      ...info,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="infoContent"
                  className="block font-semibold mb-2"
                >
                  Nội dung
                </label>
                <textarea
                  id="infoContent"
                  onChange={(e) =>
                    setInFo({
                      ...info,
                      content: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddInfoModal(false)}
                  className="mr-4 py-2 px-4 bg-red-500 text-white rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-uit text-white rounded-lg"
                >
                  Thêm thông báo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl border-2 border-gray-300 w-auto text-uit">
            <div className="text-xl font-bold mb-4">Xác nhận xóa</div>
            <p className="mb-4">Bạn có chắc chắn muốn xóa thông báo này?</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="mr-4 py-2 px-4 bg-gray-300 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteInfo}
                className="py-2 px-4 bg-red-500 text-white rounded-lg"
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
