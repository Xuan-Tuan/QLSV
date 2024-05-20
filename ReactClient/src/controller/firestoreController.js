import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  documentId,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

async function doGetAuthRole(UID) {
  const auhRef = doc(db, "authentication", UID);
  const authSnap = await getDoc(auhRef);

  if (authSnap.exists()) {
    const authRole = authSnap.data().role;
    return authRole;
  } else {
    return null;
  }
}

async function doGetCourseLecturer(lecturerID) {
  const courseRef = collection(db, "course");
  const courseQuery = query(courseRef, where("lecturerID", "==", lecturerID));
  const courseSnap = await getDocs(courseQuery);

  if (!courseSnap.empty) {
    let courseList = [];
    courseSnap.forEach((doc) => {
      courseList.push({ id: doc.id, ...doc.data() });
    });
    return courseList;
  } else {
    return null;
  }
}

async function doGetCourse(courseID) {
  const courseRef = doc(db, "course", courseID);
  const courseSnap = await getDoc(courseRef);

  if (courseSnap.exists()) {
    const course = courseSnap.data();
    return course;
  } else {
    return null;
  }
}

async function doAddScheduleCourse(
  courseID,
  startDay,
  week,
  startTime,
  endTime,
  couresStudentList
) {
  const generateSchedule = (startDay, week, startTime, endTime) => {
    let schedule = [];
    for (let i = 0; i < week; i++) {
      schedule.push({
        date: new Date(startDay.getTime() + i * 7 * 24 * 60 * 60 * 1000),
        startTime: startTime,
        endTime: endTime,
      });
    }
    return schedule;
  };

  const scheduleRef = collection(db, "schedule");
  const attenddanceRef = collection(db, "attendance");

  const scheduleList = generateSchedule(startDay, week, startTime, endTime);
  scheduleList.forEach(async (schedule) => {
    const scheduleQuery = await addDoc(scheduleRef, {
      courseID: courseID,
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    });

    console.log(scheduleQuery.id);

    couresStudentList.forEach(async (student) => {
      const attendanceQuery = await addDoc(attenddanceRef, {
        courseID: courseID,
        studentID: student,
        scheduleID: scheduleQuery.id,
        attended: false,
      });
      console.log(attendanceQuery);
    });
  });
}

async function doAddCourseStudent(courseID, courseStudentList) {
  const courseStudentRef = collection(db, "courseStudent");
  courseStudentList.forEach(async (student) => {
    const docRef = await addDoc(courseStudentRef, {
      courseID: courseID,
      studentID: student,
    });
    console.log(docRef);
  });
}

async function doAddRoom(room) {
  const roomRef = doc(db, "room", room);
  const roomQuery = await setDoc(roomRef, {});
  return roomQuery;
}

async function doAddCourse(course) {
  const courseRef = doc(db, "course", course.code);
  const courseQuery = await setDoc(courseRef, course);
  return courseQuery;
}

async function doAddCourseInfo(courseCode, info) {
  const infoRef = collection(db, "info");
  const infoQuery = await addDoc(infoRef, {
    courseCode: courseCode,
    title: info.title,
    content: info.content,
  });
  return infoQuery;
}

async function doUpdateCourseOnlineLink(courseCode, onlineURL) {
  const courseOnlLinkRef = doc(db, "course", courseCode);
  const courseOnlLinkQuery = await updateDoc(courseOnlLinkRef, {
    onlineURL: onlineURL,
  });
  return courseOnlLinkQuery;
}

async function doGetCourseStudentID(courseID) {
  const courseStudentRef = collection(db, "courseStudent");
  const courseStudentQuery = query(
    courseStudentRef,
    where("courseID", "==", courseID)
  );
  const courseStudentSnap = await getDocs(courseStudentQuery);
  if (courseStudentSnap.empty) {
    return null;
  } else {
    let studentIDList = [];
    courseStudentSnap.forEach((doc) => {
      studentIDList.push(doc.data().studentID);
    });
    return studentIDList;
  }
}

async function doGetStudentInfo(studentListID, courseCode) {
  const scheduleList = [];
  const studentList = [];

  if (studentListID.length === 0) {
    console.log("No student");
    return studentList;
  }

  const scheduleRef = collection(db, "schedule");
  const attendanceRef = collection(db, "attendance");
  const studentRef = collection(db, "student");

  const studentQuery = query(
    studentRef,
    where(documentId(), "in", studentListID)
  );
  const studentSnap = await getDocs(studentQuery);
  studentSnap.forEach((doc) => {
    studentList.push({ id: doc.id, name: doc.data().name });
  });

  const scheduleQuery = query(scheduleRef, where("courseID", "==", courseCode));
  const scheduleSnap = await getDocs(scheduleQuery);
  scheduleSnap.forEach((doc) => {
    scheduleList.push({ id: doc.id, ...doc.data() });
  });

  console.log("scheduleList: ", scheduleList.length);

  const studentListResult = await Promise.all(
    studentList.map(async (student) => {
      const attendanceQuery = query(
        attendanceRef,
        where("studentID", "==", student.id),
        where(
          "scheduleID",
          "in",
          scheduleList.map((schedule) => schedule.id)
        ),
        where("attended", "==", false)
      );
      const attendanceSnap = await getCountFromServer(attendanceQuery);
      let attended = scheduleList.length - attendanceSnap.data().count;
      console.log("attended: ", attended);
      return { ...student, attended: attended };
    })
  );

  return studentListResult;
}

async function doGetStudentFromParent(parentID) {
  const studentRef = collection(db, "student");
  const studentQuery = query(studentRef, where("parentID", "==", parentID));
  const studentSnap = await getDocs(studentQuery);
  if (studentSnap.empty) {
    return null;
  } else {
    let studentList = [];
    studentSnap.forEach((doc) => {
      studentList.push({ id: doc.id, ...doc.data() });
    });
    return studentList;
  }
}

export {
  doGetAuthRole,
  doAddRoom,
  doAddCourse,
  doAddCourseStudent,
  doAddScheduleCourse,
  doGetCourse,
  doGetCourseLecturer,
  doAddCourseInfo,
  doUpdateCourseOnlineLink,
  doGetCourseStudentID,
  doGetStudentInfo,
  doGetStudentFromParent,
};
