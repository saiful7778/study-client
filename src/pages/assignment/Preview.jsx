import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxiosSecure";
import convertDate from "../../utility/convertDate";

const Preview = () => {
  const { userData } = useAuth();
  const { assignmentID } = useParams();
  const axiosSecure = useAxios();
  const [errorStatus, setErrorStatus] = useState("");
  const [assignmentData, setAssignmentData] = useState({});
  useEffect(() => {
    if (userData?.email) {
      axiosSecure
        .get(`/assignment/${assignmentID}?email=${userData?.email}`)
        .then((res) => setAssignmentData(res.data))
        .catch((err) => {
          setErrorStatus(err);
          console.error(err);
        });
    }
  }, [userData, assignmentID, axiosSecure]);

  if (errorStatus) {
    return (
      <div>
        <h5 className="text-center text-3xl text-red-600">
          SomeThings went worng
        </h5>
      </div>
    );
  } else {
    const { thumbnailUrl, title, des, dueData, level, mark, admin } =
      assignmentData || {};
    const { name, profile } = admin || {};
    return (
      <div className="flex md:flex-row flex-col gap-2">
        <div className="md:w-1/2 w-full">
          <figure className="relative">
            <img
              className="object-cover object-center"
              src={thumbnailUrl}
              alt="thumbnail"
            />
            <div className="absolute top-0 right-0 z-20 flex items-center">
              <span className="bg-white rounded-sm px-1 text-sm font-medium shadow">
                {name}
              </span>
              {profile && (
                <img
                  className="w-10 h-10 rounded-full m-2 ring-2 ring-primary ring-offset-2 object-cover object-center"
                  src={profile}
                  alt="admin profile"
                />
              )}
            </div>
          </figure>
          <button
            className="btn btn-primary btn-outline btn-block mt-4"
            type="button"
          >
            submit
          </button>
        </div>
        <div className="md:w-1/2 w-full">
          <h2 className="capitalize text-2xl font-semibold">{title}</h2>
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
              <span className="capitalize font-bold">
                {convertDate(dueData)}
              </span>
            </div>
            <div>
              Admin: <span className="font-bold">{name}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            <span className="font-bold">Description:</span> {des}
          </p>
        </div>
      </div>
    );
  }
};

export default Preview;
