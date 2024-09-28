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
import { Dropdown, Menu } from "antd";
import {
  EditOutlined,
  AppstoreAddOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

const NavBar = () => {
  const { setEditingType } = useCardEditorContext();

  const menu = (
    <Menu
      style={{
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Menu.Item
        key="1"
        onClick={() => setEditingType("text")}
        icon={<EditOutlined />}
      >
        Text
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => setEditingType("icon")}
        icon={<AppstoreAddOutlined />}
      >
        Icons
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => setEditingType("button")}
        icon={<AppstoreAddOutlined />}
      >
        Buttons
      </Menu.Item>
      <Menu.Item
        key="4"
        onClick={() => setEditingType("avatar")}
        icon={<FileImageOutlined />}
      >
        Image
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center justify-between border-2 border-solid border-neutral-300 p-4 text-white">
      <Dropdown overlay={menu} trigger={["click"]}>
        <FaPlus
          size={20}
          className="cursor-pointer"
          color="rgb(160, 160, 160)"
        />
      </Dropdown>

      <FaAnglesLeft
        size={20}
        className="cursor-pointer"
        color="rgb(160, 160, 160)"
      />
      <FaAnglesRight
        size={20}
        className="cursor-pointer"
        color="rgb(160, 160, 160)"
      />
      <FaPlay size={20} className="cursor-pointer" color="rgb(160, 160, 160)" />
      <FaDesktop
        size={20}
        className="cursor-pointer"
        color="rgb(160, 160, 160)"
      />
      <FaRocket
        size={20}
        className="cursor-pointer"
        color="rgb(160, 160, 160)"
        onClick={() => {
          setEditingType("saveProject");
        }}
      />
      <FaBars
        size={20}
        className="cursor-pointer"
        color="rgb(160, 160, 160)"
        onClick={() => setEditingType("background")}
      />
    </div>
  );
};

export default NavBar;
