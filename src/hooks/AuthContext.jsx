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

export const AuthData = createContext(null);

const AuthContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(true);
  const googleAuth = () => {
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
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoader(false);
      setUserData(currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const authInfo = { userData, signUp, signIn, signOut, loader, googleAuth };
  return <AuthData.Provider value={authInfo}>{children}</AuthData.Provider>;
};

AuthContext.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
