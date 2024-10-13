import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import sealinkLogo from "../../images/logo.png";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import Loading from "../Loading";

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
    <header className="fixed top-12 z-10 mx-auto w-[90%]">
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
                className="rounded-full bg-black px-4 py-5 text-white hover:bg-gray-900"
              >
                Log out
              </button>
            </>
          ) : (
            <Link to="/signup">
              <button className="rounded-full bg-black px-4 py-2 text-white hover:bg-gray-600">
                Log in / Sign up
              </button>
            </Link>
          )}
          <button
            className="mr-2 flex h-[45px] w-[45px] flex-col items-center justify-center rounded-full p-2 text-gray-600 hover:bg-gray-200 sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`mb-1.5 h-0.5 w-6 bg-gray-600 transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`mb-1.5 h-0.5 w-6 bg-gray-600 transition-opacity duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-gray-600 transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center bg-[#264F1A] text-white">
          <button
            className="absolute right-4 top-4 flex h-[45px] w-[45px] items-center justify-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={`h-0.5 w-6 rotate-45 transform bg-white`} />
            <span
              className={`absolute h-0.5 w-6 -rotate-45 transform bg-white`}
            />
          </button>
          <div className="mb-8 text-3xl font-semibold">
            Hi, {user?.displayName || "User"}
          </div>
          <Link to="/templates" className="mb-4 text-2xl hover:underline">
            Templates
          </Link>
          <Link to="/dashboard" className="text-2xl hover:underline">
            Dashboard
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
