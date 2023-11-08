import { AiOutlineGoogle } from "react-icons/ai";
import useAuth from "../hooks/useAuth";

const AuthCom = () => {
  const { googleAuth } = useAuth();
  return (
    <div className="flex items-center gap-2 justify-center flex-wrap mt-4">
      <button
        onClick={googleAuth}
        type="button"
        className="flex gap-2 items-center px-4 py-2 rounded-md bg-white shadow-md border border-green-600 text-green-600 divide-x divide-green-600"
      >
        <AiOutlineGoogle size={25} />
        <span className="font-bold text-lg pl-2">Google</span>
      </button>
    </div>
  );
};

export default AuthCom;
