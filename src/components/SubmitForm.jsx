import { useState } from "react";
import useStateData from "../hooks/useStateData";
import { RxCrossCircled } from "react-icons/rx";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import sweetAlert from "../config/SweetAlart.config";

const SubmitForm = () => {
  const navigate = useNavigate();
  const { handleShowModal, assignmentID } = useStateData();
  const { userData } = useAuth();
  const [spinner, setSpinner] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    const form = e.target;
    if (!userData) {
      navigate("/login");
      form.reset();
      handleShowModal();
      return;
    }
    const pdfLink = form.pefLink.value;
    const note = form.note.value;
    const data = {
      assignmentID,
      userEmail: userData?.email,
      userUid: userData?.uid,
      userProfile: userData?.photoURL,
      submittedData: {
        pdfLink,
        note,
      },
    };
    axiosSecure
      .post(`/assignment/submit?email=${userData?.email}`, data)
      .then((res) => {
        if (res.data.success) {
          sweetAlert.fire({
            title: "Assignment submitted!",
            icon: "success",
          });
        } else {
          sweetAlert.fire({
            title: "Assignment has not submitted!",
            icon: "warning",
          });
        }
        form.reset();
        setSpinner(false);
      })
      .catch((err) => {
        if (err?.response?.data) {
          sweetAlert.fire({
            title: err.response.data,
            icon: "error",
          });
          form.reset();
        }
        console.error(err);
        setSpinner(false);
      });
  };
  return (
    <div className="w-full min-h-screen fixed left-0 top-0 z-[1000] bg-[#00000090] flex justify-center items-center">
      <div className="p-6 md:w-4/5 m-1 relative rounded bg-white shadow-md">
        <h4 className="text-3xl mb-4 font-semibold text-center">
          Submit assignment
        </h4>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 md:w-1/2 mx-auto"
        >
          <input
            className="input input-bordered input-primary w-full"
            type="url"
            name="pefLink"
            placeholder="PDF link"
            required
          />
          <textarea
            className="textarea textarea-primary w-full md:h-52"
            name="note"
            placeholder="Assignment notes"
            required
          ></textarea>
          <button className="btn btn-primary" type="submit">
            {spinner ? <span className="spinner"></span> : "submit assignment"}
          </button>
        </form>
        <div className="absolute top-0 right-0 m-1">
          <button
            className="btn btn-warning btn-square btn-sm"
            onClick={handleShowModal}
            type="button"
          >
            <RxCrossCircled size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;
