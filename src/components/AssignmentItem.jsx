import PropTypes from "prop-types";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import convertDate from "../utility/convertDate";
import { Link } from "react-router-dom";
import sweetAlert from "../config/SweetAlart.config";

const AssignmentItem = ({ itemData, setStateData }) => {
  const { userData } = useAuth();
  const { _id, title, thumbnailUrl, level, mark, dueData } = itemData || {};
  const axiosSecure = useAxiosSecure();

  const handleDelete = () => {
    sweetAlert
      .fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          sweetAlert.fire({
            title: "Loading....",
            didOpen: () => {
              sweetAlert.showLoading();
            },
            showConfirmButton: false,
          });
          axiosSecure
            .delete(`/assignment/delete/${_id}?email=${userData?.email}`)
            .then((res) => {
              if (res.data.deletedCount) {
                setStateData();
                sweetAlert.fire({
                  title: "Assignment has been deleted!",
                  icon: "success",
                });
              } else {
                sweetAlert.fire({
                  title: "Assignment has not been deleted!",
                  icon: "warning",
                });
              }
            })
            .catch((err) => {
              sweetAlert.fire({
                title: err,
                icon: "error",
              });
              console.error(err);
            });
        } else {
          sweetAlert.fire({
            text: "Assignment is safe now",
            showConfirmButton: false,
            icon: "info",
          });
        }
      });
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
        <Link
          to={`/assignments/${_id}`}
          className="btn btn-sm btn-primary mt-2"
          type="button"
        >
          view details
        </Link>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <Link
            to={`/assignments/update/${_id}`}
            className="btn btn-sm btn-primary btn-square"
            type="button"
          >
            <FiEdit size={20} />
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-error btn-square text-white"
            type="button"
          >
            <BsTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

AssignmentItem.propTypes = {
  itemData: PropTypes.object,
  setStateData: PropTypes.func,
};

export default AssignmentItem;
