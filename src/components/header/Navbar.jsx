import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useId } from "react";

const navLinks = [
  {
    _id: "nv1",
    navName: "assignments",
    path: "/assignments",
    hasDropDown: true,
    dropDown: [
      {
        _id: "nvdp1",
        navName: "create assignment",
        path: "/create_assignment",
      },
      { _id: "nvdp2", navName: "my assignments", path: "/my_assignments" },
      {
        _id: "nvdp3",
        navName: "submitted assignments",
        path: "/submitted_assignments",
      },
    ],
  },
];

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
            <Link className="text-3xl font-bold flex-1" to="/">
              <span className="text-blue-700">S</span>tudy
            </Link>
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
        <div className="drawer-side">
          <label
            htmlFor={mobileMenuId}
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 min-h-full bg-white">
            {renderMobileNavLink}
            <li className="min-sm:hidden">
              <UserAuthCom />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const UserAuthCom = () => {
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
