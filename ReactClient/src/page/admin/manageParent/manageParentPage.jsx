import { useEffect, useState } from "react";
import axios from "axios";
import { db } from "../../../config/firebaseConfig";
import { onSnapshot, collection, query } from "firebase/firestore";

export default function ManageParentPage() {
  const [parents, setParents] = useState([]);
  const [authPar, setAuthPar] = useState({
    email: "",
    password: "",
    role: "parent",
  });
  const [parInfo, setParInfo] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  const addParent = async (data) => {
    const response = await axios.post("http://localhost:3000/addParent", data);
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addParent({
        email: authPar.email,
        password: authPar.password,
        role: authPar.role,
        name: parInfo.name,
        address: parInfo.address,
        phoneNumber: parInfo.phoneNumber,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const queryParent = query(collection(db, "parent"));

    const unsubscribe = onSnapshot(
      queryParent,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setParents(list);
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
      <h1>Parent&apos;s List</h1>
      <ul>
        {parents.map((parent) => (
          <li key={parent.id}>
            {parent.name} - {parent.address} - {parent.phoneNumber}
          </li>
        ))}
      </ul>

      <h1>Add Parent</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Email</label>
        <input
          type="text"
          value={authPar.email}
          onChange={(e) => setAuthPar({ ...authPar, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          value={authPar.password}
          onChange={(e) => setAuthPar({ ...authPar, password: e.target.value })}
        />
        <label>Name</label>
        <input
          type="text"
          value={parInfo.name}
          onChange={(e) => setParInfo({ ...parInfo, name: e.target.value })}
        />
        <label>Address</label>
        <input
          type="text"
          value={parInfo.address}
          onChange={(e) => setParInfo({ ...parInfo, address: e.target.value })}
        />
        <label>Phone Number</label>
        <input
          type="text"
          value={parInfo.phone}
          onChange={(e) =>
            setParInfo({ ...parInfo, phoneNumber: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
