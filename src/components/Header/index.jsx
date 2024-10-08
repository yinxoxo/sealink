import { Link } from "react-router-dom";
import sealinkLogo from "../../images/logo.png";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import Loading from "../Loading";

const Header = () => {
  const auth = useAuth();

  const { user, logout, loading } = auth;

  if (loading) {
    return <Loading />;
  }
  return (
    <header className="fixed top-12 z-10 mx-auto w-[90%]">
      <div className="flex w-full items-center justify-between rounded-full bg-white p-3 shadow-md">
        <div className="relative flex items-center">
          <Link to="/">
            <img src={sealinkLogo} alt="Logo" className="logo" />
          </Link>
          <Link to="/templates">
            <div className="mx-7 rounded-3xl p-3 text-gray-600 hover:bg-gray-100">
              Templates
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <span className="mr-2 text-gray-600">
                Hello, {user.displayName || "User"}
              </span>
              <Link to="/dashboard">
                <button className="mr-1 rounded-lg bg-gray-100 px-4 py-5 text-gray-600 hover:bg-gray-200">
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
              <button className="rounded-full bg-black px-4 py-2 text-white hover:bg-gray-900">
                Log in / Sign up
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
