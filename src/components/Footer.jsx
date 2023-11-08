import { Link } from "react-router-dom";
import { footerNavLinks } from "../assets/data/staticData";
import SiteLogo from "./SiteLogo";

const Footer = () => {
  const renderFooterNavLinks = footerNavLinks?.map((ele) => (
    <li key={ele._id}>
      <Link
        className="link link-hover capitalize inline-block text-gray-600"
        to={ele.path}
      >
        {ele.navName}
      </Link>
    </li>
  ));
  return (
    <footer className="bg-gray-300 mt-20">
      <div className="md:w-4/5 px-2 py-10 mx-auto flex gap-4 flex-col md:flex-row max-sm:text-center justify-between">
        <div className="flex-1">
          <SiteLogo />
          <p className="text-sm text-gray-600">
            Elevate Your Education, Empower Your Future.
          </p>
        </div>
        <div>
          <div className="font-bold text-xl mb-2">Links</div>
          <ul>{renderFooterNavLinks}</ul>
        </div>
      </div>
      <div className="p-4 bg-gray-200 text-center">
        © 2023 Study. All rights reserved by{" "}
        <Link className="text-blue-600 underline" to="/">
          Saiful Islam
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
