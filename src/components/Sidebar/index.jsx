import { useState } from "react";
import sealinkLogo from "../../images/logo.png";

import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  FaChildReaching,
  FaBars,
  FaChartColumn,
  FaChessQueen,
} from "react-icons/fa6";

const Sidebar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <nav
        className={`fixed flex h-full ${isOpen ? "w-64" : "w-20"} flex-col justify-between bg-white px-2 shadow-lg transition-all duration-300`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute left-5 top-5 z-20 rounded-full bg-white p-2"
        >
          <FaBars />
        </button>
        <div className="p-5">
          <Link to="/">
            <div className="flex justify-center">
              {isOpen && (
                <img
                  src={sealinkLogo}
                  alt="sealink logo"
                  className="logo mt-5"
                />
              )}
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-center space-y-2 pb-10">
          <button
            className={`flex w-4/5 items-center ${isOpen ? "justify-start" : "justify-center"} space-x-3 rounded-full border border-gray-300 bg-white px-4 py-3 text-center lg:w-full`}
          >
            <FaChartColumn className="text-lg" />
            {isOpen && (
              <span className="text-sm font-medium">Data Analyze</span>
            )}
          </button>

          <button
            className={`flex w-4/5 items-center ${isOpen ? "justify-start" : "justify-center"} space-x-3 rounded-full border border-gray-300 bg-white px-4 py-3 text-center lg:w-full`}
          >
            <FaChessQueen className="text-lg" />
            {isOpen && <span className="text-sm font-medium">PRO</span>}
          </button>

          <button
            className={`flex w-4/5 items-center ${isOpen ? "justify-start" : "justify-center"} space-x-3 rounded-full border border-gray-300 bg-white px-4 py-3 text-center font-bold shadow-md lg:w-full`}
          >
            <FaChildReaching className="text-lg" />
            {isOpen && (
              <span className="text-sm font-medium">
                {user?.displayName || "USER"}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
