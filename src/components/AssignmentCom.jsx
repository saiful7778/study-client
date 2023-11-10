import PropTypes from "prop-types";
import convertDate from "../utility/convertDate";
import { Link } from "react-router-dom";
import useStateData from "../hooks/useStateData";

const AssignmentCom = ({ itemData }) => {
  const { handleShowModal, handleAssignmentId } = useStateData();
  const { _id, title, thumbnailUrl, level, mark, dueData, admin } =
    itemData || {};

  const { name, profile } = admin || {};
  const handleSubmit = () => {
    handleShowModal();
    handleAssignmentId(_id);
  };
  return (
    <div className="flex flex-col overflow-hidden w-full border border-primary rounded-lg bg-white shadow-md">
      <div className="relative">
        <figure className="w-full h-52 md:h-72">
          <img
            className="w-full h-full object-cover object-center"
            src={thumbnailUrl}
            alt={`${title} image`}
          />
        </figure>
        <div className="absolute bottom-0 right-0 z-20 flex items-center m-2">
          <span className="bg-white rounded-sm px-1 text-sm font-medium shadow">
            {name}
          </span>
          {profile && (
            <img
              className="w-8 h-8 rounded-full m-2 ring-2 ring-primary ring-offset-2 object-cover object-center"
              src={profile}
              alt="admin profile"
            />
          )}
        </div>
      </div>
      <div className="p-4">
        <h5 className="capitalize text-2xl font-semibold border-dashed border-b border-gray-400 mb-2 pb-2">
          {title}
        </h5>
        <div className="text-sm text-gray-600 font-medium leading-5">
          <div>
            Difficulty label:{" "}
            <span className="capitalize font-bold">{level}</span>
          </div>
          <div>
            Total marks: <span className="capitalize font-bold">{mark}</span>
          </div>
          <div>
            Due Data:{" "}
            <span className="capitalize font-bold">{convertDate(dueData)}</span>
          </div>
        </div>
        <div className="flex gap-1 mt-3 w-full">
          <Link to={`/assignments/${_id}`} className="btn btn-primary">
            view details
          </Link>
          <button
            onClick={handleSubmit}
            className="btn btn-primary btn-outline"
            type="button"
          >
            take assignment
          </button>
        </div>
      </div>
    </div>
  );
};

AssignmentCom.propTypes = {
  itemData: PropTypes.object,
};

export default AssignmentCom;
