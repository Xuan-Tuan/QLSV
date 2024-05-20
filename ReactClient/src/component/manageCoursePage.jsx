import { useState, useEffect } from "react";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import {
  doAddCourse,
  doAddCourseStudent,
  doAddScheduleCourse,
} from "../controller/firestoreController";
import { Link } from "react-router-dom";

export default function AddCoursePage() {
  const [roomList, setRoomList] = useState([]);
  const [lecturerList, setLecturerList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [courseStudentList, setCourseStudentList] = useState([]);
  const [schedule, setSchedule] = useState({ startTime: "", endTime: "" });

  const [courseList, setCourseList] = useState([]);

  const [course, setCourse] = useState({
    roomID: "",
    lecturerID: "",
    code: "",
    name: "",
    onlineURL: "",
    startDay: new Date(),
    week: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doAddCourse(course);
      await doAddCourseStudent(course.code, courseStudentList);
      await doAddScheduleCourse(
        course.code,
        course.startDay,
        course.week,
        schedule.startTime,
        schedule.endTime,
        courseStudentList
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const queryStudent = query(collection(db, "student"));

    const unsubscribeStudent = onSnapshot(
      queryStudent,
      (snapShot) => {
        let studentList = [];
        snapShot.docs.forEach((doc) => {
          studentList.push({ id: doc.id, ...doc.data() });
        });
        setStudentList(studentList);
      },
      (error) => {
        console.log(error);
      }
    );

    const queryLecturer = query(collection(db, "lecturer"));

    const unsubscribeLecturer = onSnapshot(
      queryLecturer,
      (snapShot) => {
        let lecturerList = [];
        snapShot.docs.forEach((doc) => {
          lecturerList.push({ id: doc.id, ...doc.data() });
        });
        setLecturerList(lecturerList);
      },
      (error) => {
        console.log(error);
      }
    );

    const queryRoom = query(collection(db, "room"));

    const unsubscribeRoom = onSnapshot(
      queryRoom,
      (snapShot) => {
        let roomList = [];
        snapShot.docs.forEach((doc) => {
          roomList.push({ id: doc.id, ...doc.data() });
        });
        setRoomList(roomList);
      },
      (error) => {
        console.log(error);
      }
    );

    const queryCourse = query(collection(db, "course"));

    const unsubscribeCourse = onSnapshot(
      queryCourse,
      (snapShot) => {
        let courseList = [];
        snapShot.docs.forEach((doc) => {
          courseList.push({ id: doc.id, ...doc.data() });
        });
        setCourseList(courseList);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribeLecturer();
      unsubscribeRoom();
      unsubscribeStudent();
      unsubscribeCourse();
    };
  }, []);

  return (
    <div>
      <h1>Course&apos;s List</h1>
      {courseList.map((course) => (
        <p key={course.id}>
          <Link to={`/admin/displayCourse/${course.code}`}>
            {course.code} - {course.name}
          </Link>
        </p>
      ))}
      <h1>Add Course</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Room</label>
        <select
          onChange={(e) => setCourse({ ...course, roomID: e.target.value })}
        >
          <option value="">Select Room</option>
          {roomList.map((room) => (
            <option key={room.id} value={room.id}>
              {room.id}
            </option>
          ))}
        </select>
        <label>Lecturer</label>
        <select
          onChange={(e) => setCourse({ ...course, lecturerID: e.target.value })}
        >
          <option value="">Select Lecturer</option>
          {lecturerList.map((lecturer) => (
            <option key={lecturer.id} value={lecturer.id}>
              {lecturer.name}
            </option>
          ))}
        </select>
        <label>Code</label>
        <input
          type="text"
          onChange={(e) => setCourse({ ...course, code: e.target.value })}
        />
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <label>Online URL</label>
        <input
          type="text"
          onChange={(e) => setCourse({ ...course, onlineURL: e.target.value })}
        />
        <label>Start Day</label>
        <input
          type="date"
          value={course.startDay.toISOString().substring(0, 10)}
          onChange={(e) =>
            setCourse({ ...course, startDay: new Date(e.target.value) })
          }
        />
        <label>Schedule</label>
        <input
          type="time"
          onChange={(e) =>
            setSchedule({ ...schedule, startTime: e.target.value })
          }
        />
        <label>End Time</label>
        <input
          type="time"
          onChange={(e) =>
            setSchedule({ ...schedule, endTime: e.target.value })
          }
        />
        <label>Week</label>
        <input
          type="number"
          onChange={(e) =>
            setCourse({ ...course, week: Number(e.target.value) })
          }
        />
        <label>Student</label>
        <select
          multiple={true}
          value={courseStudentList}
          onChange={(e) => {
            const options = [...e.target.selectedOptions];
            const values = options.map((option) => option.value);
            setCourseStudentList(values);
          }}
        >
          {studentList.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Add Course</button>
      </form>
      <h3>Course Info</h3>
      <p>Room: {course.roomID}</p>
      <p>Lecturer: {course.lecturerID}</p>
      <p>Code: {course.code}</p>
      <p>Name: {course.name}</p>
      <p>Online URL: {course.onlineURL}</p>
      <p>Start Day: {course.startDay.toISOString().substring(0, 10)}</p>
      <p>Start Time: {schedule.startTime}</p>
      <p>End Time: {schedule.endTime}</p>
      <p>Week: {course.week}</p>
      <p>Student: </p>
      {courseStudentList.map((student) => (
        <p key={student}>{student}</p>
      ))}
    </div>
  );
}
