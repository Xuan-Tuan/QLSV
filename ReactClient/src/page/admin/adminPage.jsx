import { useAuth } from "../../controller/authController";
import { doSignOut } from "../../controller/authController";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await doSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddLecturer = async (e) => {
    e.preventDefault();
    try {
      navigate("/admin/addLecturer");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddParent = async (e) => {
    e.preventDefault();
    try {
      navigate("/admin/addParent");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      navigate("/admin/addStudent");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      navigate("/admin/addRoom");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      navigate("/admin/addCourse");
    } catch (error) {
      console.log(error);
    }
  };

  console.log("AdminPage: ", currentUser.email);

  return (
    <>
      <div>
        <h1>Admin</h1>
        <h2>{currentUser.email}</h2>
        <button onClick={(e) => handleLogOut(e)}>Logout</button>
        <button onClick={(e) => handleAddLecturer(e)}>Add Lecturer</button>
        <button onClick={(e) => handleAddParent(e)}>Add Parent</button>
        <button onClick={(e) => handleAddStudent(e)}>Add Student</button>
        <button onClick={(e) => handleAddRoom(e)}>Add Room</button>
        <button onClick={(e) => handleAddCourse(e)}>Add Course</button>
      </div>
    </>
  );
}
