import LoginPage from "../page/authentication/loginPage";
import ErrorPage from "../component/errorPage";
import ProtectedAdminPage from "../component/protectedAdminPage";
import ProtectedClientPage from "../component/protectedClientPage";
import ManageRoomPage from "../component/manageRoomPage";
import AddCoursePage from "../component/addCoursePage";
import DisplayCoursePage from "../component/displayCoursePage";
import { LecCoursePage } from "../component/lecCoursePage";

import AdminPage from "../component/adminPage";
import StudentPage from "../component/studentPage";
import ParentPage from "../component/parentPage";
import LecturerPage from "../component/lecturerPage";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import AddLecturerPage from "../component/addLecturerPage";
import AddParentPage from "../component/addParentPage";
import AddStudentPage from "../component/addStudentPage";

export const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminPage>
            <AdminPage />
          </ProtectedAdminPage>
        }
      />
      <Route
        path="/admin/addLecturer"
        element={
          <ProtectedAdminPage>
            <AddLecturerPage />
          </ProtectedAdminPage>
        }
      />
      <Route
        path="/admin/addParent"
        element={
          <ProtectedAdminPage>
            <AddParentPage />
          </ProtectedAdminPage>
        }
      />
      <Route
        path="/admin/addStudent"
        element={
          <ProtectedAdminPage>
            <AddStudentPage />
          </ProtectedAdminPage>
        }
      />
      <Route
        path="/admin/addRoom"
        element={
          <ProtectedAdminPage>
            <AddRoomPage />
          </ProtectedAdminPage>
        }
      />
      <Route
        path="/admin/addCourse"
        element={
          <ProtectedAdminPage>
            <AddCoursePage />
          </ProtectedAdminPage>
        }
      />
      <Route
        path="/admin/displayCourse/:courseCode"
        element={
          <ProtectedAdminPage>
            <DisplayCoursePage />
          </ProtectedAdminPage>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedClientPage>
            <StudentPage />
          </ProtectedClientPage>
        }
      />
      <Route
        path="/parent"
        element={
          <ProtectedClientPage>
            <ParentPage />
          </ProtectedClientPage>
        }
      />
      <Route
        path="/lecturer"
        element={
          <ProtectedClientPage>
            <LecturerPage />
          </ProtectedClientPage>
        }
      />
      <Route
        path="/lecturer/course/:courseCode"
        element={
          <ProtectedClientPage>
            <LecCoursePage />
          </ProtectedClientPage>
        }
      />
    </Route>
  )
);
