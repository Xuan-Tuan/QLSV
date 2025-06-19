import { useEffect, useState, memo } from "react";
import StudentList from "./StudentList";
import { API_SERVICE } from "../../../helpers/apiHelper";
import AddStudentForm from "./addStudentForm";
import { toast } from "react-toastify";
export default memo(function ManageStudentPage() {
  const [students, setStudents] = useState([]); // lấy danh sách sinh viên đã có trong csdl.
  const [parents, setParents] = useState([]); // lấy danh sách phụ huynh đã có trong csdl.
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const resetForm = () => {
    setAuthStu({ email: "", password: "", role: "student" });
    setStuInfo({
      name: "",
      parentID: "",
      address: "",
      phoneNumber: "",
      RFID: "",
    });
  };
  const isFormValid = () => {
    if (
      !authStu.email ||
      !authStu.password ||
      !stuInfo.name ||
      !stuInfo.parentID ||
      !stuInfo.address ||
      !stuInfo.phoneNumber ||
      !stuInfo.RFID
    ) {
      toast.warn("Please fill in all the required information.");
      return false;
    }
    if (students.some((s) => s.email === authStu.email)) {
      toast.warn("Student already exists");
      return false;
    }
    if (stuInfo.phoneNumber.length !== 10 || isNaN(stuInfo.phoneNumber)) {
      toast.warn("Phone number must be a 10-digit number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setIsSubmitting(true);
    try {
      const result = await API_SERVICE.post("user/student", {
        email: authStu.email,
        password: authStu.password,
        role: authStu.role,
        name: stuInfo.name,
        parentId: stuInfo.parentID,
        address: stuInfo.address,
        phoneNumber: stuInfo.phoneNumber,
        RFID: stuInfo.RFID,
      });

      if (result?.status === "success") {
        toast.success("Student added successfully");
        resetForm();
        setIsAddStudentModalOpen(false);
        fetchData();
      } else {
        toast.error(result?.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add student");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentRes, parentRes] = await Promise.all([
        API_SERVICE.get("user/student"),
        API_SERVICE.get("user/parent"),
      ]);
      if (studentRes?.status === "success") setStudents(studentRes.data);
      if (parentRes?.status === "success") setParents(parentRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col justify-between items-center text-uit font-semibold">
          <div className=" p-4 text-lg uppercase">Quản lý sinh viên</div>
          <div className="text-blue-700">{students.length} sinh viên</div>
        </div>
        <button
          onClick={() => setIsAddStudentModalOpen(true)}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:text-red-500 hover:bg-white hover:shadow-md"
        >
          Thêm sinh viên
        </button>
      </div>

      <StudentList
        students={students}
        parents={parents}
        getListData={fetchData}
      />

      {isAddStudentModalOpen && (
        <AddStudentForm
          authStu={authStu}
          setAuthStu={setAuthStu}
          stuInfo={stuInfo}
          setStuInfo={setStuInfo}
          parents={parents}
          onClose={() => setIsAddStudentModalOpen(false)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
});
