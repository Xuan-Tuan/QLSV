import { useEffect, useState, useCallback, memo } from "react";
import { useParams } from "react-router-dom";

import { MdOutlineNotificationAdd } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { API_SERVICE } from "../../helpers/apiHelper";
import { useAuth } from "../../controller/authController";

export default memo(function LecturerNotification() {
  const [info, setInFo] = useState({ title: "", content: "" });
  const [infoList, setInfoList] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const { courseCode } = useParams();
  const { currentUser } = useAuth();

  const getListData = useCallback(async () => {
    const response = await API_SERVICE.get("infos", {});
    console.log("info------->", response);
    if (response?.status == "success") {
      let data = response?.data
        ?.filter((item) => item?.course?.lecturerId == currentUser?.lecturerId)
        .map((item) => {
          item.id = item.infoId;
          return item;
        });
      setInfoList(data);
    }
  }, [currentUser?.lecturerId]);

  const handleInfoSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(info);
      try {
        const response = await API_SERVICE.post("infos", {
          ...info,
          courseId: courseCode,
        });
        console.log(response);
        if (response?.status == "success") {
          console.log("Add info success");
          setShowModal(false);
          getListData();
          setInFo({ title: "", content: "" });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [info, courseCode, getListData]
  );

  const handleDeleteInfo = useCallback(
    async (e, id) => {
      e.preventDefault();
      try {
        const response = await API_SERVICE.delete("infos/" + id);
        if (response?.status == "success") {
          getListData();
          console.log("Delete info success");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [getListData]
  );

  const handleClickAddNotice = useCallback((e) => {
    e.preventDefault();
    setShowModal(true);
  }, []);

  useEffect(() => {
    getListData();
  }, [getListData]);

  return (
    <div className="w-full h-full flex flex-col items-center px-4 py-6 overflow-y-auto">
      <div className="text-lg font-bold text-center text-uit w-full max-w-4xl mb-4 uppercase">
        Danh sách thông báo của bạn
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-4 overflow-y-auto">
        {infoList.length > 0 ? (
          infoList.map((info, index) => (
            <div
              key={index}
              className="flex justify-between items-start bg-white p-6 rounded-lg shadow border border-gray-200"
            >
              <div className="text-uit text-base font-semibold space-y-2">
                <p className="text-lg">{info.title}</p>
                <p>Môn học: {courseCode}</p>
                <p>Nội dung: {info.content}</p>
              </div>
              <div
                onClick={(e) => handleDeleteInfo(e, info.id)}
                className="text-uit cursor-pointer hover:text-red-600"
              >
                <RiDeleteBin6Line size={28} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-uit font-medium text-center mt-10">
            Bạn hiện không có thông báo nào
          </div>
        )}
      </div>

      {/* Nút thêm thông báo */}
      <div
        onClick={(e) => handleClickAddNotice(e)}
        className="mt-6 text-uit cursor-pointer hover:scale-110 transition-transform"
      >
        <MdOutlineNotificationAdd size={40} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg border border-gray-300">
            <h2 className="text-xl font-bold mb-4 text-uit">Thêm Thông Báo</h2>
            <form onSubmit={handleInfoSubmit}>
              <label className="block mb-1 font-semibold">Tiêu đề</label>
              <input
                type="text"
                value={info.title}
                onChange={(e) =>
                  setInFo((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full border border-gray-300 p-2 rounded mb-3"
              />
              <label className="block mb-1 font-semibold">Nội dung</label>
              <textarea
                value={info.content}
                onChange={(e) =>
                  setInFo((prev) => ({ ...prev, content: e.target.value }))
                }
                className="w-full border border-gray-300 p-2 rounded mb-3"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Thêm
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});
