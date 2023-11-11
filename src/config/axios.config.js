import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:5001",
  // baseURL: "https://study-server-nolhsgc8e-saiful7778.vercel.app",
  withCredentials: true,
});

export default axiosConfig;
