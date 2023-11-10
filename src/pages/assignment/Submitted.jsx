import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SubmittedItem from "../../components/SubmittedItem";
import useStateData from "../../hooks/useStateData";
import Nodata from "../../components/Nodata";

const Submitted = () => {
  const { reFatch } = useStateData();
  const { userData } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [errorStatus, setErrorStatus] = useState("");
  const [submitedData, setSubmitedData] = useState([]);
  useEffect(() => {
    if (userData?.email) {
      axiosSecure
        .get(`/assignment/submitted?email=${userData?.email}`)
        .then((res) => {
          setSubmitedData(res.data);
        })
        .catch((err) => {
          setErrorStatus(err);
          console.error(err);
        });
    }
  }, [axiosSecure, userData, reFatch]);

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
      <SubmittedItem key={ele._id} itemData={ele} />
    ));
    return (
      <>
        {submitedData?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {renderSubmission}
          </div>
        ) : (
          <Nodata />
        )}
      </>
    );
  }
};

export default Submitted;
