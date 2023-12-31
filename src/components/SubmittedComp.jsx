import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import convertDate from "../utility/convertDate";
import sweetAlert from "../config/SweetAlart.config";
import showData from "../utility/showData";

const SubmittedComp = ({ itemData }) => {
  const { thumbnailUrl, title, _id, mark, level, dueData, submission } =
    itemData || {};
  const handleSubmitted = () => {
    sweetAlert.fire({
      html: showData(submission.submittedData),
    });
    // axiosSecure
    //   .get(
    //     `/assignment/submit/${_id}?email=${userData?.email}&idtok=${userData?.uid}`
    //   )
    //   .then((res) => {
    //     sweetAlert.fire({
    //       html: showData(res.data),
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };
  return (
    <div className="flex flex-col md:flex-row max-md:items-center gap-3 overflow-hidden w-full border border-primary rounded-lg bg-white shadow-md">
      <figure className="md:w-2/5 h-44">
        <img
          className="w-full h-full object-cover object-center"
          src={thumbnailUrl}
          alt={`${title} image`}
        />
      </figure>
      <div className="flex-1 w-full p-2 relative">
        <h5 className="text-xl font-semibold">{title}</h5>
        <div className="text-sm text-gray-600 font-medium leading-5">
          <div>
            Status:{" "}
            <span className="capitalize font-bold text-secondary">
              {submission.submittedData.status}
            </span>
          </div>
          <div>
            Difficulty label:{" "}
            <span className="capitalize font-bold">{level}</span>
          </div>
          <div>
            Total marks: <span className="capitalize font-bold">{mark}</span>
          </div>
          <div>
            My marks:{" "}
            <span className="capitalize font-bold">
              {submission.submittedData.mark
                ? submission.submittedData.mark
                : 0}
            </span>
          </div>
          <div>
            Due Data:{" "}
            <span className="capitalize font-bold">{convertDate(dueData)}</span>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2 mt-2">
          <Link
            to={`/assignments/${_id}`}
            className="btn btn-sm btn-primary"
            type="button"
          >
            view details
          </Link>
          <button
            onClick={handleSubmitted}
            className="btn btn-sm btn-outline btn-secondary"
            type="button"
          >
            submitted data
          </button>
        </div>
      </div>
    </div>
  );
};

SubmittedComp.propTypes = {
  itemData: PropTypes.object,
};

export default SubmittedComp;
