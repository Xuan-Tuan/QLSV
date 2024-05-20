import React, { useEffect } from "react";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../controller/authController";
import { doSignOut } from "../../controller/authController";

const handleLogOut = async (e) => {
  localStorage.clear();
  e.preventDefault();
  try {
    await doSignOut();
  } catch (error) {
    console.log(error);
  }
};

export default function AccountInfor() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const { currentUser } = useAuth();

  const [uid, setUid] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUid(currentUser.uid);
    setEmail(currentUser.email);
    setRole(localStorage.getItem("role"));
  }, [uid, email, role]);

  useEffect(() => {
    if (role && uid) {
      const getInfo = async () => {
        const docRef = doc(db, `${role}`, `${uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo({
            name: docSnap.data().name,
            phone: docSnap.data().phoneNumber,
            address: docSnap.data().address,
          });
        } else {
          console.log("No such document!");
        }
      };
      getInfo();
    }
  }, [role, uid]);
  return (
    <div className="h-[calc(100vh-60px-50px-64px-64px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className=" text-lg font-bold text-left align-middle pl-10 text-blue-700 ">
        Tài khoản của bạn
      </div>
      <div className=" flext flex-col space-y-4 span-4 bg-gray-100 rounded-xl py-8 px-6">
        <div className="text-lg font-bold bg-white rounded-lg px-6 py-2 text-uit text-center uppercase ">
          Thông tin tài khoản của bạn
        </div>
        <div className="flex flex-col items-start ml-6 space-y-4">
          <div>
            <span className="font-semibold">Họ tên: </span>
            {""}
            {userInfo.name}
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            {""}
            {email}
          </div>
          <div>
            <span className="font-semibold">Số điện thoại:</span> {""}{" "}
            {userInfo.phone}
          </div>
          <div>
            <span className="font-semibold">Địa chỉ: </span>
            {""}
            {userInfo.address}
          </div>
        </div>
        <div className="flex items-center justify-evenly">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl mr-2">
            Chỉnh sửa
          </button>
          <NavLink to={"/LogIn"} onClick={(e) => handleLogOut(e)}>
            <button className="bg-red-500 text-white px-4 py-2 rounded-2xl">
              Đăng xuất
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
