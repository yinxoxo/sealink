import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const LayoutWithSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-full">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"} flex-1`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
