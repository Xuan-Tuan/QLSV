import { useEffect, useState } from "react";
import axios from "axios";
import { db } from "../../../config/firebaseConfig";
import { onSnapshot, collection, query } from "firebase/firestore";

export default function ManageLecturerPage() {
  const [lecturers, setLecturers] = useState([]);
  const [authLec, setAuthLec] = useState({
    email: "",
    password: "",
    role: "lecturer",
  });
  const [lecInfo, setLecInfo] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  const addLecturer = async (data) => {
    const response = await axios.post(
      "http://localhost:3000/addLecturer",
      data
    );
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addLecturer({
        email: authLec.email,
        password: authLec.password,
        role: authLec.role,
        name: lecInfo.name,
        address: lecInfo.address,
        phoneNumber: lecInfo.phoneNumber,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const queryLecturer = query(collection(db, "lecturer"));
    const unsubscribe = onSnapshot(
      queryLecturer,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setLecturers(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Lecturer&apos;s List</h1>
      <ul>
        {lecturers.map((lecturer) => (
          <li key={lecturer.id}>
            {lecturer.name} - {lecturer.address} - {lecturer.phoneNumber}
          </li>
        ))}
      </ul>

      <h1>Add Lecturer</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Email</label>
        <input
          type="text"
          value={authLec.email}
          onChange={(e) => setAuthLec({ ...authLec, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          value={authLec.password}
          onChange={(e) => setAuthLec({ ...authLec, password: e.target.value })}
        />
        <label>Name</label>
        <input
          type="text"
          value={lecInfo.name}
          onChange={(e) => setLecInfo({ ...lecInfo, name: e.target.value })}
        />
        <label>Address</label>
        <input
          type="text"
          value={lecInfo.address}
          onChange={(e) => setLecInfo({ ...lecInfo, address: e.target.value })}
        />
        <label>Phone Number</label>
        <input
          type="text"
          value={lecInfo.phone}
          onChange={(e) =>
            setLecInfo({ ...lecInfo, phoneNumber: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
