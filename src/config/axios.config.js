import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

export default axiosConfig;
