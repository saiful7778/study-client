import PropTypes from "prop-types";
import convertDate from "../utility/convertDate";

const AssignmentCom = ({ itemData }) => {
  const { _id, title, thumbnailUrl, des, level, mark, dueData } =
    itemData || {};
  return (
    <div className="flex flex-col overflow-hidden w-full border border-primary rounded-lg bg-white shadow-md">
      <figure className="w-full h-72">
        <img
          className="w-full h-full object-cover object-center"
          src={thumbnailUrl}
          alt={`${title} image`}
        />
      </figure>
      <div className="p-4">
        <h5 className="capitalize text-2xl font-semibold">{title}</h5>
        <p className="my-1 text-sm text-gray-600 font-medium">{des}</p>
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
          <button className="btn btn-primary" type="button">
            view details
          </button>
          <button className="btn btn-primary btn-outline" type="button">
            submit
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
