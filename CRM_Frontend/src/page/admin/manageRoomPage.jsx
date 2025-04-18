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
    <div className="container mx-auto">
      <h1 className=" text -uit text-2xl font-bold mb-4">
        Danh sách phòng học
      </h1>
      <table className=" text-center text-uit  bg-white border border-gray-300 w-1/2">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Room</th>
            <th className="py-2 px-4 border-b">Room name</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roomList.map((roomItem) => (
            <tr key={roomItem.roomId}>
              <td className="py-2 px-4 border-b">{roomItem.roomId}</td>
              <td className="py-2 px-4 border-b">{roomItem.nameRoom}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={() => {
                    setRoomToDelete(roomItem.roomId);
                    setShowDeleteModal(true);
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        Thêm phòng
      </button>
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Room Name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="border border-gray-300 p-2 rounded mb-2 w-full"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Xác nhận
          </button>
        </form>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-center text-uit">
              Thực hiện xóa phòng học
            </h2>
            <p>Thao tác này sẽ thực hiện xóa phòng học này.</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition"
                onClick={() => setShowDeleteModal(false)}
              >
                Hủy
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={(e) => handleDeleteRoom(e, roomToDelete)}
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
