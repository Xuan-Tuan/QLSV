import { useEffect, useState } from "react";
import { doAddRoom } from "../../../controller/firestoreController";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

export default function ManageRoomPage() {
  const [room, setRoom] = useState([]);
  const [roomList, setRoomList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doAddRoom(room);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const queryRoom = query(collection(db, "room"));

    const unsubscribeRoom = onSnapshot(
      queryRoom,
      (snapShot) => {
        let roomList = [];
        snapShot.docs.forEach((doc) => {
          roomList.push({ id: doc.id });
        });
        setRoomList(roomList);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubscribeRoom();
    };
  }, []);

  return (
    <div>
      <h1>Room&apos;s List</h1>
      {roomList.map((room) => (
        <p key={room.id}>Room: {room.id}</p>
      ))}
      <h1>Add Room Page</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Room Name"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="submit">Add Room</button>
      </form>
      <h3>Room Info</h3>
      <p>Room: {room}</p>
    </div>
  );
}
