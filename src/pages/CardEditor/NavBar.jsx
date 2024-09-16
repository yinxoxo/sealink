import {
  FaPlus,
  FaAnglesLeft,
  FaAnglesRight,
  FaPlay,
  FaDesktop,
  FaRocket,
  FaBars,
} from "react-icons/fa6";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between border-2 border-solid border-neutral-300 p-4 text-white">
      <FaPlus size={20} className="cursor-pointer" />
      <FaAnglesLeft size={20} className="cursor-pointer" />
      <FaAnglesRight size={20} className="cursor-pointer" />
      <FaPlay size={20} className="cursor-pointer" />
      <FaDesktop size={20} className="cursor-pointer" />
      <FaRocket size={20} className="cursor-pointer" />
      <FaBars size={20} className="cursor-pointer" />
    </div>
  );
};

export default NavBar;
