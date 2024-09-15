import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa6";
import { useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const DraggableItem = ({ id, children, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "item",
    hover(item, monitor) {
      if (!drag) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {children}
    </div>
  );
};

DraggableItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
};

const Card = () => {
  const buttons = [
    { id: uuidv4(), text: "Our drinks" },
    { id: uuidv4(), text: "Find us" },
    { id: uuidv4(), text: "Wellbeing" },
  ];

  const icons = [
    { id: uuidv4(), icon: <FaFacebook size={30} color="#fff" />, link: "#" },
    { id: uuidv4(), icon: <FaGithub size={30} color="#fff" />, link: "#" },
    {
      id: uuidv4(),
      icon: <FaInstagram size={30} color="#fff" />,
      link: "#",
    },
  ];

  const [items, setItems] = useState([
    {
      id: uuidv4(),
      content: (
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-800">
          <h1 className="text-2xl font-bold text-orange-500">Hydra</h1>
        </div>
      ),
    },
    {
      id: uuidv4(),
      content: <h2 className="mt-4 text-lg font-semibold">Hydra Juice</h2>,
    },
    {
      id: uuidv4(),
      content: (
        <p className="mb-8 text-gray-500">Your daily dose of vitamin C</p>
      ),
    },
    ...buttons.map((button) => ({
      id: button.id,
      content: (
        <button className="my-2 w-full rounded-full bg-gray-200 py-4 transition hover:bg-gray-300">
          {button.text}
        </button>
      ),
    })),
    {
      id: uuidv4(),
      content: (
        <div className="mt-6 flex justify-center space-x-4">
          {icons.map((icon) => (
            <a
              key={icon.id}
              href={icon.link}
              className="text-gray-500 hover:text-gray-700"
            >
              {icon.icon}
            </a>
          ))}
        </div>
      ),
    },
  ]);

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const draggedItem = newItems[dragIndex];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, draggedItem);
      return newItems;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative min-h-full w-full rounded-xl bg-white p-6 text-center shadow-lg">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: Card.backgroundSettings.backgroundImage,
            opacity: 0.6,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10">
          {items.map((item, index) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              index={index}
              moveItem={moveItem}
            >
              {item.content}
            </DraggableItem>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

Card.backgroundSettings = {
  backgroundImage:
    "url('https://images.unsplash.com/photo-1725785897139-1a7834b62e2f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
};

export default Card;
