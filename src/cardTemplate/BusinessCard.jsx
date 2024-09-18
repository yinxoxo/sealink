import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import { useState, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";

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
    hover(item) {
      if (!drag) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

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

const BusinessCard = () => {
  const buttons = [
    {
      id: uuidv4(),
      text: "Our shop",
    },
    {
      id: uuidv4(),
      text: "Find us",
    },
  ];

  const icons = [
    { id: uuidv4(), icon: <FaLinkedin size={30} color="#fff" />, link: "#" },
    { id: uuidv4(), icon: <FaInstagram size={30} color="#fff" />, link: "#" },
    { id: uuidv4(), icon: <FaGithub size={30} color="#fff" />, link: "#" },
    { id: uuidv4(), icon: <FaEnvelope size={30} color="#fff" />, link: "#" },
  ];

  const [items, setItems] = useState(
    buttons.map((button) => ({
      id: button.id,
      content: (
        <button className="my-2 w-full rounded-full bg-[#A89F94] py-4 text-white transition hover:bg-[#8e867c]">
          {button.text}
        </button>
      ),
    })),
  );

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedItem = items[dragIndex];
      const updatedItems = [...items];
      updatedItems.splice(dragIndex, 1);
      updatedItems.splice(hoverIndex, 0, draggedItem);
      setItems(updatedItems);
    },
    [items],
  );

  return (
    <div
      className="card-container"
      style={{
        backgroundColor: BusinessCard.backgroundSettings.backgroundColor,
      }}
    >
      <div className="relative w-full rounded-lg">
        <div
          className="absolute inset-0 top-0 h-[200px] bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1725714354686-0a8b522037bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />

        <div className="relative z-10 flex justify-center pt-[140px]">
          <img
            src="https://plus.unsplash.com/premium_photo-1673757121102-0ca51260861f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile"
            className="h-40 w-40 rounded-full border-4 border-white object-cover"
          />
        </div>

        <div className="mt-4 text-center">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            YOUR NAME
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Professional title | Company
          </p>
        </div>

        <div className="mt-6 text-center text-gray-600">
          <p className="text-sm">+46 123456789</p>
          <p className="text-sm">hello@domain.com</p>
          <p className="text-sm">Street name 65, 123 45, City</p>
        </div>

        <div className="mt-6 px-5">
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

        <div className="mt-6 flex w-full justify-center space-x-6 bg-[#A89F94] p-2">
          {icons.map((icon) => (
            <a
              key={icon.id}
              href={icon.link}
              className="text-gray-100 hover:text-gray-700"
            >
              {icon.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

BusinessCard.backgroundSettings = {
  backgroundColor: "#f1f1f1",
};

export default BusinessCard;
