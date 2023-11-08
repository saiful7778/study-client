import { useEffect, useState } from "react";
import axiosConfig from "../config/axios.config";

const useGetData = (inputUrl) => {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    // axiosConfig.interceptors.response.use(
    //   (res) => {},
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    axiosConfig(inputUrl)
      .then((res) => setApiData(res.data))
      .catch((err) => console.error(err));
  }, [inputUrl]);
  return apiData;
};

export default useGetData;
