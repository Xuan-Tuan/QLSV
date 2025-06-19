import { useEffect, useState, useCallback, memo } from "react";
import { API_SERVICE } from "../../helpers/apiHelper";

export default memo(function ManageRoomPage() {
  const [room, setRoom] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (room === "") {
          alert("Room name cannot be empty");
          return;
        }
        const response = await API_SERVICE.post("rooms", {
          name: room,
        });
        if (response?.status == "success") {
          // alert("Room added successfully");
          setShowAddForm(false); // Hide the form after submission
          setRoom(""); // Clear the room input
          getListData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    [room, roomList]
  );

  const handleDeleteRoom = useCallback(async (e, id) => {
    e.preventDefault();
    try {
      const response = await API_SERVICE.delete("rooms/" + id);
      if (response?.status == "success") {
        // alert("Room deleted successfully");
        setShowDeleteModal(false); // Hide the modal after deletion
        setRoomToDelete(null); // Clear the roomToDelete state
        getListData();
      } else {
        alert("Failed to delete room");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete room");
    }
  }, []);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    const response = await API_SERVICE.get("rooms");
    if (response?.status == "success") {
      setRoomList(response?.data);
    }
  };

  return (
    <div className="p-6">
      <div className="text-lg uppercase font-bold text-uit mb-6 text-center">
        Danh sách phòng học
      </div>

      <div className="overflow-x-auto shadow rounded-2xl">
        <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-uit text-white">
            <tr>
              <th className="py-3 px-4 border-b">Mã phòng</th>
              <th className="py-3 px-4 border-b">Tên phòng</th>
              <th className="py-3 px-4 border-b">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {roomList.length > 0 ? (
              roomList.map((roomItem) => (
                <tr
                  key={roomItem.roomId}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-2 px-4 border-b">{roomItem.roomId}</td>
                  <td className="py-2 px-4 border-b">{roomItem.nameRoom}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-400 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
                      onClick={() => {
                        setRoomToDelete(roomItem.roomId);
                        setShowDeleteModal(true);
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-4 text-gray-500">
                  Không có phòng học nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Nút thêm */}
      <div className="flex justify-end mt-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Ẩn biểu mẫu" : "Thêm phòng học"}
        </button>
      </div>

      {/* Biểu mẫu thêm */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mt-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Nhập tên phòng học"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-uit mb-3"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              Xác nhận
            </button>
          </div>
        </form>
      )}

      {/* Modal xóa */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-700 text-center mb-4">
              Xác nhận xóa phòng học
            </h2>
            <p className="text-center text-gray-700 mb-6">
              Bạn có chắc muốn xóa phòng học này? Thao tác này không thể hoàn
              tác.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition"
              >
                Hủy
              </button>
              <button
                onClick={(e) => handleDeleteRoom(e, roomToDelete)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
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
