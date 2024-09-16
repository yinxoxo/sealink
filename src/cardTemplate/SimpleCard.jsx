import { useState } from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "ITEM";

const DraggableItem = ({ id, content, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
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
}) => {
  const [items, setItems] = useState([
    {
      id: uuidv4(),
      content: (
        <button className="w-full rounded-full bg-gray-200 py-4">
          Our drinks
        </button>
      ),
    },
    {
      id: uuidv4(),
      content: (
        <button className="w-full rounded-full bg-gray-200 py-4">
          Find us
        </button>
      ),
    },
    {
      id: uuidv4(),
      content: (
        <button className="w-full rounded-full bg-gray-200 py-4">
          Wellbeing
        </button>
      ),
    },
    {
      id: uuidv4(),
      content: (
        <div className="mt-6 flex justify-center space-x-4">
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <FaFacebook size={30} color="#fff" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <FaGithub size={30} color="#fff" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <FaInstagram size={30} color="#fff" />
          </a>
        </div>
      ),
    },
  ]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="card-container bg-white p-6 text-center">
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
          <div
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-800"
            onClick={() => setSelectedText("hydraText")}
          >
            <h1
              className="cursor-pointer"
              style={{
                fontSize: `${hydraTextStyle.fontSize}px`,
                fontWeight: hydraTextStyle.fontWeight,
                color: hydraTextStyle.color,
                fontFamily: hydraTextStyle.fontFamily,
              }}
            >
              {hydraText}
            </h1>
          </div>

          <h2
            className="mt-4 cursor-pointer"
            onClick={() => setSelectedText("juiceText")}
            style={{
              fontSize: `${juiceTextStyle.fontSize}px`,
              fontWeight: juiceTextStyle.fontWeight,
              color: juiceTextStyle.color,
              fontFamily: juiceTextStyle.fontFamily,
            }}
          >
            {juiceText}
          </h2>

          <p
            className="mb-8 cursor-pointer text-gray-500"
            onClick={() => setSelectedText("descriptionText")}
            style={{
              fontSize: `${descriptionTextStyle.fontSize}px`,
              fontWeight: descriptionTextStyle.fontWeight,
              color: descriptionTextStyle.color,
              fontFamily: descriptionTextStyle.fontFamily,
            }}
          >
            {descriptionText}
          </p>

          <div>
            {items.map((item, index) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                index={index}
                content={item.content}
                moveItem={moveItem}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
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
  setSelectedText: PropTypes.func.isRequired,
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
};
