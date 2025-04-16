import { useContext } from "react";
import { AuthContext } from "../component/authContext";
import { API_SERVICE } from "../helpers/apiHelper";

const useAuth = () => {
  return useContext(AuthContext);
};

const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    return await API_SERVICE.post("auth/login");
    if (res?.status == "success") {
      setCurrentUser(res?.data?.profile);
    }
    return res;
  } catch (error) {
    console.error(error);
  }
  //   return setPersistence(auth, browserSessionPersistence)
  //     .then(() => {
  //       return signInWithEmailAndPassword(auth, email, password);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
};

const doSignOut = () => {
  localStorage.clear();

  //   return signOut(auth);
};

export { doSignInWithEmailAndPassword, doSignOut, useAuth };
