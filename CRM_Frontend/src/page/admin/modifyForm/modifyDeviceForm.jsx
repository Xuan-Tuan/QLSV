import { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { API_SERVICE } from "../../../helpers/apiHelper";

const ModifyDeviceModal = memo(function ModifyDeviceModal({
  deviceId,
  closeModal,
  roomList,
}) {
  const [deviceData, setDeviceData] = useState({
    id: "",
    roomID: "",
    status: "",
  });

  const getDetail = async (id) => {
    const response = await API_SERVICE.get("devices/" + id);
    console.log("response========> ", response);
    if (response?.status == "success") {
      let newData = {
        id: response?.data?.deviceId,
        roomID: response?.data?.roomId,
        status: response?.data?.status,
      };
      setDeviceData(newData);
    }
  };

  // Fetch the current data of the lecturer when the component mounts
  useEffect(() => {
    // Replace this with your actual data fetching logic
    if (deviceId) {
      getDetail(deviceId);
    } else {
      setDeviceData({
        id: "",
        roomID: "",
        status: "",
      });
    }
  }, [deviceId]);

  // Fetch the current data of the device when the component mounts

  const handleInputChange = (event) => {
    setDeviceData({
      ...deviceData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (deviceData.roomID === "") {
        alert("Please select a room");
        return;
      }
      const response = await API_SERVICE.put("devices/" + deviceData?.id, {
        roomId: deviceData?.roomID,
        status: deviceData?.status || "Unknown",
      });
      if (response?.status == "success") {
        closeModal();
      } else {
        alert(response?.message || "Cập nhật thất bại");
      }
    },
    [deviceData, deviceId, closeModal]
  );

  return (
    <div className="bg-white p-8 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Modify Device</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">ID:</label>
          <input
            type="text"
            name="id"
            value={deviceData.id}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Room ID:</label>
          <select
            name="roomID"
            value={deviceData.roomID}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="">Select Room</option>
            <option value="Online">Online</option>
            {roomList.map((room) => (
              <option key={room?.roomId} value={room?.roomId}>
                {room?.nameRoom}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status:</label>
          <input
            type="text"
            name="status"
            value={deviceData.status}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
            disabled
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition mr-2"
          >
            Xác nhận
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            onClick={closeModal}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
});

ModifyDeviceModal.propTypes = {
  deviceId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ModifyDeviceModal;
