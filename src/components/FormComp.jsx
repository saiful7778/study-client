import PropTypes from "prop-types";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import sweetAlert from "../config/SweetAlart.config";

const FormComp = ({ defData }) => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { _id, thumbnailUrl, title, des, dueData, level, mark } = defData || {};
  const [startDate, setStartDate] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (dueData) {
      setStartDate(new Date(dueData));
    }
  }, [dueData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    const form = e.target;
    const title = form.title.value;
    const mark = form.mark.value;
    const thumbnailUrl = form.thumbnailUrl.value;
    const level = form.level.value;
    const des = form.des.value;
    const data = {
      title,
      mark,
      thumbnailUrl,
      level,
      des,
      dueData: startDate,
    };
    axiosSecure
      .patch(`/assignment/update/${_id}?email=${userData?.email}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          sweetAlert
            .fire({
              title: "Assignment is updated!",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "View details",
            })
            .then((result) => {
              if (result.isConfirmed) {
                navigate(`/assignments/${_id}`);
              }
            });
          setSpinner(false);
        } else {
          sweetAlert.fire({
            title: "Error",
            icon: "error",
          });
          setSpinner(false);
        }
      })
      .catch((err) => {
        sweetAlert.fire({
          text: err,
          icon: "error",
        });
        console.error(err);
        setSpinner(false);
      });
  };
  return (
    <>
      <h4 className="text-4xl font-bold text-primary text-center mb-4">
        Update assignment
      </h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 relative">
        <input
          type="text"
          placeholder="Title"
          name="title"
          defaultValue={title}
          className="input input-bordered input-primary w-full"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(e) => setStartDate(e)}
              icon={<BsFillCalendarPlusFill className="mt-2 text-primary" />}
            />
          </div>
          <input
            type="number"
            placeholder="Total marks"
            name="mark"
            defaultValue={mark}
            className="input input-bordered input-primary w-full"
            required
          />
          <input
            type="url"
            placeholder="Thumbnail url"
            name="thumbnailUrl"
            defaultValue={thumbnailUrl}
            className="input input-bordered input-primary w-full"
            required
          />
          <select
            className="select select-primary w-full"
            defaultValue={level}
            name="level"
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <textarea
          className="textarea textarea-primary h-48"
          placeholder="Description"
          name="des"
          defaultValue={des}
          required
        ></textarea>
        <button className="btn btn-primary" type="submit">
          {spinner ? <span className="spinner"></span> : "update"}
        </button>
      </form>
    </>
  );
};

FormComp.propTypes = {
  defData: PropTypes.object,
};

export default FormComp;
