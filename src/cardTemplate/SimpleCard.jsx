import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

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

const SimpleCard = ({
  hydraText,
  juiceText,
  descriptionText,
  setSelectedText,
  hydraTextStyle = {},
  juiceTextStyle = {},
  descriptionTextStyle = {},
  icons,
  onIconsClick,
  onTextClick,
  iconStyle,
}) => {
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
    {
      id: uuidv4(),
      type: "button",
      content: "Our drinks",
    },
    {
      id: uuidv4(),
      type: "button",
      content: "Find us",
    },
    {
      id: uuidv4(),
      type: "button",
      content: "Wellbeing",
    },
  ]);

  useEffect(() => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.type === "hydra") return { ...item, content: hydraText };
        if (item.type === "h2") return { ...item, content: juiceText };
        if (item.type === "p") return { ...item, content: descriptionText };
        return item;
      });
    });
  }, [hydraText, juiceText, descriptionText]);

  const moveItem = (fromIndex, toIndex) => {
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
            "relative min-h-fit w-auto flex items-center justify-center p-[48px]",
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
        return "w-full rounded-full bg-gray-200 py-4";
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
          backgroundImage: SimpleCard.backgroundSettings.backgroundImage,
          opacity: 0.6,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
                  <div className={getItemStyle(item.type).wrapper}>
                    <div
                      className={getItemStyle(item.type).circle}
                      style={{ zIndex: 1 }}
                      onClick={() => {
                        setSelectedText("hydraText");
                        onTextClick();
                      }}
                    />

                    <h1
                      className="relative z-10 cursor-pointer"
                      style={getItemStyle(item.type).text}
                    >
                      {item.content}
                    </h1>
                  </div>
                ) : item.type === "button" ? (
                  <button className={getItemStyle(item.type)}>
                    {item.content}
                  </button>
                ) : item.type === "icons" ? (
                  <div
                    className={getItemStyle(item.type)}
                    onClick={() => onIconsClick(icons)}
                  >
                    {icons.map((icon) => {
                      const IconComponent = icon.icon;
                      return (
                        <a
                          key={icon.id}
                          href={icon.href}
                          className="text-gray-500 hover:text-gray-700"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconComponent
                            size={iconStyle.size}
                            color={iconStyle.color}
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
                      onTextClick();
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

SimpleCard.backgroundSettings = {
  backgroundImage:
    "url('https://images.unsplash.com/photo-1725785897139-1a7834b62e2f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
};

export default SimpleCard;

SimpleCard.propTypes = {
  hydraText: PropTypes.string.isRequired,
  juiceText: PropTypes.string.isRequired,
  descriptionText: PropTypes.string.isRequired,
  setSelectedText: PropTypes.func,
  hydraTextStyle: PropTypes.shape({
    fontSize: PropTypes.number,
    fontWeight: PropTypes.string,
    color: PropTypes.string,
  }),
  juiceTextStyle: PropTypes.shape({
    fontSize: PropTypes.number,
    fontWeight: PropTypes.string,
    color: PropTypes.string,
  }),
  descriptionTextStyle: PropTypes.shape({
    fontSize: PropTypes.number,
    fontWeight: PropTypes.string,
    color: PropTypes.string,
  }),
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    }),
  ).isRequired,
  onIconsClick: PropTypes.func,
  onTextClick: PropTypes.func,
  iconStyle: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.number,
  }).isRequired,
};
