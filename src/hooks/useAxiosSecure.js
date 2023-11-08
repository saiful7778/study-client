import { useEffect } from "react";
import axiosConfig from "../config/axios.config";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosConfig.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          logout()
            .then(() => {
              navigate("/login");
            })
            .catch((err) => console.error(err));
        }
      }
    );
  }, []);
  return axiosConfig;
};

export const useAxios = () => {
  return axiosConfig;
};

export default useAxiosSecure;
