import { useState, useEffect, createContext, useCallback } from "react";
import { PropTypes } from "prop-types";
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
const initialAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  currentUser: getProfileFromLS(),
  setCurrentUser: () => null,
};
export const AuthContext = createContext(initialAppContext);

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getProfileFromLS());
  const [role, setRole] = useState(getRoleFromLS());
  const [pending, setPending] = useState(false);

  const values = {
    currentUser,
    setCurrentUser,
    setRole,
    role,
  };

  return (
    <>
      <AuthContext.Provider value={values}>
        {!pending && children}
      </AuthContext.Provider>
    </>
  );
}
