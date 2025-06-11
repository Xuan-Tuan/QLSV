import { useContext } from "react";
import { AuthContext } from "../component/authContext";
import { API_SERVICE } from "../helpers/apiHelper";

/**
 * Custom hook để dùng AuthContext
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Gọi API đăng nhập
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{status: string, data?: any, message?: string}>}
 */
const doSignInWithEmailAndPassword = async (email, password) => {
  const result = await API_SERVICE.post("auth/login", { email, password });

  // Trả về đối tượng chứa status/data/message để LoginPage xử lý
  return result;
};

const doSignOut = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
  localStorage.removeItem("role");
};

export { useAuth, doSignInWithEmailAndPassword, doSignOut };
