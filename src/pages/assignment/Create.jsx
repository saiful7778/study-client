/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Create = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { userData } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
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
      admin: {
        email: userData?.email,
        name: userData?.displayName,
        profile: userData?.photoURL,
      },
    };
    axiosSecure
      .post(`/assignment/new?email=${userData?.email}`, data)
      .then((res) => {
        if (res.data.success) {
          form.reset();
          swal({
            title: "Assignment created",
            icon: "success",
          });
          setSpinner(false);
          navigate(`/assignments/${res.data.itemId}`);
        }
      })
      .catch((err) => {
        swal({
          title: err,
          icon: "error",
        });
        console.error(err);
        setSpinner(false);
      });
  };
  return (
    <div className="md:w-4/5 w-full mx-auto bg-white p-4 rounded-md shadow-md border border-gray-300 my-20">
      <h4 className="text-4xl font-bold text-primary text-center mb-4">
        Create new assignment
      </h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 relative">
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="input input-bordered input-primary w-full"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              icon={<BsFillCalendarPlusFill className="mt-2 text-primary" />}
            />
          </div>
          <input
            type="number"
            placeholder="Total marks"
            name="mark"
            className="input input-bordered input-primary w-full"
            required
          />
          <input
            type="url"
            placeholder="Thumbnail url"
            name="thumbnailUrl"
            className="input input-bordered input-primary w-full"
            required
          />
          <select
            className="select select-primary w-full"
            defaultValue="medium"
            name="level"
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <textarea
          className="textarea textarea-primary"
          placeholder="Description"
          name="des"
          required
        ></textarea>
        <button className="btn btn-primary" type="submit">
          {spinner ? <span className="spinner"></span> : "create"}
        </button>
      </form>
    </div>
  );
};

export default Create;
