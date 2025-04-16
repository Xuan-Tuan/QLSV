import { useContext } from "react";
import { AuthContext } from "../component/authContext";
import { API_SERVICE } from "../helpers/apiHelper";

const useAuth = () => {
  return useContext(AuthContext);
};

const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await API_SERVICE.post("auth/login", { email, password });
    return res;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// const doSignOut = () => {
//   localStorage.clear();
// };

const doSignOut = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
  localStorage.removeItem("role");
};

export { doSignInWithEmailAndPassword, doSignOut, useAuth };
