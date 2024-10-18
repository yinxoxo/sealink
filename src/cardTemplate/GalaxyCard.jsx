import PropTypes from "prop-types";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useLocation } from "react-router-dom";
import { ICON_MAP } from "../cardTemplate/cardContent/iconList";
import { useCardEditorContext } from "../contexts/CardEditorContext/useCardEditorContext";

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

const GalaxyCard = ({ data }) => {
  const location = useLocation();

  const {
    projectData: contextProjectData,
    setProjectData,
    setEditingType,
  } = useCardEditorContext();

  const isTemplatesPage = location.pathname === "/templates";
  const isDashboardPage = location.pathname === "/dashboard";
  const isDeployPage = location.pathname.includes("/sealink");

  const projectData =
    isTemplatesPage || isDashboardPage || isDeployPage
      ? data
      : contextProjectData;

  if (!projectData) return <div>No project data available</div>;

  const icons = projectData.socialLinks.iconList.map((link) => ({
    icon: ICON_MAP[link.name],
    id: link.id,
    href: link.href,
    name: link.name,
  }));

  const iconColor = projectData.socialLinks?.style?.color;
  const iconSize = projectData.socialLinks?.style?.size;

  const { itemsOrder } = projectData;

  const renderItems = () => {
    return itemsOrder.map((item) => {
      if (item.type === "avatar" && projectData.avatar?.image) {
        const avatar = projectData.avatar;
        return (
          <DraggableItem
            key={item.id}
            id={item.id}
            content={
              <div
                className="flex w-full items-center justify-center"
                onClick={() => setEditingType("avatar")}
              >
                <img
                  src={avatar.image}
                  alt="Avatar"
                  style={getItemStyle(item.type)}
                />
              </div>
            }
            index={itemsOrder.indexOf(item)}
            moveItem={moveItem}
          />
        );
      }

      if (item.type === "text") {
        const textItem = projectData.texts.find((text) => text.id == item.id);
        if (!textItem) return null;
        return (
          <DraggableItem
            key={item.id}
            id={item.id}
            content={
              <div
                className="px-3"
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
        const buttonItem = projectData.buttons.buttonList.find(
          (button) => button.id === item.id,
        );
        if (!buttonItem) return null;
        return (
          <DraggableItem
            key={item.id}
            id={item.id}
            content={
              <div onClick={() => setEditingType("button")} className="w-full">
                <button
                  className="max-w-[540px]"
                  style={getItemStyle(item.type)}
                  data-url={buttonItem.url}
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
                      id={icon.id}
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
  const moveItem = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const updatedItemsOrder = [...itemsOrder];
    const [movedItem] = updatedItemsOrder.splice(fromIndex, 1);
    updatedItemsOrder.splice(toIndex, 0, movedItem);

    setProjectData((prevData) => ({
      ...prevData,
      itemsOrder: updatedItemsOrder,
    }));
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
          backgroundColor: projectData.buttons.style.backgroundColor,
          width: projectData.buttons.style.width,
          color: projectData.buttons.style.color,
          borderRadius: projectData.buttons.style.borderRadius,
          padding: projectData.buttons.style.padding,
          fontSize: projectData.buttons.style.fontSize,
          fontWeight: projectData.buttons.style.fontWeight,
          fontFamily: projectData.buttons.style.fontFamily,
        };
      case "icons":
        return "flex justify-center space-x-4";
      case "avatar":
        return {
          width: projectData.avatar.style.width,
          height: projectData.avatar.style.height,
          borderRadius: "50%",
          overflow: "hidden",
          objectFit: "cover",
          cursor: "pointer",
        };
      default:
        return "";
    }
  };

  return (
    <div className="card-container p-6 text-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: projectData.background.backgroundImage
            ? projectData.background.backgroundImage
            : "none",
          backgroundColor: projectData.background.backgroundColor || "none",
          opacity: projectData.background.opacity || 0.6,
          backgroundSize: projectData.background.backgroundSize || "cover",
          backgroundPosition:
            projectData.background.backgroundPosition || "center",
        }}
      />
      <div className="relative z-10 flex flex-col">{renderItems()}</div>
    </div>
  );
};

export default GalaxyCard;
