import { useContext } from "react";
import { ContextData } from "./SharedData";

const useStateData = () => {
  return useContext(ContextData);
};

export default useStateData;
