import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AssignmentItem from "../../components/AssignmentItem";

const Own = () => {
  const { userData } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [serverData, setServerData] = useState([]);
  useEffect(() => {
    if (userData?.email) {
      axiosSecure
        .get(`/assignment/own?email=${userData?.email}`)
        .then((res) => {
          if (res?.data) {
            setServerData(res?.data);
          }
        });
    }
  }, [axiosSecure, userData]);

  const handleDelete = (itemId) => {
    const reamin = serverData?.filter((ele) => ele._id !== itemId);
    setServerData(reamin);
  };

  const renderOwnItem = serverData?.map((ele) => (
    <AssignmentItem
      itemData={ele}
      key={ele._id}
      setStateData={() => handleDelete(ele._id)}
    />
  ));
  return (
    <>
      {serverData?.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {renderOwnItem}
        </div>
      ) : (
        <div className="text-center text-xl text-red-600 font-semibold my-10">
          No data found!
        </div>
      )}
    </>
  );
};

export default Own;
