import { useAuth } from "../controller/authController";
import { PropTypes } from "prop-types";
import { Navigate } from "react-router-dom";

ProtectedClientPage.propTypes = {
  children: PropTypes.node,
};

export default function ProtectedClientPage({ children }) {
  const { currentUser, role } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!["lecturer", "parent", "student"].includes(role)) {
    return <Navigate to="/error" replace />;
  }

  return children;
}
