import { useEffect, useState } from "react";
import { useAuth } from "../../controller/authController";
import { doSignOut } from "../../controller/authController";
import { doGetCourseLecturer } from "../../controller/firestoreController";
import { Link } from "react-router-dom";

export default function LecturerPage() {
  const { currentUser } = useAuth();

  const [courseLec, setCourseLec] = useState([]);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await doSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCourseLec = async () => {
      try {
        const result = await doGetCourseLecturer(currentUser.uid);
        setCourseLec(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseLec();
  }, [currentUser]);

  return (
    <div>
      <h1>Lecturer</h1>
      <h2>{currentUser.email}</h2>
      <button onClick={(e) => handleLogOut(e)}>Logout</button>
      <br />
      <h2>Courses</h2>
      {courseLec.map((course) => {
        return (
          <p key={course.id}>
            <Link to={`/lecturer/course/${course.id}`}>
              {course.code} - {course.name}
            </Link>
          </p>
        );
      })}
    </div>
  );
}
