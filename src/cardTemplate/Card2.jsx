import { FaFacebook, FaGithub } from "react-icons/fa";
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

const Card2 = () => {
  const buttons = [
    { id: uuidv4(), text: "VISIT MY WEBSITE" },
    { id: uuidv4(), text: "MY SERVICES" },
    { id: uuidv4(), text: "READ MY BLOG" },
    { id: uuidv4(), text: "CONNECT WITH ME" },
  ];

  const icons = [
    { id: uuidv4(), icon: <FaFacebook size={30} color="#d1c3a1" />, link: "#" },
    { id: uuidv4(), icon: <FaGithub size={30} color="#d1c3a1" />, link: "#" },
  ];

  const [items, setItems] = useState([
    ...buttons.map((button) => ({
      id: button.id,
      content: (
        <button
          key={button.id}
          className="my-2 block w-full rounded-l-none rounded-r-full bg-[#87794e] py-3 text-white hover:bg-[#746945]"
        >
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
      <div className="relative mx-auto min-h-full w-full rounded-lg bg-[#f5f3ee] p-4 shadow-lg">
        <div className="flex items-center justify-center bg-transparent p-4">
          <h1 className="font-serif text-4xl text-[#8d4925]">SHEILA</h1>
        </div>

        <div className="relative bg-transparent p-6">
          <div className="flex flex-row items-center">
            <div className="flex h-full w-1/2 items-center justify-center bg-[#d1c3a1] p-4">
              <div>
                <h2 className="text-4xl font-bold text-[#8d4925]">HI!</h2>
                <p className="mt-2 font-bold text-[#554f46]">I AM SHEILA</p>
              </div>
            </div>

            <div className="relative h-full w-1/2 overflow-hidden rounded-br-[50%] bg-[#d04d37]">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1720048171419-b515a96a73b8?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="profile"
              />
            </div>
          </div>
        </div>

        <div className="bg-transparent p-6">
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

export default Card2;
