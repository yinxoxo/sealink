import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  FaBars,
  FaChartColumn,
  FaCircleLeft,
  FaFolderOpen,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import sealinkLogo from "../../assets/images/logo.png";
import { useAuth } from "../../contexts/AuthContext/useAuth";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location, setIsOpen]);

  const hamburgerButtonPosition = location.pathname.includes(
    "/dashboard/card-editor",
  )
    ? " hidden"
    : "fixed ";

  return (
    <div className="relative flex flex-col">
      <button
        onClick={toggleSidebar}
        className={`${hamburgerButtonPosition} left-5 top-5 z-50 rounded-full bg-white p-2 text-[25px] shadow-md`}
      >
        <FaBars />
      </button>
      <nav
        className={`fixed z-50 flex h-full ${
          isOpen
            ? "w-full sm:w-64"
            : "left-[-4rem] w-0 sm:left-0 sm:w-20 md:left-[-5rem] xl:left-0 xl:w-20"
        } flex-col justify-between bg-white shadow-lg transition-all duration-300`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute left-5 top-5 z-20 rounded-full bg-white p-2 text-[25px]"
        >
          <FaBars />
        </button>
        <div className="mt-5 sm:p-5">
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

        <div className="flex flex-col items-center space-y-1 pb-10">
          <div
            className={`relative flex w-full items-center justify-center p-2 transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 ${
              location.pathname === "/dashboard"
                ? "bg-gray-200 before:bg-sea"
                : "before:bg-transparent hover:bg-gray-200 hover:before:bg-sea"
            }`}
          >
            <Link to="/dashboard" className="flex w-full justify-center">
              <button
                className={`flex w-[85%] items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } space-x-3 rounded-full bg-white px-4 py-3 text-center shadow-md ${
                  location.pathname === "/dashboard"
                    ? "text-sea"
                    : "hover:text-sea"
                }`}
              >
                <FaFolderOpen
                  className={`text-lg ${
                    location.pathname === "/dashboard"
                      ? "fill-sea"
                      : "hover:fill-sea"
                  }`}
                />
                {isOpen && (
                  <span className="text-sm font-medium">Projects</span>
                )}
              </button>
            </Link>
          </div>

          <div
            className={`relative flex w-full items-center justify-center p-2 transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 ${
              location.pathname.startsWith("/dashboard/analytics")
                ? "bg-gray-200 before:bg-sea"
                : "before:bg-transparent hover:bg-gray-200 hover:before:bg-sea"
            }`}
          >
            <Link
              to="/dashboard/analytics"
              className="flex w-full justify-center"
            >
              <button
                className={`flex w-[85%] items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } space-x-3 rounded-full bg-white px-4 py-3 text-center shadow-md ${
                  location.pathname.startsWith("/dashboard/analytics")
                    ? "text-sea"
                    : "hover:text-sea"
                }`}
              >
                <FaChartColumn
                  className={`text-lg ${
                    location.pathname.startsWith("/dashboard/analytics")
                      ? "fill-sea"
                      : "hover:fill-sea"
                  }`}
                />
                {isOpen && (
                  <span className="text-sm font-medium">Data Analyze</span>
                )}
              </button>
            </Link>
          </div>

          <div
            className={`relative flex w-full items-center justify-center p-2 transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 before:bg-transparent hover:bg-gray-200 hover:before:bg-sea`}
          >
            <button
              onClick={logout}
              className={`flex w-[85%] items-center ${
                isOpen ? "justify-start" : "justify-center"
              } space-x-3 rounded-full bg-white px-4 py-3 text-center font-bold shadow-md hover:text-sea`}
            >
              <FaCircleLeft className={`text-lg hover:fill-sea`} />
              {isOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
