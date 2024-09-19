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

  const renderIconList = () => (
    <>
      {editingType === "icon" ? (
        <>
          <h2 className="mb-4 text-xl">Icons</h2>
          <h2 className="text-lg">Current Icons</h2>
          <div className="my-4">
            <label>Icon Color</label>
            <div onClick={() => setShowFontColorPicker(!showFontColorPicker)}>
              <div
                style={{
                  backgroundColor: iconStyle.color || "#000",
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
                  color={editIconData?.color}
                  onChangeComplete={(color) => {
                    setEditIconData({ ...editIconData, color: color.hex });
                    setIconStyle({ ...iconStyle, color: color.hex });
                  }}
                />
              </div>
            )}
          </div>
          <div className="my-4 flex flex-col">
            <label>Icon Size</label>
            <input
              type="range"
              min="10"
              max="100"
              value={iconStyle.size}
              onChange={(e) =>
                setIconStyle({
                  ...iconStyle,
                  size: parseInt(e.target.value, 10),
                })
              }
              className="slider"
            />
            <span>{iconStyle.size}px</span>
          </div>

          {icons.map((icon) => (
            <IconCard
              key={icon.id}
              icon={icon.icon}
              iconName={icon.name}
              onEdit={() => handleEdit(icon.name)}
              onDelete={() => handleIconDelete(icon.id)}
            />
          ))}
          <h2 className="my-2 text-lg">Add Icons</h2>
          <Select
            style={{ width: "100%" }}
            placeholder="Select an icon"
            onChange={(value) => setSelectedIcon(value)}
          >
            {ICON_LIST.map((icon) => {
              const IconComponent = icon.icon;
              return (
                <Option key={icon.name} value={icon.name}>
                  <div className="flex items-center">
                    <IconComponent size={20} className="mr-2" />
                    <span>{icon.name}</span>
                  </div>
                </Option>
              );
            })}
          </Select>
          <Button className="mt-4" type="default" onClick={addIcon}>
            Add Icon
          </Button>
        </>
      ) : null}
      {editIconData && (
        <Modal
          title="Edit Icon"
          open={isModalVisible}
          onOk={handleSaveEdit}
          onCancel={() => setIsModalVisible(false)}
        >
          <div>
            <label>Icon Type</label>

            <Select
              value={editIconData.name}
              style={{ width: "100%" }}
              onChange={(value) => {
                const selectedIcon = ICON_LIST.find(
                  (icon) => icon.name === value,
                );
                if (selectedIcon) {
                  setEditIconData({
                    ...editIconData,
                    name: value,
                    icon: selectedIcon.icon,
                  });
                }
              }}
            >
              {ICON_LIST.map((icon) => (
                <Option key={icon.name} value={icon.name}>
                  <div className="flex items-center">
                    <icon.icon size={20} className="mr-2" />
                    <span>{icon.name}</span>
                  </div>
                </Option>
              ))}
            </Select>
          </div>

          <div className="mt-4">
            <label>Icon Link (Href)</label>
            <Input
              value={editIconData.href}
              onChange={(e) =>
                setEditIconData({ ...editIconData, href: e.target.value })
              }
            />
          </div>
        </Modal>
      )}
    </>
  );

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
            min="300"
            max="700"
            step="100"
            value={currentFontStyle.fontWeight}
            onChange={(e) => {
              const newWeight = parseInt(e.target.value, 10);
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
    const updatedButtons = simpleCardButtons.buttons.map((button, i) =>
      i === index ? { ...button, text: newText } : button,
    );
    setSimpleCardButtons({
      ...simpleCardButtons,
      buttons: updatedButtons,
    });
  };
  const renderButtonEditor = () => {
    const { style, buttons } = simpleCardButtons;

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
          {buttons.map((button, index) => (
            <div key={index} className="mb-4">
              <label>Button {index + 1} Text</label>
              <Input
                type="text"
                value={button.text}
                onChange={(e) => handleButtonTextChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <Button
          type="primary"
          onClick={() => {
            setSimpleCardButtons((prev) => {
              const newButton = {
                text: "New Button",
                url: "https://example.com/new-button", //
              };

              const updatedButtons = [...prev.buttons, newButton];

              return {
                ...prev,
                buttons: updatedButtons,
              };
            });
          }}
        >
          Add Button
        </Button>

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
            min="1"
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
            min="1"
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
            min="1"
            max="4"
            step="1"
            value={
              style.fontWeight === 300
                ? 1
                : style.fontWeight === 400
                  ? 2
                  : style.fontWeight === 600
                    ? 3
                    : 4 // 默認到 700
            }
            onChange={(e) => {
              const weightMap = {
                1: 300,
                2: 400,
                3: 600,
                4: 700,
              };
              handleButtonStyleChange("fontWeight", weightMap[e.target.value]);
            }}
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
