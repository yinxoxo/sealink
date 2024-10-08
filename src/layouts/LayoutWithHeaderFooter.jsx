import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LayoutWithHeaderFooter = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutWithHeaderFooter;
