import AssignmentCom from "../../components/AssignmentCom";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CiFilter } from "react-icons/ci";
import Nodata from "../../components/Nodata";

const Assignments = () => {
  const defaultLevel = "easy";
  const [serverData, setServerData] = useState([]);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState(defaultLevel);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    (async () => {
      const res = await axiosSecure.get(`/assignments${query}`);
      setServerData(res.data);
    })();
  }, [axiosSecure, query]);
  const renderData = serverData?.map((ele) => (
    <AssignmentCom itemData={ele} key={ele._id} />
  ));

  const handleFilter = () => {
    setQuery(`/q?level=${level}`);
  };

  return (
    <>
      <div className="flex justify-end my-4 gap-2">
        <select
          onChange={(e) => setLevel(e.target.value)}
          className="select select-bordered select-primary select-sm focus:outline-dashed"
          defaultValue={defaultLevel}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={handleFilter}
          className="btn btn-outline btn-primary btn-sm"
          type="button"
        >
          <CiFilter size={18} strokeWidth={0.5} />
          filter
        </button>
      </div>
      {serverData?.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {renderData}
        </div>
      ) : (
        <Nodata />
      )}
    </>
  );
};

export default Assignments;
