import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import FormComp from "../../components/FormComp";

const Update = () => {
  const { assignmentID } = useParams();
  const { userData } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [errorStatus, setErrorStatus] = useState("");
  const [assignmentData, setAssignmentData] = useState({});
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
  }, [assignmentID, userData, axiosSecure]);

  if (errorStatus) {
    return (
      <div>
        <h5 className="text-center text-3xl text-red-600">
          SomeThings went worng
        </h5>
      </div>
    );
  } else {
    return (
      <div className="md:w-4/5 w-full mx-auto bg-white p-4 rounded-md shadow-md border border-gray-300 my-20">
        {assignmentData ? <FormComp defData={assignmentData} /> : ""}
      </div>
    );
  }
};

export default Update;
