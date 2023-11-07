import { useContext } from "react";
import { AuthData } from "./AuthContext";

const useAuth = () => {
  return useContext(AuthData);
};

export default useAuth;
