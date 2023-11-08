import { Link } from "react-router-dom";
import bannerImg from "../../assets/img/undraw_educator_re_ju47.svg";

/* eslint-disable react/no-unescaped-entities */
const Banner = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-4 items-center justify-between min-h-[70vh]">
      <div className="lg:w-1/2 w-full max-lg:text-center">
        <p className="tracking-[8px] mb-1 font-medium uppercase">
          Welcome to study!
        </p>
        <h3 className="text-5xl lg:text-7xl font-bold">
          Your <span className="text-blue-600">Ultimate</span>
        </h3>
        <h3 className="text-5xl lg:text-7xl font-bold">
          Study Hub<span className="text-red-500">!</span>
        </h3>
        <p className="my-3 max-lg:mx-auto max-w-lg text-sm text-gray-600">
          Unlock the power of collaborative learning! Join 'study' and connect
          with students to study smarter, work on assignments, and excel
          together.
        </p>
        <Link className="btn btn-sm btn-primary m-1" to="/register">
          register now
        </Link>
        <Link className="btn btn-sm btn-outline btn-primary m-1" to="/register">
          take an assignment
        </Link>
      </div>
      <div className="flex-1">
        <figure className="max-w-[550px] ml-auto">
          <img src={bannerImg} alt="" />
        </figure>
      </div>
    </div>
  );
};

export default Banner;
