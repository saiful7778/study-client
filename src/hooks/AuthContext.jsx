import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { auth } from "../firebase";
import { useAxios } from "./useAxiosSecure";

export const AuthData = createContext(null);

const AuthContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(true);
  const axiosSecure = useAxios();
  const googleAuth = () => {
    setLoader(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const signUp = (email, pass) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const signIn = (email, pass) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const logout = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || userData?.email;
      const loggedUser = { email: userEmail };
      setLoader(false);
      setUserData(currentUser);
      if (currentUser) {
        axiosSecure
          .post("/jwtauth", loggedUser)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        axiosSecure
          .post("/jwtauth/logout", loggedUser)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const authInfo = { userData, signUp, signIn, logout, loader, googleAuth };
  return <AuthData.Provider value={authInfo}>{children}</AuthData.Provider>;
};

AuthContext.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
