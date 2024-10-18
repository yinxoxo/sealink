import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
