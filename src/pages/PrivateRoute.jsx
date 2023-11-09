import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { userData, loader } = useAuth();
  if (loader) {
    return <Loader />;
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
