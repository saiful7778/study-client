import AssignmentCom from "../../components/AssignmentCom";
import { useState, useEffect } from "react";
import { useAxios } from "../../hooks/useAxiosSecure";

const Assignments = () => {
  const [serverData, setServerData] = useState([]);
  const axiosSecure = useAxios();
  useEffect(() => {
    (async () => {
      const res = await axiosSecure.get("/assignments");
      setServerData(res.data);
    })();
  }, [axiosSecure]);
  const renderData = serverData?.map((ele) => (
    <AssignmentCom itemData={ele} key={ele._id} />
  ));
  return (
    <>
      {serverData?.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {renderData}
        </div>
      ) : (
        <div className="text-center text-xl text-red-600 font-semibold my-10">
          No data found!
        </div>
      )}
    </>
  );
};

export default Assignments;
