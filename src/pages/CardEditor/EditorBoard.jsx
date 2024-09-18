import { useState } from "react";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import { SketchPicker } from "react-color";
import { fontOptions } from "../../CardTemplate/cardContent/fontOptions";
import { ICON_LIST } from "../../CardTemplate/cardContent/iconList";
import { Select, Button, Card, Tooltip, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Option } = Select;

const EditBoard = ({
  selectedText,
  setHydraText,
  setJuiceText,
  setDescriptionText,
  hydraText,
  juiceText,
  descriptionText,
  hydraTextStyle,
  setHydraTextStyle,
  juiceTextStyle,
  setJuiceTextStyle,
  descriptionTextStyle,
  setDescriptionTextStyle,
  editingType,
  icons,
  setIcons,
  iconStyle,
  setIconStyle,
  simpleCardButtons,
  setSimpleCardButtons,
}) => {
  // const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editIconData, setEditIconData] = useState(null);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);

  const handleEdit = (iconName) => {
    const iconToEdit = icons.find((icon) => icon.name === iconName);
    if (iconToEdit) {
      setEditIconData(iconToEdit);
      setIsModalVisible(true);
    }
  };

  const handleSaveEdit = () => {
    const updatedIcons = icons.map((icon) =>
      icon.id === editIconData.id ? editIconData : icon,
    );
    setIcons(updatedIcons);
    setIconStyle({ ...iconStyle, color: editIconData.color });
    console.log(iconStyle);
    setIsModalVisible(false);
  };

  const IconCard = ({ icon: IconComponent, iconName, onEdit, onDelete }) => {
    return (
      <Card
        className="flex h-fit w-full items-center justify-between"
        styles={{ body: { padding: "8px" } }}
        actions={[
          <Tooltip title="Edit" key="edit">
            <EditOutlined onClick={onEdit} />
          </Tooltip>,
          <Tooltip title="Delete" key="delete">
            <DeleteOutlined onClick={onDelete} />
          </Tooltip>,
        ]}
      >
        <Meta
          className="flex items-center"
          avatar={<IconComponent size={24} color="#000" />}
          title={<span>{iconName}</span>}
        />
      </Card>
    );
  };

  const handleIconDelete = (id) => {
    setIcons(icons.filter((icon) => icon.id !== id));
    console.log("Deleted icon", id);
  };

  const handleColorChange = (color) => {
    switch (selectedText) {
      case "hydraText":
        setHydraTextStyle({ ...hydraTextStyle, color: color.hex });
        break;
      case "juiceText":
        setJuiceTextStyle({ ...juiceTextStyle, color: color.hex });
        break;
      case "descriptionText":
        setDescriptionTextStyle({ ...descriptionTextStyle, color: color.hex });
        break;
      default:
        break;
    }
  };

  const handleFontChange = (e) => {
    const selectedFont = e.target.value;
    switch (selectedText) {
      case "hydraText":
        setHydraTextStyle({ ...hydraTextStyle, fontFamily: selectedFont });
        break;
      case "juiceText":
        setJuiceTextStyle({ ...juiceTextStyle, fontFamily: selectedFont });
        break;
      case "descriptionText":
        setDescriptionTextStyle({
          ...descriptionTextStyle,
          fontFamily: selectedFont,
        });
        break;
      default:
        break;
    }
  };

  const addIcon = () => {
    if (selectedIcon) {
      const foundIcon = ICON_LIST.find((icon) => icon.name === selectedIcon);

      if (foundIcon && foundIcon.icon) {
        const newIcon = {
          id: foundIcon.id,
          name: foundIcon.name,
          icon: foundIcon.icon,
        };
        setIcons([...icons, newIcon]);
      } else {
        console.error(`Icon ${selectedIcon} not found or invalid icon`);
      }
    }
  };

  const handleButtonStyleChange = (styleProp, value) => {
    setSimpleCardButtons((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        [styleProp]: value,
      },
    }));
  };

  const renderTextEditor = () => {
    const currentFontStyle = (() => {
      switch (selectedText) {
        case "hydraText":
          return hydraTextStyle;
        case "juiceText":
          return juiceTextStyle;
        case "descriptionText":
          return descriptionTextStyle;
        default:
          return {};
      }
    })();

    return (
      <>
        <input
          type="text"
          value={
            selectedText === "hydraText"
              ? hydraText
              : selectedText === "juiceText"
                ? juiceText
                : descriptionText
          }
          onChange={(e) => {
            if (selectedText === "hydraText") {
              setHydraText(e.target.value);
            } else if (selectedText === "juiceText") {
              setJuiceText(e.target.value);
            } else {
              setDescriptionText(e.target.value);
            }
          }}
          className="rounded border p-2"
        />
        <div className="mt-4">
          <label>Font Size</label>
          <input
            type="range"
            min="10"
            max="100"
            value={currentFontStyle.fontSize}
            onChange={(e) => {
              const newSize = parseInt(e.target.value, 10);
              if (selectedText === "hydraText") {
                setHydraTextStyle({ ...hydraTextStyle, fontSize: newSize });
              } else if (selectedText === "juiceText") {
                setJuiceTextStyle({ ...juiceTextStyle, fontSize: newSize });
              } else {
                setDescriptionTextStyle({
                  ...descriptionTextStyle,
                  fontSize: newSize,
                });
              }
            }}
            className="slider"
          />
          <span>{currentFontStyle.fontSize}px</span>
        </div>
        <div className="mt-4">
          <label>Font Weight</label>
          <input
            type="range"
            min="100"
            max="900"
            step="100"
            value={currentFontStyle.fontWeight}
            onChange={(e) => {
              const newWeight = e.target.value;
              if (selectedText === "hydraText") {
                setHydraTextStyle({
                  ...hydraTextStyle,
                  fontWeight: newWeight,
                });
              } else if (selectedText === "juiceText") {
                setJuiceTextStyle({
                  ...juiceTextStyle,
                  fontWeight: newWeight,
                });
              } else {
                setDescriptionTextStyle({
                  ...descriptionTextStyle,
                  fontWeight: newWeight,
                });
              }
            }}
            className="slider"
          />
          <span>{currentFontStyle.fontWeight}</span>
        </div>
        <div className="mt-4">
          <label>Font Family</label>
          <select
            value={currentFontStyle.fontFamily}
            onChange={handleFontChange}
            className="rounded border p-2"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label>Font Color</label>
          <div onClick={() => setShowFontColorPicker(!showFontColorPicker)}>
            <div
              style={{
                backgroundColor: currentFontStyle.color,
                width: "40px",
                height: "40px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            />
          </div>
          {showFontColorPicker && (
            <div style={{ position: "absolute", zIndex: 2 }}>
              <SketchPicker
                color={currentFontStyle.color}
                onChangeComplete={handleColorChange}
              />
            </div>
          )}
        </div>
      </>
    );
  };

  const handleButtonTextChange = (index, newText) => {
    const updatedTexts = [...simpleCardButtons.texts];
    updatedTexts[index] = newText;
    setSimpleCardButtons({
      ...simpleCardButtons,
      texts: updatedTexts,
    });
  };
  const renderButtonEditor = () => {
    const { style, texts } = simpleCardButtons;

    return (
      <>
        <div className="mt-4">
          <label>Background Color</label>
          <div
            style={{
              backgroundColor: style.backgroundColor,
              width: "40px",
              height: "40px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => {
              setShowBackgroundColorPicker(!showBackgroundColorPicker);
              setShowFontColorPicker(false);
            }}
          />
          {showBackgroundColorPicker && (
            <div style={{ position: "absolute", zIndex: 2 }}>
              <SketchPicker
                color={style.backgroundColor}
                onChangeComplete={(color) =>
                  handleButtonStyleChange("backgroundColor", color.hex)
                }
              />
            </div>
          )}
        </div>

        <div className="mt-4">
          {texts.map((text, index) => (
            <div key={index} className="mb-4">
              <label>Button {index + 1} Text</label>
              <Input
                type="text"
                value={text}
                onChange={(e) => handleButtonTextChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label>Width</label>
          <input
            type="range"
            min="50"
            max="100"
            value={parseInt(style.width, 10) || 70}
            onChange={(e) =>
              handleButtonStyleChange("width", `${e.target.value}%`)
            }
          />
          <span>{style.width}</span>
        </div>

        <div className="mt-4">
          <label>Text Color</label>
          <div
            style={{
              backgroundColor: style.color,
              width: "40px",
              height: "40px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => {
              setShowFontColorPicker(!showFontColorPicker);
              setShowBackgroundColorPicker(false);
            }}
          />
          {showFontColorPicker && (
            <div style={{ position: "absolute", zIndex: 2 }}>
              <SketchPicker
                color={style.color}
                onChangeComplete={(color) =>
                  handleButtonStyleChange("color", color.hex)
                }
              />
            </div>
          )}
        </div>

        <div className="mt-4">
          <label>Border Radius</label>
          <input
            type="range"
            min="0"
            max="50"
            value={parseInt(style.borderRadius, 10) || 20}
            onChange={(e) =>
              handleButtonStyleChange("borderRadius", `${e.target.value}px`)
            }
          />
          <span>{style.borderRadius}</span>
        </div>

        <div className="mt-4">
          <label>Padding</label>
          <input
            type="range"
            min="0"
            max="50"
            value={parseInt(style.padding, 10) || 20}
            onChange={(e) =>
              handleButtonStyleChange("padding", `${e.target.value}px`)
            }
          />
          <span>{style.padding}</span>
        </div>

        <div className="mt-4">
          <label>Font Size</label>
          <input
            type="range"
            min="10"
            max="50"
            value={parseInt(style.fontSize, 10) || 18}
            onChange={(e) =>
              handleButtonStyleChange("fontSize", `${e.target.value}px`)
            }
          />
          <span>{style.fontSize}</span>
        </div>

        <div className="mt-4">
          <label>Font Weight</label>
          <input
            type="range"
            min="100"
            max="900"
            step="100"
            value={parseInt(style.fontWeight, 10) || 400}
            onChange={(e) =>
              handleButtonStyleChange("fontWeight", e.target.value)
            }
          />
          <span>{style.fontWeight}</span>
        </div>

        <div className="mt-4">
          <label>Font Family</label>
          <Select
            value={style.fontFamily}
            onChange={(value) => handleButtonStyleChange("fontFamily", value)}
            className="rounded border p-2"
          >
            {fontOptions.map((font) => (
              <Option key={font.value} value={font.value}>
                {font.label}
              </Option>
            ))}
          </Select>
        </div>
      </>
    );
  };

  return (
    <section className="fixed right-0 flex h-screen w-[450px] flex-[3] flex-col overflow-y-auto border-2 border-solid border-neutral-300 bg-slate-100">
      <NavBar />
      <div className="flex flex-col p-4">
        {editingType === "text"
          ? renderTextEditor()
          : editingType === "icon"
            ? renderIconList()
            : editingType === "button"
              ? renderButtonEditor()
              : null}
      </div>
    </section>
  );
};

EditBoard.propTypes = {
  selectedText: PropTypes.string,
  setHydraText: PropTypes.func.isRequired,
  setJuiceText: PropTypes.func.isRequired,
  setDescriptionText: PropTypes.func.isRequired,
  hydraText: PropTypes.string.isRequired,
  juiceText: PropTypes.string.isRequired,
  descriptionText: PropTypes.string.isRequired,
  hydraTextStyle: PropTypes.shape({
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
    fontFamily: PropTypes.string,
  }).isRequired,
  setHydraTextStyle: PropTypes.func.isRequired,
  juiceTextStyle: PropTypes.shape({
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
    fontFamily: PropTypes.string,
  }).isRequired,
  setJuiceTextStyle: PropTypes.func.isRequired,
  descriptionTextStyle: PropTypes.shape({
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
    fontFamily: PropTypes.string,
  }).isRequired,
  setDescriptionTextStyle: PropTypes.func.isRequired,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    }),
  ).isRequired,
  setIcons: PropTypes.func.isRequired,
  editingType: PropTypes.string,
};

export default EditBoard;
