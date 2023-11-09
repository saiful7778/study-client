import { useLoaderData } from "react-router-dom";
import AssignmentCom from "../../components/AssignmentCom";

const Assignments = () => {
  const loaderData = useLoaderData();
  const renderData = loaderData?.data?.map((ele) => (
    <AssignmentCom itemData={ele} key={ele._id} />
  ));
  return (
    <>
      {loaderData?.data?.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
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
