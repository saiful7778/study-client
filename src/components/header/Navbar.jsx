import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useId } from "react";
import SiteLogo from "../SiteLogo";
import { navLinks } from "../../assets/data/staticData";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const mobileMenuId = useId();
  const renderNavLinks = navLinks?.map((ele) => (
    <li key={ele._id} className={ele?.hasDropDown && "dropdown-item"}>
      <NavLink
        className="capitalize font-medium inline-flex items-center gap-2"
        to={ele.path}
      >
        {ele.navName}
        {ele?.hasDropDown && (
          <div className="">
            <IoIosArrowUp />
          </div>
        )}
      </NavLink>
      {ele?.hasDropDown && <DropDown dropDownData={ele.dropDown} />}
    </li>
  ));
  const renderMobileNavLink = navLinks?.map((ele) => (
    <li key={"mb" + ele._id}>
      <NavLink className="capitalize font-medium" to={ele.path}>
        {ele.navName}
      </NavLink>
      {ele?.hasDropDown && <MobileDropDown dropDownData={ele.dropDown} />}
    </li>
  ));
  return (
    <>
      <div className="drawer">
        <input id={mobileMenuId} type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <nav className="navbar">
            <div className="flex-1">
              <SiteLogo />
            </div>
            <div className="flex items-center gap-2">
              <ul className="hidden md:flex items-center gap-2">
                {renderNavLinks}
              </ul>
              <div className="items-center gap-2 min-sm:flex hidden">
                <UserAuthCom />
              </div>
              <div className="md:hidden block">
                <label
                  htmlFor={mobileMenuId}
                  aria-label="open sidebar"
                  className="btn btn-square btn-sm btn-primary btn-outline"
                >
                  <AiOutlineMenu />
                </label>
              </div>
            </div>
          </nav>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor={mobileMenuId}
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 min-h-full bg-white">
            {renderMobileNavLink}
            <li className="min-sm:hidden items-center">
              <UserAuthCom />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const shortUserName = (username) => {
  if (username) {
    return `${username[0]}${username[1]}`;
  }
};

const UserAuthCom = () => {
  const { userData } = useAuth();
  return <>{userData ? <LoggedIn /> : <LoggedOut />}</>;
};

const LoggedIn = () => {
  const { userData, logout } = useAuth();

  return (
    <>
      <div className="avatar placeholder online">
        <div className="w-8 h-8 rounded-full bg-white ring-2 ring-primary ring-offset-gray-100 ring-offset-2">
          {userData?.photoURL ? (
            <img src={userData?.photoURL} alt="user image" />
          ) : (
            <span className="text-xl font-semibold uppercase">
              {shortUserName(userData.displayName)}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={logout}
        className="btn btn-sm btn-primary btn-outline"
        type="button"
      >
        logout
      </button>
    </>
  );
};

const LoggedOut = () => {
  return (
    <>
      <Link to="/login" className="btn btn-primary btn-sm my-1">
        login
      </Link>
      <Link to="/register" className="btn btn-primary btn-outline btn-sm my-1">
        register
      </Link>
    </>
  );
};

const DropDown = ({ dropDownData }) => {
  const renderDropDown = dropDownData?.map((ele) => (
    <li key={ele._id}>
      <Link className="capitalize" to={ele.path}>
        {ele.navName}
      </Link>
    </li>
  ));
  return (
    <ul className="dropdown-menu divide-y divide-gray-300">{renderDropDown}</ul>
  );
};

DropDown.propTypes = {
  dropDownData: PropTypes.array,
};

const MobileDropDown = ({ dropDownData }) => {
  const renderMobileDropDown = dropDownData?.map((ele) => (
    <li key={"mb" + ele._id}>
      <NavLink to={ele.path}>{ele.navName}</NavLink>
    </li>
  ));
  return <ul>{renderMobileDropDown}</ul>;
};
MobileDropDown.propTypes = {
  dropDownData: PropTypes.array,
};

export default Navbar;
