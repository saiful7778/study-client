import { Link } from "react-router-dom";
import siteLogo from "../assets/img/study-site-logo.png";

const SiteLogo = () => {
  return (
    <Link className="sitelogo" to="/">
      <img className="w-9 h-9" src={siteLogo} alt="site logo" />
      <div className="logoText">
        <span className="text-blue-700">S</span>tudy
      </div>
    </Link>
  );
};

export default SiteLogo;
