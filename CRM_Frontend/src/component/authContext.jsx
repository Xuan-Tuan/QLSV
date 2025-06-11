import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const getAccessTokenFromLS = () =>
  localStorage.getItem("access_token") || "";

export const getProfileFromLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

export const setProfileToLS = (profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const getRoleFromLS = () => {
  return localStorage.getItem("role") || "";
};

// const initialAppContext = {
//   isAuthenticated: Boolean(getAccessTokenFromLS()),
//   setIsAuthenticated: () => null,
//   currentUser: getProfileFromLS(),
//   setCurrentUser: () => null,
// };
// export const AuthContext = createContext(initialAppContextinitialAppContext);
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getProfileFromLS());
  const [role, setRole] = useState(getRoleFromLS());

  const isAuthenticated = Boolean(getAccessTokenFromLS());

  const values = {
    currentUser,
    setCurrentUser,
    role,
    setRole,
    isAuthenticated,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
