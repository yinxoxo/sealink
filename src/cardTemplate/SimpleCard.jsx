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
    texts,
    icons,
    simpleCardButtons,
    setEditingType,
    setSelectedText,
    iconColor,
    iconSize,
    backgroundSettings,
  } = useCardEditorContext();

  console.log(texts);
  const [items, setItems] = useState([
    ...texts.map((text, index) => ({
      id: uuidv4(),
      type: "text",
      content: text.text,
      index,
    })),
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
        if (item.type === "text" && item.content !== texts[item.index]?.text) {
          return {
            ...item,
            content: texts[item.index]?.text,
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
  }, [simpleCardButtons, texts]);

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

  const getItemStyle = (type, item = {}) => {
    switch (type) {
      case "text":
        return {
          fontSize: item.style?.fontSize,
          fontWeight: item.style?.fontWeight,
          color: item.style?.color,
          fontFamily: item.style?.fontFamily,
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
                item.type === "text" ? (
                  <div
                    style={getItemStyle(item.type, texts[item.index])}
                    onClick={() => {
                      setSelectedText(item.index);
                      setEditingType("text");
                    }}
                  >
                    {item.content}
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
                          <IconComponent size={iconSize} color={iconColor} />
                        </a>
                      );
                    })}
                  </div>
                ) : null // 確保其他類型不會渲染出錯
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
