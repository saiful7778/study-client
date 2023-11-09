import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxiosSecure";
import AssignmentItem from "../../components/AssignmentItem";

const Own = () => {
  const { userData } = useAuth();
  const axiosSecure = useAxios();
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
    <div className="grid grid-cols-2 gap-4">
      {serverData?.length ? <>{renderOwnItem}</> : <p>no data found</p>}
    </div>
  );
};

export default Own;
