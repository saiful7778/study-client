import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import checkPass from "../utility/checkPass";
import { updateProfile } from "firebase/auth";
import UploadImage from "../utility/uploadImg";
import AuthCom from "../components/AuthCom";
import sweetAlert from "../config/SweetAlart.config";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { signUp } = useAuth();
  const [spinner, setSpinner] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorStatus("");
    setSpinner(true);

    const form = e.target;
    const userPic = form.userProfile.files[0];
    const fullName = form.fullName.value;
    const email = form.email.value;
    const pass = form.pass.value;

    if (!checkPass(pass)) {
      setErrorStatus(
        "Password must required: Minimum 6 characters. Capital letter. Special character."
      );
      setSpinner(false);
      return;
    }
    if (userPic) {
      UploadImage(userPic)
        .then((res) => {
          const userProfileLink = res?.data?.data?.image?.url;
          if (userProfileLink) {
            signUp(email, pass)
              .then((result) => {
                const user = result.user;
                if (user) {
                  updateProfile(user, {
                    displayName: fullName,
                    photoURL: userProfileLink,
                  })
                    .then(() => {
                      sweetAlert.fire({
                        title: "Account created successfully!",
                        text: `${user.displayName}, is now authorized!`,
                        icon: "success",
                      });
                      setErrorStatus("");
                      setSpinner(false);
                    })
                    .catch((err) => {
                      sweetAlert.fire({
                        title: err,
                        icon: "error",
                      });
                      console.log(err.message);
                      setErrorStatus(err.code);
                      setSpinner(false);
                    });
                }
              })
              .catch((err) => {
                sweetAlert.fire({
                  title: err.code,
                  icon: "error",
                });
                console.log(err.message);
                setErrorStatus(err.code);
                setSpinner(false);
              });
          }
        })
        .catch((err) => {
          sweetAlert.fire({
            title: err,
            icon: "error",
          });
          console.error(err);
          setErrorStatus(err);
          setSpinner(false);
        });
    } else {
      signUp(email, pass)
        .then((result) => {
          const user = result.user;
          if (user) {
            updateProfile(user, {
              displayName: fullName,
            })
              .then(() => {
                form.reset();
                sweetAlert.fire({
                  title: "Account created successfully!",
                  text: `${user.displayName}, is now authorized!`,
                  icon: "success",
                });
                setErrorStatus("");
                setSpinner(false);
              })
              .catch((err) => {
                sweetAlert.fire({
                  title: err,
                  icon: "error",
                });
                console.log(err.message);
                setErrorStatus(err.code);
                setSpinner(false);
              });
          }
        })
        .catch((err) => {
          sweetAlert.fire({
            title: err.code,
            icon: "error",
          });
          console.log(err.message);
          setErrorStatus(err.code);
          setSpinner(false);
        });
    }
  };
  return (
    <div className="md:w-1/2 w-full mx-auto px-4 py-10 bg-white shadow-lg border border-gray-300 rounded-md my-12">
      <h4 className="text-center text-3xl font-bold text-primary mb-4">
        Create your account
      </h4>
      <form
        onSubmit={handleSubmit}
        className="lg:w-2/3 w-full mx-auto space-y-3"
      >
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full"
          name="userProfile"
          accept="image/*"
        />
        <input
          type="text"
          placeholder="Full name"
          name="fullName"
          className="input input-primary input-bordered w-full"
          required
        />
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
        </div>
        {errorStatus && (
          <p className="text-red-600 text-sm my-4">{errorStatus}</p>
        )}
        <button className="btn btn-block btn-primary" type="submit">
          {spinner ? <span className="spinner"></span> : "register"}
        </button>
      </form>
      <p className="text-center text-sm mt-2">
        Do you have an account?{" "}
        <Link className="btn-link" to="/login">
          Login
        </Link>
      </p>
      <AuthCom />
    </div>
  );
};

export default Register;
