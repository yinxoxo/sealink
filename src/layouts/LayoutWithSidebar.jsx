import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const LayoutWithSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-full">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`transition-all duration-300 ${isOpen ? "sm:ml-64" : "sm:ml-20 md:ml-0 xl:ml-20"} flex-1`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
