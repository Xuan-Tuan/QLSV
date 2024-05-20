import { useState, useEffect } from "react";
import PropTypes from "prop-types";

StudentListComponent.propTypes = {
  students: PropTypes.array,
  parents: PropTypes.array,
};

export default function StudentListComponent({ students, parents }) {
  const [studentList, setStudentList] = useState([]);
  const [parentList, setParentList] = useState([]);

  useEffect(() => {
    setStudentList(students);
    setParentList(parents);
  }, [students, parents]);

  console.log(studentList);
  console.log(parentList);

  return (
    <div>
      {studentList.map((student) => (
        <p key={student.id}>
          {student.name} -{" "}
          {parentList.find((parent) => parent.id === student.parentID).name} -{" "}
          {student.address} - {student.phoneNumber}
        </p>
      ))}
    </div>
  );
}
