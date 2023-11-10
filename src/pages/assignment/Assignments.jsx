import AssignmentCom from "../../components/AssignmentCom";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CiFilter } from "react-icons/ci";
import Nodata from "../../components/Nodata";
import PropTypes from "prop-types";

const Assignments = () => {
  const defaultLevel = "easy";
  const defaultItemPerPage = 6;

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemPerPage);

  const [serverData, setServerData] = useState([]);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState(defaultLevel);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    (async () => {
      const res = await axiosSecure.get(
        `/assignments?page=${currentPage}&size=${itemsPerPage}${query}`
      );
      setServerData(res.data);
      setTotalItems(res.data?.count);
    })();
  }, [axiosSecure, query, currentPage, itemsPerPage]);

  const numberOfPage = Math.ceil(totalItems / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const renderData = serverData?.result?.map((ele) => (
    <AssignmentCom itemData={ele} key={ele._id} />
  ));

  const handleFilter = () => {
    setQuery(`&level=${level}`);
  };

  const handlePagination = (data) => {
    setCurrentPage(data);
  };

  const handleItemPerPage = (e) => {
    setItemsPerPage(parseFloat(e.target.value));
    setCurrentPage(0);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prop) => prop - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prop) => prop + 1);
    }
  };

  return (
    <>
      <div className="flex justify-end my-4 gap-2">
        <select
          title="item per page"
          onChange={handleItemPerPage}
          className="select select-bordered select-primary select-sm focus:outline-dashed"
          defaultValue={defaultItemPerPage}
        >
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <select
          title="Difficulty label"
          onChange={(e) => setLevel(e.target.value)}
          className="select select-bordered select-primary select-sm focus:outline-dashed"
          defaultValue={defaultLevel}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          title="apply filter"
          onClick={handleFilter}
          className="btn btn-outline btn-primary btn-sm"
          type="button"
        >
          <CiFilter size={18} strokeWidth={0.5} />
          filter
        </button>
        <button
          title="get all"
          onClick={() => setQuery("")}
          className="btn btn-primary btn-sm"
          type="button"
        >
          all
        </button>
      </div>
      {serverData?.result?.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {renderData}
        </div>
      ) : (
        <Nodata />
      )}
      <div className="flex flex-col items-center justify-center gap-2 my-6">
        <div className="join">
          <button
            onClick={handlePrev}
            className="join-item btn btn-primary btn-outline btn-sm"
            type="button"
          >
            prev
          </button>
          {pages.map((ele, idx) => (
            <Pagination
              key={"pg" + idx}
              currentPage={currentPage}
              handlePagination={handlePagination}
              ele={ele}
              idx={idx}
            />
          ))}
          <button
            onClick={handleNext}
            className="join-item btn btn-primary btn-outline btn-sm"
            type="button"
          >
            next
          </button>
        </div>
        <div>Current page: {currentPage + 1}</div>
      </div>
    </>
  );
};

const Pagination = ({ currentPage, handlePagination, idx, ele }) => {
  const isActive = currentPage === idx;
  return (
    <button
      onClick={() => handlePagination(ele)}
      key={"pg" + idx}
      className={`join-item btn btn-primary btn-outline btn-sm ${
        isActive ? "btn-active" : ""
      }`}
    >
      {ele + 1}
    </button>
  );
};

Pagination.propTypes = {
  handlePagination: PropTypes.func,
  currentPage: PropTypes.number,
  idx: PropTypes.number,
  ele: PropTypes.number,
};

export default Assignments;
