import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../authContext/authContext";

const useAuth = () => {
  return useContext(AuthContext);
};

const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const doSignOut = () => {
  return signOut(auth);
};

export { doSignInWithEmailAndPassword, doSignOut, useAuth };
