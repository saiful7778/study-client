import { AiOutlineGoogle } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthCom = ({ prevPage }) => {
  const { googleAuth } = useAuth();
  const navigate = useNavigate();
  const handleGoogleAuth = () => {
    googleAuth()
      .then(() => navigate(prevPage ? prevPage : "/"))
      .catch((err) => console.error(err));
  };
  return (
    <div className="flex items-center gap-2 justify-center flex-wrap mt-4">
      <button
        onClick={handleGoogleAuth}
        type="button"
        className="flex gap-2 items-center px-4 py-2 rounded-md bg-white shadow-md border border-green-600 text-green-600 divide-x divide-green-600"
      >
        <AiOutlineGoogle size={25} />
        <span className="font-bold text-lg pl-2">Google</span>
      </button>
    </div>
  );
};

AuthCom.propTypes = {
  prevPage: PropTypes.string,
};

export default AuthCom;
