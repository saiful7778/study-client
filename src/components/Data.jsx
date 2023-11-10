import PropTypes from "prop-types";
import convertDate from "../utility/convertDate";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import sweetAlert from "../config/SweetAlart.config";
import showData from "../utility/showData";
import useStateData from "../hooks/useStateData";

const Data = ({ itemData }) => {
  const { handleRefatch } = useStateData();
  const { userData } = useAuth();
  const { title, _id, mark, level, dueData, userData: data } = itemData || {};
  const { userName, userEmail, userProfile, userUid, submittedData } =
    data || {};
  const axiosSecure = useAxiosSecure();
  const handleSubmitted = () => {
    sweetAlert
      .fire({
        title: "Add assignment mark!",
        input: "number",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "input mark";
          }
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(
              `/assignment/submit/${_id}?email=${userData?.email}&idtok=${userUid}`,
              { userEmail, mark: result.value, status: "complate" }
            )
            .then((res) => {
              if (res.data.modifiedCount) {
                sweetAlert.fire({
                  title: "Mark added!",
                  icon: "success",
                });
                handleRefatch();
              } else {
                sweetAlert.fire({
                  title: "Mark not added!",
                  icon: "error",
                });
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
  };
  const handleShowData = () => {
    sweetAlert.fire({
      html: showData({
        pdfLink: submittedData.pdfLink,
        status: submittedData.status,
        note: submittedData.note,
        mark: submittedData.mark,
      }),
    });
  };
  return (
    <div className="flex flex-col md:flex-row max-md:items-center gap-3 overflow-hidden w-full border border-primary rounded-lg bg-white shadow-md">
      <div className="flex-1 w-full p-2 relative">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium leading-5">
          <div>
            <div>
              Status:{" "}
              <span className="capitalize font-bold text-secondary">
                {submittedData.status}
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
              Due Data:{" "}
              <span className="capitalize font-bold">
                {convertDate(dueData)}
              </span>
            </div>
          </div>
          <div>
            <div>
              Candidate name:{" "}
              <span className="capitalize font-bold text-secondary">
                {userName}
              </span>
            </div>
            <div>
              Candidate email:{" "}
              <span className="capitalize font-bold">{userEmail}</span>
            </div>
            <div>
              Mark:{" "}
              <span className="capitalize font-bold">
                {submittedData.mark ? submittedData.mark : 0}
              </span>
            </div>
            {userProfile && (
              <img
                className="w-8 h-8 rounded-full m-2 ring-2 ring-primary ring-offset-2 object-cover object-center"
                src={userProfile}
                alt="admin profile"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={handleSubmitted}
            className="btn btn-sm btn-secondary"
            type="button"
          >
            add mark
          </button>
          <button
            onClick={handleShowData}
            className="btn btn-sm btn-outline btn-primary"
            type="button"
          >
            Submission
          </button>
        </div>
      </div>
    </div>
  );
};

Data.propTypes = {
  itemData: PropTypes.any,
};

export default Data;
