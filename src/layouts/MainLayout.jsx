import { Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import Banner from "../components/header/Banner";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden font-poppins">
      <div className="container w-full md:w-90 mx-auto m-1">
        <header>
          <Navbar />
          <Banner />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
