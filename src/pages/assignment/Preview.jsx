import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Preview = () => {
  const { userData } = useAuth();
  const { assignmentID } = useParams();
  const axiosSecure = useAxiosSecure();
  const [assignmentData, setAssignmentData] = useState([]);
  useEffect(() => {
    if (userData?.email) {
      axiosSecure
        .get(`/assignment/${assignmentID}?email=${userData?.email}`)
        .then((res) => setAssignmentData(res.data))
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userData, assignmentID, axiosSecure]);
  console.log(assignmentData);
  return <div>Preview</div>;
};

export default Preview;
