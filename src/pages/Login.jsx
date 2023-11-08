/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
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
          type="email"
          placeholder="Email address"
          name="email"
          className="input input-primary input-bordered w-full"
          required
        />
        <div>
          <div className="relative">
            <input
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
        <button className="btn btn-block btn-primary" type="submit">
          login
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
