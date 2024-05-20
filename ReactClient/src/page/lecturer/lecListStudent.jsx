import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { doGetStudentInfo } from "../../controller/firestoreController";

LecListStudentPage.propTypes = {
  studentList: PropTypes.array.isRequired,
  courseCode: PropTypes.string.isRequired,
  week: PropTypes.number.isRequired,
};

export default function LecListStudentPage({ studentList, courseCode, week }) {
  const [studentInfo, setStudentInfo] = useState([]);
  useEffect(() => {
    const studentName = async () => {
      console.log("studentList: ", studentList);
      const studentListName = await doGetStudentInfo(studentList, courseCode);
      console.log(studentListName);
      setStudentInfo(studentListName);
    };
    studentName();
  }, [studentList, courseCode]);

  return (
    <div>
      <h1>Student&apos;s List</h1>
      {studentInfo ? (
        studentInfo.map((student) => (
          <div key={student.id}>
            <p>
              {student.name} - {student.attended}/{week}
            </p>
          </div>
        ))
      ) : (
        <p>No student</p>
      )}
    </div>
  );
}
