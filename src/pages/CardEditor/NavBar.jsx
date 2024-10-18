import {
  FaEdit,
  FaFlipboard,
  FaIcons,
  FaImage,
  FaRegSquare,
  FaTextHeight,
} from "react-icons/fa";
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaArrowsRotate,
  FaBars,
  FaDesktop,
  FaMobileScreen,
  FaRocket,
} from "react-icons/fa6";
import { useCardEditorContext } from "../../contexts/CardEditorContext/useCardEditorContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const NavBar = ({
  onUndo,
  onRedo,
  onReset,
  disableUndo,
  disableRedo,
  isMobile,
  setIsMobile,
}) => {
  const { setEditingType } = useCardEditorContext();
  const navigate = useNavigate();

  const handleToggleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 z-10 w-full bg-white xl:w-[450px]">
      <div className="relative flex items-center justify-between border-b-2 border-solid border-gray-300 p-5 text-white">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaEdit
              size={20}
              className="cursor-pointer text-icon transition-transform duration-300 hover:scale-125 hover:text-icon-hover"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="absolute left-[-30px] top-[22px] rounded-lg p-2 shadow-lg"
            side="bottom"
            sideOffset={0}
          >
            <DropdownMenuItem onClick={() => setEditingType("text")}>
              <FaTextHeight className="mr-2 text-icon" /> Text
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingType("icon")}>
              <FaIcons className="mr-2 text-icon" /> Icons
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingType("button")}>
              <FaRegSquare className="mr-2 text-icon" /> Buttons
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingType("avatar")}>
              <FaImage className="mr-2 text-icon" /> Avatar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingType("background")}>
              <FaFlipboard className="mr-2 text-icon" /> Background
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <FaAnglesLeft
          size={20}
          className={`cursor-pointer text-icon transition-transform duration-300 hover:scale-125 hover:text-icon-hover ${
            disableUndo ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={onUndo}
        />
        <FaAnglesRight
          size={20}
          className={`cursor-pointer text-icon transition-transform duration-300 hover:scale-125 hover:text-icon-hover ${
            disableRedo ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={onRedo}
        />

        {isMobile ? (
          <FaDesktop
            size={20}
            className="hidden cursor-pointer text-icon transition-transform duration-300 hover:scale-125 hover:text-icon-hover xl:inline-block"
            onClick={handleToggleMobile}
          />
        ) : (
          <FaMobileScreen
            size={20}
            className="hidden cursor-pointer text-icon transition-transform duration-300 hover:scale-125 hover:text-icon-hover xl:inline-block"
            onClick={handleToggleMobile}
          />
        )}
        <FaRocket
          size={20}
          className="cursor-pointer text-icon transition-transform duration-300 hover:scale-125 hover:text-icon-hover"
          onClick={() => {
            setEditingType("saveProject");
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaBars
              size={20}
              className="cursor-pointer text-icon transition-transform duration-300 hover:scale-125 hover:text-icon-hover"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="absolute right-[-30px] top-[22px] rounded-lg p-2 shadow-lg"
            side="bottom"
            sideOffset={0}
          >
            <DropdownMenuItem onClick={onReset}>
              <FaArrowsRotate className="mr-2 text-icon" />
              Start Over
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/dashboard")}>
              <FaAnglesLeft className="mr-2 text-icon" />
              Dashboard
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavBar;
