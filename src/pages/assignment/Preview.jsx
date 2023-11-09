import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxiosSecure";

const Preview = () => {
  const { userData, logout } = useAuth();
  const { assignmentID } = useParams();
  const axiosSecure = useAxios();
  const [errorStatus, setErrorStatus] = useState("");
  const [assignmentData, setAssignmentData] = useState([]);
  useEffect(() => {
    if (userData?.email) {
      axiosSecure
        .get(`/assignment/${assignmentID}?email=${userData?.email}`)
        .then((res) => setAssignmentData(res.data))
        .catch((err) => {
          setErrorStatus(err);
          console.error(err);
        });
    }
  }, [userData, assignmentID, axiosSecure, logout]);
  if (!errorStatus) {
    console.log(assignmentData);
  } else {
    console.log(errorStatus);
  }
  return <div>Preview</div>;
};

export default Preview;
