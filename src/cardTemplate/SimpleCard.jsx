import { useCardEditorContext } from "../contexts/CardEditorContext";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { useRef } from "react";

const ItemType = "ITEM";

const DraggableItem = ({ id, content, index, moveItem }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
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
    drop: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="fade-in-up my-2 w-full rounded-3xl"
      style={{
        transition: "transform 0.3s ease",
        opacity: isDragging ? 0.8 : 1,
        backgroundColor: isDragging
          ? "rgba(255, 255, 255, 0.2)"
          : "transparent",
        boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
        zIndex: isDragging ? 20 : 1,
        transformOrigin: "center",
      }}
    >
      {content}
    </div>
  );
};

DraggableItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
};

const SimpleCard = () => {
  const {
    texts,
    icons,
    simpleCardButtons,
    setEditingType,
    iconColor,
    iconSize,
    backgroundSettings,
    itemsOrder,
    setItemsOrder,
  } = useCardEditorContext();

  console.log("simple card itemsorder", itemsOrder);

  console.log("button in simple card", simpleCardButtons);

  const renderItems = () => {
    return itemsOrder.map((item) => {
      if (item.type === "text") {
        const textItem = texts.find(
          (text, index) => `text-${index + 1}` === item.id,
        );
        if (!textItem) return null;
        return (
          <DraggableItem
            key={item.id}
            id={item.id}
            content={
              <div
                style={getItemStyle(item.type, textItem)}
                onClick={() => {
                  setEditingType("text");
                }}
              >
                {textItem.text}
              </div>
            }
            index={itemsOrder.indexOf(item)}
            moveItem={moveItem}
          />
        );
      } else if (item.type === "button") {
        const buttonItem = simpleCardButtons.buttons.find(
          (button, index) => `button-${index + 1}` === item.id,
        );
        if (!buttonItem) return null;
        return (
          <DraggableItem
            key={item.id}
            id={item.id}
            content={
              <div onClick={() => setEditingType("button")} className="w-full">
                <button
                  style={getItemStyle(item.type)}
                  onClick={() => handleButtonClick(buttonItem.url)}
                >
                  {buttonItem.text}
                </button>
              </div>
            }
            index={itemsOrder.indexOf(item)}
            moveItem={moveItem}
          />
        );
      } else if (item.type === "icons") {
        return (
          <DraggableItem
            key={item.id}
            id={item.id}
            content={
              <div
                className={`${getItemStyle(item.type)} cursor-pointer`}
                onClick={() => setEditingType("icon")}
              >
                {icons.map((icon) => {
                  const IconComponent = icon.icon;

                  if (!IconComponent) {
                    console.error(
                      `IconComponent for ${icon.name} is undefined`,
                    );
                    return null;
                  }

                  const href =
                    icon.name === "Email" ? `mailto:${icon.href}` : icon.href;
                  return (
                    <a
                      key={icon.id}
                      href={href}
                      target={icon.name === "email" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                    >
                      <IconComponent size={iconSize} color={iconColor} />
                    </a>
                  );
                })}
              </div>
            }
            index={itemsOrder.indexOf(item)}
            moveItem={moveItem}
          />
        );
      }
      return null;
    });
  };

  //
  const moveItem = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const updatedItemsOrder = [...itemsOrder];
    const [movedItem] = updatedItemsOrder.splice(fromIndex, 1);
    updatedItemsOrder.splice(toIndex, 0, movedItem);

    setItemsOrder(updatedItemsOrder);
  };

  const handleButtonClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
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

  console.log("buttons in simplecard", simpleCardButtons);
  console.log("order in simpleCard", itemsOrder);

  return (
    <div className="card-container relative bg-white p-6 text-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: backgroundSettings.backgroundImage
            ? backgroundSettings.backgroundImage
            : "none",
          backgroundColor: backgroundSettings.backgroundColor || "none",
          opacity: backgroundSettings.opacity || 0.6,
          backgroundSize: backgroundSettings.backgroundSize || "cover",
          backgroundPosition: backgroundSettings.backgroundPosition || "center",
        }}
      />
      <div className="relative z-10 flex flex-col">{renderItems()}</div>
    </div>
  );
};

export default SimpleCard;
