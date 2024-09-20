import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDrag, useDrop } from "react-dnd";
import { useCardEditorContext } from "../contexts/CardEditorContext";
import PropTypes from "prop-types";
const ItemType = "ITEM";

const DraggableItem = ({ id, content, index, moveItem }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="my-2 w-full">
      {content}
    </div>
  );
};

const SimpleCard = () => {
  const {
    hydraText,
    juiceText,
    descriptionText,
    setSelectedText,
    hydraTextStyle,
    juiceTextStyle,
    descriptionTextStyle,
    icons,
    simpleCardButtons,
    setEditingType,
    iconColor,
    iconSize,
    backgroundSettings,
  } = useCardEditorContext();
  console.log("iconSize", iconSize);
  const actualIconSize = iconSize;
  const [items, setItems] = useState([
    {
      id: uuidv4(),
      type: "hydra",
      content: hydraText,
    },
    {
      id: uuidv4(),
      type: "h2",
      content: juiceText,
    },
    {
      id: uuidv4(),
      type: "p",
      content: descriptionText,
    },
    {
      id: uuidv4(),
      type: "icons",
    },
    ...(simpleCardButtons.buttons || []).map((button) => ({
      id: uuidv4(),
      type: "button",
      content: button.text,
      url: button.url,
    })),
  ]);

  useEffect(() => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.type === "hydra" && item.content !== hydraText) {
          return {
            ...item,
            content: hydraText,
          };
        }
        if (item.type === "h2" && item.content !== juiceText) {
          return {
            ...item,
            content: juiceText,
          };
        }
        if (item.type === "p" && item.content !== descriptionText) {
          return {
            ...item,
            content: descriptionText,
          };
        }
        return item;
      });

      const buttonItems =
        simpleCardButtons?.buttons?.map((button, index) => ({
          id:
            prevItems.find(
              (item) => item.type === "button" && item.url === button.url,
            )?.id || uuidv4(),
          type: "button",
          content: button.text,
          url: button.url,
        })) || [];

      const newItems = [
        ...updatedItems.filter((item) => item.type !== "button"),
        ...buttonItems,
      ];

      if (JSON.stringify(newItems) !== JSON.stringify(prevItems)) {
        return newItems;
      }

      return prevItems;
    });
  }, [simpleCardButtons, hydraText, juiceText, descriptionText]);

  const handleButtonClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const moveItem = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  const getItemStyle = (type) => {
    switch (type) {
      case "hydra":
        return {
          wrapper:
            "relative min-h-fit w-full flex items-center justify-center p-[48px]",
          circle: "absolute h-24 w-24 rounded-full bg-green-800",
          text: {
            fontSize: `${hydraTextStyle.fontSize}px`,
            fontWeight: hydraTextStyle.fontWeight,
            color: hydraTextStyle.color,
            fontFamily: hydraTextStyle.fontFamily,
          },
        };
      case "h2":
        return {
          fontSize: `${juiceTextStyle.fontSize}px`,
          fontWeight: juiceTextStyle.fontWeight,
          color: juiceTextStyle.color,
          fontFamily: juiceTextStyle.fontFamily,
          cursor: "pointer",
        };
      case "p":
        return {
          fontSize: `${descriptionTextStyle.fontSize}px`,
          fontWeight: descriptionTextStyle.fontWeight,
          color: descriptionTextStyle.color,
          fontFamily: descriptionTextStyle.fontFamily,
          cursor: "pointer",
        };
      case "button":
        return {
          backgroundColor: simpleCardButtons.style.backgroundColor,
          width: simpleCardButtons.style.width,
          color: simpleCardButtons.style.color,
          borderRadius: simpleCardButtons.style.borderRadius,
          padding: simpleCardButtons.style.padding,
          fontSize: simpleCardButtons.style.fontSize,
          fontWeight: simpleCardButtons.style.fontWeight,
          fontFamily: simpleCardButtons.style.fontFamily,
        };
      case "icons":
        return "flex justify-center space-x-4";
      default:
        return "";
    }
  };

  console.log(backgroundSettings);

  return (
    <div className="card-container relative bg-white p-6 text-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: backgroundSettings.backgroundImage
            ? backgroundSettings.backgroundImage
            : "none",
          backgroundColor: backgroundSettings.backgroundImage
            ? "transparent"
            : backgroundSettings.backgroundColor || "none",
          opacity: backgroundSettings.opacity || 0.6,
          backgroundSize: backgroundSettings.backgroundSize || "cover",
          backgroundPosition: backgroundSettings.backgroundPosition || "center",
        }}
      />

      <div className="relative z-10">
        {items.map((item, index) =>
          item && item.id ? (
            <DraggableItem
              key={item.id}
              id={item.id}
              content={
                item.type === "hydra" ? (
                  <div
                    className={getItemStyle(item.type).wrapper}
                    onClick={() => {
                      setSelectedText("hydraText");
                      setEditingType("text");
                    }}
                  >
                    <div
                      className={getItemStyle(item.type).circle}
                      style={{ zIndex: 1 }}
                    />

                    <h1
                      className="relative z-10 cursor-pointer"
                      style={getItemStyle(item.type).text}
                    >
                      {item.content}
                    </h1>
                  </div>
                ) : item.type === "button" ? (
                  <div
                    className="w-full"
                    onClick={() => setEditingType("button")}
                  >
                    <button
                      style={getItemStyle(item.type)}
                      onClick={() => {
                        handleButtonClick(item.url);
                      }}
                    >
                      {item.content}
                    </button>
                  </div>
                ) : item.type === "icons" ? (
                  <div
                    className={getItemStyle(item.type)}
                    onClick={() => setEditingType("icon")}
                  >
                    {icons.map((icon) => {
                      const IconComponent = icon.icon;

                      if (typeof IconComponent !== "function") {
                        console.error("Invalid icon component", IconComponent);
                        return null;
                      }

                      return (
                        <a
                          key={icon.id}
                          href={icon.href}
                          className="text-gray-500 hover:text-gray-700"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconComponent
                            size={actualIconSize}
                            color={iconColor}
                          />
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    style={getItemStyle(item.type)}
                    onClick={() => {
                      if (item.type === "h2") setSelectedText("juiceText");
                      if (item.type === "p") setSelectedText("descriptionText");
                      setEditingType("text");
                    }}
                  >
                    {item.content}
                  </div>
                )
              }
              index={index}
              moveItem={moveItem}
            />
          ) : null,
        )}
      </div>
    </div>
  );
};

export default SimpleCard;

DraggableItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
};
