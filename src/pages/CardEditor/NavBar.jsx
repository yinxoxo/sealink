import { useCardEditorContext } from "../../contexts/CardEditorContext/useCardEditorContext";
import {
  FaPlus,
  FaAnglesLeft,
  FaAnglesRight,
  FaPlay,
  FaDesktop,
  FaRocket,
  FaBars,
} from "react-icons/fa6";
import { FaEdit, FaIcons, FaImage, FaRegSquare } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

const NavBar = ({ onUndo, onRedo, disableUndo, disableRedo }) => {
  const { setEditingType } = useCardEditorContext();

  return (
    <nav className="fixed w-[450px] bg-white">
      <div className="border-1 relative flex items-center justify-between border-b-2 border-solid border-gray-300 p-5 text-white">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaPlus
              size={20}
              className="text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="rounded-lg p-2 shadow-lg"
            side="bottom"
            align="start"
            sideOffset={20}
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
          </DropdownMenuContent>
        </DropdownMenu>

        <FaAnglesLeft
          size={20}
          className={`text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125 ${disableUndo ? "cursor-not-allowed opacity-50" : ""}`}
          onClick={onUndo}
        />
        <FaAnglesRight
          size={20}
          className={`text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125 ${disableRedo ? "cursor-not-allowed opacity-50" : ""}`}
          onClick={onRedo}
        />
        <FaPlay
          size={20}
          className="text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125"
        />
        <FaDesktop
          size={20}
          className="text-icon hover:text-icon-hover cursor-pointer transition-transform duration-300 hover:scale-125"
        />
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
