import PropTypes from "prop-types";
import { BsTrash } from "react-icons/bs";
import { useAxios } from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const AssignmentItem = ({ itemData, setStateData }) => {
  const { userData } = useAuth();
  const { _id, title, thumbnailUrl, des, level, mark, dueData } =
    itemData || {};
  const axiosSecure = useAxios();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Loading....",
          didOpen: () => {
            Swal.showLoading();
          },
          showConfirmButton: false,
        });
        axiosSecure
          .delete(`/assignment/${_id}?email=${userData?.email}`)
          .then((res) => {
            if (res.data.deletedCount) {
              setStateData();
              Swal.fire({
                title: "Assignment has been deleted!",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Assignment has not been deleted!",
                icon: "warning",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: err,
              icon: "error",
            });
            console.error(err);
          });
      } else {
        Swal.fire({
          text: "Assignment is safe now",
          showConfirmButton: false,
          icon: "info",
        });
      }
    });
  };

  return (
    <div className="relative flex flex-col md:flex-row max-md:items-center gap-3 overflow-hidden w-full border border-primary rounded-lg bg-white shadow-md">
      <figure className="md:w-2/5 h-36">
        <img
          className="w-full h-full object-cover object-center"
          src={thumbnailUrl}
          alt={`${title} image`}
        />
      </figure>
      <div className="flex-1">
        <h5>{title}</h5>
        <p>{des}</p>
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
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <button
          onClick={handleDelete}
          className="btn btn-sm btn-error btn-square text-white"
          type="button"
        >
          <BsTrash size={20} />
        </button>
      </div>
    </div>
  );
};

AssignmentItem.propTypes = {
  itemData: PropTypes.object,
  setStateData: PropTypes.func,
};

const convertDate = (inputDate) => {
  const date = new Date(inputDate);
  return date.toLocaleDateString();
};

export default AssignmentItem;
