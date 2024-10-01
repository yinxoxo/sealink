import { useCardEditorContext } from "../../contexts/CardEditorContext/useCardEditorContext";
import {
  FaPlus,
  FaAnglesLeft,
  FaAnglesRight,
  FaPlay,
  FaDesktop,
  FaRocket,
  FaBars,
  FaMobileScreen,
} from "react-icons/fa6";
import {
  FaEdit,
  FaIcons,
  FaImage,
  FaRegSquare,
  FaFlipboard,
} from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

const NavBar = ({
  onUndo,
  onRedo,
  disableUndo,
  disableRedo,
  isMobile,
  setIsMobile,
}) => {
  const { setEditingType } = useCardEditorContext();
  const handleToggleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 w-[450px] bg-white">
      <div className="relative flex items-center justify-between border-b-2 border-solid border-gray-300 p-5 text-white">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaPlus
              size={20}
              className="text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="absolute left-[-30px] top-[22px] rounded-lg p-2 shadow-lg"
            side="bottom"
            sideOffset={0}
          >
            <DropdownMenuItem onClick={() => setEditingType("text")}>
              <FaEdit className="text-icon mr-2" /> Text
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingType("icon")}>
              <FaIcons className="text-icon mr-2" /> Icons
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingType("button")}>
              <FaRegSquare className="text-icon mr-2" /> Buttons
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingType("avatar")}>
              <FaImage className="text-icon mr-2" /> Image
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditingType("background")}>
              <FaFlipboard className="text-icon mr-2" /> Background
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <FaAnglesLeft
          size={20}
          className={`text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125 ${
            disableUndo ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={onUndo}
        />
        <FaAnglesRight
          size={20}
          className={`text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125 ${
            disableRedo ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={onRedo}
        />
        <FaPlay
          size={20}
          className="text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125"
        />
        {isMobile ? (
          <FaDesktop
            size={20}
            className="text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125"
            onClick={handleToggleMobile}
          />
        ) : (
          <FaMobileScreen
            size={20}
            className="text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125"
            onClick={handleToggleMobile}
          />
        )}
        <FaRocket
          size={20}
          className="text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125"
          onClick={() => {
            setEditingType("saveProject");
          }}
        />
        <FaBars
          size={20}
          className="text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125"
          onClick={() => setEditingType("background")}
        />
      </div>
    </nav>
  );
};

export default NavBar;
