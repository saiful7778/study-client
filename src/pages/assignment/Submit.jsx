import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SubmittedComp from "../../components/SubmittedComp";

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
    const renderSubmission = submitedData?.map((ele) => (
      <SubmittedComp key={ele._id} itemData={ele} />
    ));

    return (
      <>
        {submitedData?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {renderSubmission}
          </div>
        ) : (
          <div className="text-center text-xl text-red-600 font-semibold my-10">
            No data found!
          </div>
        )}
      </>
    );
  }
};

export default Submit;
