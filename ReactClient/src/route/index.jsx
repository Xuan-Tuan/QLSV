import LoginPage from "../page/authentication/loginPage";
import ErrorPage from "../page/authentication/errorPage";
import ProtectedAdminPage from "./protectedAdminPage";
import ProtectedClientPage from "./protectedClientPage";
// admin
import AdminPage from "../page/admin/adminPage";
import ManageLecturerPage from "../page/admin/manageLecturer/manageLecturerPage";
import ManageParentPage from "../page/admin/manageParent/manageParentPage";
import ManageStudentPage from "../page/admin/manageStudent/manageStudentPage";
import ManageRoomPage from "../page/admin/manageRoom/manageRoomPage";
import ManageCoursePage from "../page/admin/manageCourse/manageCoursePage";

import DisplayCoursePage from "../component/displayCoursePage";
// lecturer
import LecturerPage from "../page/lecturer/lecturerPage";
import LecCoursePage from "../page/lecturer/lecCoursePage";

// student
import StuListSubject from "../page/student/stuListSubject";
import StuDetailSubject from "../page/student/stuDetailSubject";
import StuNotification from "../page/student/stuNotification";
import AccountStudent from "../page/student/accountStudent";

// parent
import ParListSubject from "../page/parent/parListSubject";
import ParDetailSubject from "../page/parent/parDetailSubject";
import ParNotification from "../page/parent/parNotification";
import AccountParent from "../page/parent/accountParent";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

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
        path="/admin/manageLecturer"
        element={
          <ProtectedAdminPage>
            <ManageLecturerPage />
          </ProtectedAdminPage>
        }
      />
      <Route
        path="/admin/manageParent"
        element={
          <ProtectedAdminPage>
            <ManageParentPage />
          </ProtectedAdminPage>
        }
      />
      <Route
        path="/admin/manageStudent"
        element={
          <ProtectedAdminPage>
            <ManageStudentPage />
          </ProtectedAdminPage>
        }
      />
      <Route
        path="/admin/manageRoom"
        element={
          <ProtectedAdminPage>
            <ManageRoomPage />
          </ProtectedAdminPage>
        }
      />
      <Route
        path="/admin/manageCourse"
        element={
          <ProtectedAdminPage>
            <ManageCoursePage />
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

      {/* student */}

      <Route
        path="/student"
        element={
          <ProtectedClientPage>
            <StuListSubject />
          </ProtectedClientPage>
        }
      />
      <Route
        path="/student/listSubject"
        element={
          <ProtectedClientPage>
            <StuListSubject />
          </ProtectedClientPage>
        }
      />
      <Route
        path="/student/detailSubject/:id"
        element={
          <ProtectedClientPage>
            <StuDetailSubject />
          </ProtectedClientPage>
        }
      />
      <Route
        path="/student/notification"
        element={
          <ProtectedClientPage>
            <StuNotification />
          </ProtectedClientPage>
        }
      />
      <Route
        path="/student/account"
        element={
          <ProtectedClientPage>
            <AccountStudent />
          </ProtectedClientPage>
        }
      />

      {/* parent */}

      <Route
        path="/parent"
        element={
          <ProtectedClientPage>
            <ParListSubject />
          </ProtectedClientPage>
        }
      />

      <Route
        path="/parent/listSubject"
        element={
          <ProtectedClientPage>
            <ParListSubject />
          </ProtectedClientPage>
        }
      />

      <Route
        path="/parent/detailSubject"
        element={
          <ProtectedClientPage>
            <ParDetailSubject />
          </ProtectedClientPage>
        }
      />
      <Route
        path="/parent/notification"
        element={
          <ProtectedClientPage>
            <ParNotification />
          </ProtectedClientPage>
        }
      />
      <Route
        path="/parent/account"
        element={
          <ProtectedClientPage>
            <AccountParent />
          </ProtectedClientPage>
        }
      />

      {/* lecturer */}

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
