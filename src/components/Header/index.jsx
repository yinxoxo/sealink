import { useEffect, useState } from "react";
import { PiIdentificationCard } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import sealinkLogo from "../../images/logo.png";
import Loading from "../Loading";

import { LuLayoutDashboard } from "react-icons/lu";

const Header = () => {
  const auth = useAuth();
  const { user, logout, loading } = auth;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  if (loading) {
    return <Loading />;
  }
  return (
    <header className="fixed top-12 z-30 mx-auto w-[80%] sm:w-[90%]">
      <div className="flex w-full items-center justify-between rounded-full bg-white p-2 shadow-md xl:p-3">
        <div className="relative flex items-center">
          <Link to="/">
            <img src={sealinkLogo} alt="Logo" className="logo" />
          </Link>
          <Link to="/templates">
            <div className="mx-7 hidden rounded-3xl p-3 text-gray-600 hover:bg-gray-100 sm:inline-block">
              Templates
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <span className="mr-2 hidden text-gray-600 sm:inline-block">
                Hello, {user.displayName || "User"}
              </span>
              <Link to="/dashboard">
                <button className="mr-1 hidden rounded-lg bg-gray-100 px-4 py-5 text-gray-600 hover:bg-gray-200 sm:inline-block">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={logout}
                className="hidden rounded-full bg-black px-4 py-5 text-white hover:bg-gray-900 sm:inline-block"
              >
                Log out
              </button>
            </>
          ) : (
            <Link to="/signup">
              <button className="hidden rounded-full border-2 border-gray-200 p-2 sm:inline-block lg:p-5">
                Log in / Sign up
              </button>
            </Link>
          )}
          <button
            className="mr-2 flex h-[35px] w-[35px] flex-col items-center justify-center rounded-full p-2 text-gray-600 hover:bg-gray-200 sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`mb-1.5 h-0.5 w-5 bg-gray-600 transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`mb-1.5 h-0.5 w-5 bg-gray-600 transition-opacity duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-gray-600 transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 z-20 h-full w-full transform bg-[#264F1A] px-10 py-5 text-[#D2E722] transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "-translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute right-5 top-5 flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white text-[#264F1A] hover:bg-zinc-200"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className={`h-0.5 w-5 rotate-45 transform bg-[#264F1A]`} />
          <span
            className={`absolute h-0.5 w-5 -rotate-45 transform bg-[#264F1A]`}
          />
        </button>

        <div className="mb-8 mt-[100px] flex w-full flex-row items-center justify-between">
          <div className="text-3xl font-semibold">
            Hi! {user?.displayName || "Guest"}
          </div>
        </div>

        <div className="mb-8 h-1 w-full bg-white"></div>

        <div className="flex w-full flex-col space-y-3">
          <div className="flex w-full items-center rounded-md p-3 hover:bg-[#F3F3F1] hover:text-[#264F1A]">
            <PiIdentificationCard />
            <Link to="/templates" className="ml-2 text-2xl hover:underline">
              Templates
            </Link>
          </div>
          {user ? (
            <>
              <div className="flex w-full items-center rounded-md p-3 hover:bg-[#F3F3F1] hover:text-[#264F1A]">
                <LuLayoutDashboard />
                <Link to="/dashboard" className="ml-2 text-2xl hover:underline">
                  Dashboard
                </Link>
              </div>
              <div className="fixed bottom-0 right-0 bg-[#264F1A] p-5 text-center">
                <button
                  onClick={logout}
                  className="rounded-full bg-black px-6 py-3 text-2xl text-white hover:bg-gray-900"
                >
                  Log out
                </button>
              </div>
            </>
          ) : (
            <div className="fixed bottom-0 right-0 bg-[#264F1A] p-5 text-center">
              <Link to="/signup">
                <button className="rounded-full bg-[#E8C0E9] px-6 py-3 text-2xl text-black hover:bg-[#d1a5d2] hover:text-white">
                  Log in / Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
