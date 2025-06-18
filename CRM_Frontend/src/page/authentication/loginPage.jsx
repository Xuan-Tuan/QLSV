import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignOut,
} from "../../controller/authController";
import Logo from "../../assets/LOGO.png";
import { AuthContext } from "../../component/authContext";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser, setRole } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    doSignOut();
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile");
    localStorage.removeItem("role");
    setCurrentUser(null);
  }, [setCurrentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await doSignInWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password
      );
      if (response?.status === "success" && response?.data) {
        const { token, profile, role } = response.data;
        const allowedRoles = ["student", "admin", "lecturer", "parent"];
        if (!allowedRoles.includes(role)) {
          toast.error(
            "Phân quyền tài khoản không hợp lệ. Vui lòng liên hệ quản trị viên."
          );
          return;
        }
        localStorage.setItem("access_token", token);
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("role", role);
        setCurrentUser(profile);
        setRole(role);
        navigate(`/${role}`);
      } else {
        toast.error(
          "Thông tin đăng nhập không đúng. Vui lòng nhập đúng thông tin tài khoản."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-indigo-200 to-purple-100 transition-all">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 animate-fade-in-up">
        <div className="flex flex-col items-center">
          <img className="w-24 mb-4" src={Logo} alt="LOGO" />
          <h2 className="text-2xl font-bold text-indigo-800 text-center leading-snug">
            HỆ THỐNG
            <br />
            QUẢN LÝ SINH VIÊN
          </h2>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={userCredentials.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={userCredentials.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center px-4 py-2 text-white font-semibold rounded-md transition-all duration-200 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Đang đăng nhập...
              </span>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
