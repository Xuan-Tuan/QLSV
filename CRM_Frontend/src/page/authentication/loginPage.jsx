import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignOut,
} from "../../controller/authController";
import Logo from "../../assets/LOGO.png";
import { AuthContext } from "../../component/authContext";

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
          alert(
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
        alert(
          "Thông tin đăng nhập không đúng. Vui lòng nhập đúng thông tin tài khoản."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container h-auto lg:w-2/6 lg:auto my-8 mx-auto px-12 py-12 flex flex-col justify-center border-4 rounded-3xl  bg-white shadow-md">
        <div className=" flex justify-evenly item-center sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <img className="mt-2 w-20" src={Logo} alt="LOGO" />
          </div>
          <h2 className=" mt-2 text-center text-lg lg:text-2xl font-bold leading-9 tracking-tight text-blue-900">
            HỆ THỐNG <br />
            QUẢN LÝ SINH VIÊN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userCredentials.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mật khẩu
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={userCredentials.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-500"
                }`}
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
