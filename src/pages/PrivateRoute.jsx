import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import spinner from "../assets/img/Animation - 1699411161636.gif";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { userData, loader } = useAuth();
  if (loader) {
    return (
      <div className="w-full min-h-[50vh] flex justify-center items-center">
        <img className="w-20" src={spinner} alt="loading spinner" />
      </div>
    );
  }
  if (userData) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
