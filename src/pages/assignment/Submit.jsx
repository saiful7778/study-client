import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Submit = () => {
  const { userData } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [errorStatus, setErrorStatus] = useState("");
  const [submitedData, setSubmitedData] = useState([]);
  useEffect(() => {
    if (userData?.email) {
      axiosSecure
        .get(
          `/assignment/submit?email=${userData?.email}&idtok=${userData?.uid}`
        )
        .then((res) => setSubmitedData(res.data))
        .catch((err) => {
          setErrorStatus(err);
          console.error(err);
        });
    }
  }, [axiosSecure, userData]);

  if (errorStatus) {
    return (
      <div>
        <h5 className="text-center text-3xl text-red-600">
          SomeThings went worng
        </h5>
      </div>
    );
  } else {
    const { submission } = submitedData || {};
    const renderSubmission = submission?.map((ele) => console.log(ele));
  }
};

export default Submit;
