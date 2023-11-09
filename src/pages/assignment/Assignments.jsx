import { useLoaderData } from "react-router-dom";
import AssignmentCom from "../../components/AssignmentCom";

const Assignments = () => {
  const loaderData = useLoaderData();
  const renderData = loaderData?.data?.map((ele) => (
    <AssignmentCom itemData={ele} key={ele._id} />
  ));
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">{renderData}</div>
    </div>
  );
};

export default Assignments;
