import { PropTypes } from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";

ProtectedAdminPage.propTypes = {
  children: PropTypes.node,
};

export default function ProtectedAdminPage({ children }) {
  const { currentUser, role } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/error" replace />;
  }

  return children;
}
