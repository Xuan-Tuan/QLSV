import { useEffect, useState, memo, useCallback } from "react";
import StudentListComponent from "./studentListComponent";
import { API_SERVICE } from "../../helpers/apiHelper";

export default memo(function ManageStudentPage() {
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  const [authStu, setAuthStu] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [stuInfo, setStuInfo] = useState({
    name: "",
    parentID: "",
    address: "",
    phoneNumber: "",
    RFID: "",
  });

  const addStudent = async (data) => {
    const response = await API_SERVICE.post("user/student", data);
    return response;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (
          authStu.email === "" ||
          authStu.password === "" ||
          stuInfo.name === "" ||
          // stuInfo.parentID === "" ||
          stuInfo.address === "" ||
          stuInfo.phoneNumber === ""
          // stuInfo.RFID === ""
        ) {
          alert("Please fill in all the required information.");
          setAuthStu({ email: "", password: "", role: "student" });
          setStuInfo({
            name: "",
            parentID: "",
            address: "",
            phoneNumber: "",
            RFID: "",
          });
          return;
        }
        if (students.find((student) => student.email === authStu.email)) {
          alert("Student already exists");
          return;
        }
        if (stuInfo.phoneNumber.length !== 10) {
          alert("Phone number must be 10 digits");
          return;
        }
        if (isNaN(stuInfo.phoneNumber)) {
          alert("Phone number must be a number");
          return;
        }
        const result = await addStudent({
          email: authStu.email,
          password: authStu.password,
          role: authStu.role,
          name: stuInfo.name,
          parentId: stuInfo.parentID,
          address: stuInfo.address,
          phoneNumber: stuInfo.phoneNumber,
          RFID: stuInfo.RFID,
        });
        if (result?.status == "success") {
          console.log(result);
          alert("Student added successfully");
          setAuthStu({ email: "", password: "", role: "student" });
          setStuInfo({
            name: "",
            parentID: "",
            address: "",
            phoneNumber: "",
            RFID: "",
          });
          setIsAddStudentModalOpen(false);
          getListData();
        } else {
          alert(res?.message);
        }
      } catch (error) {
        console.log(error);
        console.log("info", stuInfo);
        alert("Failed to add student");
      }
    },
    [authStu, stuInfo, students]
  );

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    const response = await API_SERVICE.get("user/student");
    if (response?.status == "success") {
      setStudents(response?.data);
    }
    getParents();
  };

  const getParents = async () => {
    const response = await API_SERVICE.get("user/parent");
    if (response?.status == "success") {
      let data = response?.data;
      setParents(data);
    }
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4 text-uit">Danh sách sinh viên</h1>
      <button
        onClick={() => setIsAddStudentModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-300 float-right"
      >
        Thêm sinh viên
      </button>
      <StudentListComponent
        students={students}
        parents={parents}
        getListData={getListData}
      />

      {isAddStudentModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 ">
          <div className="bg-white p-8 rounded-2xl shadow-md lg:w-1/2 w-3/4 ">
            <h2 className=" text-lg font-bold mb-4">Thêm sinh viên</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label className="block text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3 mt-1"
                  value={authStu.email}
                  onChange={(e) =>
                    setAuthStu({ ...authStu, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="border rounded w-full py-2 px-3 mt-1"
                  value={authStu.password}
                  onChange={(e) =>
                    setAuthStu({ ...authStu, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Tên</label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3 mt-1"
                  value={stuInfo.name}
                  onChange={(e) =>
                    setStuInfo({ ...stuInfo, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Phụ huynh
                </label>
                <select
                  className="border rounded w-full py-2 px-3 mt-1"
                  value={stuInfo.parentID}
                  onChange={(e) =>
                    setStuInfo({ ...stuInfo, parentID: e.target.value })
                  }
                >
                  <option value="">Chọn phụ huynh</option>
                  {parents
                    ?.filter((item) => !item.hasChild)
                    .map((parent) => (
                      <option key={parent.parentId} value={parent.parentId}>
                        {parent.name || parent?.fullName}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3 mt-1"
                  value={stuInfo.address}
                  onChange={(e) =>
                    setStuInfo({ ...stuInfo, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3 mt-1"
                  value={stuInfo.phoneNumber}
                  onChange={(e) =>
                    setStuInfo({ ...stuInfo, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  RFID
                </label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3 mt-1"
                  value={stuInfo.RFID}
                  onChange={(e) =>
                    setStuInfo({ ...stuInfo, RFID: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddStudentModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});
