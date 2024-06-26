import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { onSnapshot, collection, where, query } from "firebase/firestore";
import {
  doAddCourseInfo,
  doUpdateCourseOnlineLink,
} from "../../controller/firestoreController";
import LecListStudentPage from "./lecListStudent";

export default function LecCoursePage() {
  const { courseCode } = useParams();
  const [course, setCourse] = useState({});
  const [info, setInFo] = useState({ title: "", content: "" });
  const [infoList, setInfoList] = useState([{}]);
  const [onlineURL, setOnlineURL] = useState("");
  const [studentList, setStudentList] = useState([]);

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    console.log(info);
    try {
      await doAddCourseInfo(courseCode, info);
      console.log("Add info success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnlineLinkSubmit = async (e) => {
    e.preventDefault();
    try {
      await doUpdateCourseOnlineLink(courseCode, onlineURL);
      console.log("Add online link success");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const queryCourse = query(doc(db, "course", courseCode));

    const unsubscribeCourse = onSnapshot(queryCourse, (snapshot) => {
      setCourse(snapshot.data());
    });

    const queryCourseStudent = query(
      collection(db, "courseStudent"),
      where("courseID", "==", courseCode)
    );

    const unsubscribeCourseStudent = onSnapshot(
      queryCourseStudent,
      (snapshot) => {
        let studentList = [];
        snapshot.docs.forEach((doc) => {
          studentList.push(doc.data().studentID);
        });
        console.log(studentList);
        setStudentList(studentList);
      }
    );

    const queryInfo = query(collection(db, "info"));

    const unsubscribeInfo = onSnapshot(
      queryInfo,
      (snapshot) => {
        let infoList = [];
        snapshot.docs.forEach((doc) => {
          if (doc.data().courseCode === courseCode) {
            infoList.push(doc.data());
          }
        });
        setInfoList(infoList);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribeInfo();
      unsubscribeCourse();
      unsubscribeCourseStudent();
    };
  }, [courseCode]);

  return (
    <div>
      <h1>Lecturer Course Page</h1>
      {infoList.map((info, index) => (
        <div key={index}>
          <h3>{info.title}</h3>
          <p>{info.content}</p>
          <br />
        </div>
      ))}
      <form onSubmit={(e) => handleInfoSubmit(e)}>
        <label>Title</label>
        <input
          type="text"
          onChange={(e) => setInFo({ ...info, title: e.target.value })}
        />
        <br />
        <label>Content</label>
        <textarea
          type="text"
          onChange={(e) => setInFo({ ...info, content: e.target.value })}
        />
        <button type="submit">Add Information</button>
      </form>
      <h2>Add online link</h2>
      <label>Online Link</label>
      <input
        type="text"
        placeholder="Online Link"
        onChange={(e) => setOnlineURL(e.target.value)}
      />
      <button onClick={(e) => handleOnlineLinkSubmit(e)}>Submit</button>
      <br />
      <h2>Course Information</h2>
      <p>Course Code: {courseCode}</p>
      {Object.keys(course).length > 0 && (
        <>
          <p>Name: {course.name}</p>
          <p>Room {course.roomID}</p>
          <p>
            Start Day:{" "}
            {Timestamp.fromMillis(course.startDay.seconds * 1000)
              .toDate()
              .toLocaleDateString()}
          </p>
          <p>Week: {course.week}</p>
          <p>Online Link: {course.onlineURL}</p>
        </>
      )}
      <LecListStudentPage
        studentList={studentList}
        courseCode={courseCode}
        week={course.week}
      />
    </div>
  );
}
