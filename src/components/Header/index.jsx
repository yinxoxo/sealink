import { Link } from "react-router-dom";
import sealinkLogo from "../../images/sealink.png";

const Header = () => {
  return (
    <header>
      <div className="flex w-full items-center justify-between rounded-full bg-white p-4 shadow-md">
        <div className="relative flex items-center">
          <Link to="/">
            <span className="font-semibold">SeaLink</span>

            <img
              src={sealinkLogo}
              alt="Logo"
              className="absolute left-[55px] top-[-15px] h-7 w-7"
            />
          </Link>
          <Link to="/templates">
            <span href="#" className="mx-7 text-gray-600 hover:text-black">
              Templates
            </span>
          </Link>
        </div>

        <div className="flex space-x-3">
          <Link to="/signup">
            <button className="mr-1 rounded-full bg-gray-100 px-4 py-2 text-gray-600 hover:bg-gray-200">
              Log in
            </button>

            <Link to="/signup"></Link>
            <button className="rounded-full bg-black px-4 py-2 text-white hover:bg-gray-900">
              Sign up free
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
