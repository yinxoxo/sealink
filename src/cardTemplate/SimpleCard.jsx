import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

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
  const [items] = useState([
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
  ]);

  return (
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
          onClick={() => {
            setSelectedText("hydraText");
            onTextClick();
          }}
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
          onClick={() => {
            setSelectedText("juiceText");
            onTextClick();
          }}
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
          className="mb-4 cursor-pointer text-gray-500"
          onClick={() => {
            setSelectedText("descriptionText");
            onTextClick();
          }}
          style={{
            fontSize: `${descriptionTextStyle.fontSize}px`,
            fontWeight: descriptionTextStyle.fontWeight,
            color: descriptionTextStyle.color,
            fontFamily: descriptionTextStyle.fontFamily,
          }}
        >
          {descriptionText}
        </p>

        <div
          className="mb-7 mt-3 flex justify-center space-x-4"
          onClick={() => onIconsClick(icons)}
        >
          {icons.map((icon) => {
            const IconComponent = icon.icon;
            return (
              <a
                key={icon.id}
                href={icon.href}
                className="text-gray-500 hover:text-gray-700"
              >
                <IconComponent size={iconStyle.size} color={iconStyle.color} />
              </a>
            );
          })}
        </div>

        <div>
          {items.map((item) =>
            item && item.id ? (
              <div key={item.id} className="my-2 w-full">
                {item.content}
              </div>
            ) : null,
          )}
        </div>
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
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    }),
  ).isRequired,
  onIconsClick: PropTypes.func.isRequired,
  onTextClick: PropTypes.func.isRequired,
  iconStyle: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.number,
  }).isRequired,
};
