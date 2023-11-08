/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import useInputValue from "../hooks/useInputValue";
import useAuth from "../hooks/useAuth";
import checkPass from "../utility/checkPass";
import swal from "sweetalert";
import axios from "axios";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { signIn } = useAuth();
  const [spinner, setSpinner] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const email = useInputValue("");
  const pass = useInputValue("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorStatus("");
    setSpinner(true);

    if (!checkPass(pass.value)) {
      setErrorStatus(
        "Password must required: Minimum 6 characters. Capital letter. Special character."
      );
      setSpinner(false);
      return;
    }

    signIn(email.value, pass.value)
      .then((result) => {
        console.log(result);
        // swal({
        //   title: "Successfully login!",
        //   text: `${result.user.displayName}, is now loged in!`,
        //   icon: "success",
        // });
        // const user = { email: email.value };
        // axios
        //   .post("http://localhost:5001/jwt", user, { withCredentials: true })
        //   .then((res) => {
        //     console.log(res.data);
        //     if (res.data.success) {
        //       if (location.state) {
        //         navigate(location.state);
        //       } else {
        //         navigate("/");
        //       }
        //       setErrorStatus("");
        //       setSpinner(false);
        //     }
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
        // if (location.state) {
        //     navigate(location.state);
        //   } else {
        //     navigate("/");
        //   }
      })
      .catch((err) => {
        swal({
          title: err.code,
          icon: "error",
        });
        console.log(err.message);
        setErrorStatus(err.code);
        setSpinner(false);
      });
  };
  return (
    <div className="md:w-1/2 w-full mx-auto p-4 bg-white shadow-lg border border-gray-300 rounded-md">
      <h4 className="text-center text-3xl font-bold text-primary mb-4">
        Login your account
      </h4>
      <form
        onSubmit={handleSubmit}
        className="lg:w-2/3 w-full mx-auto space-y-3"
      >
        <input
          {...email}
          type="email"
          placeholder="Email address"
          name="email"
          className="input input-primary input-bordered w-full"
          required
        />
        <div>
          <div className="relative">
            <input
              {...pass}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              name="pass"
              className="input input-primary input-bordered w-full"
              required
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button
                className="btn btn-sm btn-ghost btn-square text-primary"
                onClick={() => setShowPass((prop) => !prop)}
                type="button"
              >
                {showPass ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </button>
            </div>
          </div>
          <button className="text-sm text-gray-500" type="button">
            Forget password?
          </button>
        </div>
        {errorStatus && (
          <p className="text-red-600 text-sm my-4">{errorStatus}</p>
        )}
        <button className="btn btn-block btn-primary" type="submit">
          {spinner ? <span className="spinner"></span> : "login"}
        </button>
      </form>
      <p className="text-center text-sm mt-2">
        Don't have an account?{" "}
        <Link className="btn-link" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
