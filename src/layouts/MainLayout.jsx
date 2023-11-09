import { Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import Banner from "../components/header/Banner";
import Footer from "../components/Footer";
import { useLocation, useNavigation } from "react-router-dom";
import Loader from "../components/Loader";

const MainLayout = () => {
  const location = useLocation();
  const loading = useNavigation();
  return (
    <div className="w-full min-h-screen overflow-x-hidden font-poppins bg-gray-100">
      <div className="container w-full md:w-90 mx-auto m-1 p-2">
        <header>
          <Navbar />
          {location.pathname === "/" ? <Banner /> : ""}
        </header>
        <main>{loading.state === "loading" ? <Loader /> : <Outlet />}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
