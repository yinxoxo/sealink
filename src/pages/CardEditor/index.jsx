import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card2 from "../../CardTemplate/Card2";
import Card from "../../CardTemplate/Card";
import BusinessCard from "../../CardTemplate/BusinessCard";
import EditBoard from "./EditorBoard";

const CardEditor = () => {
  const { template } = useParams();
  const [backgroundStyle, setBackgroundStyle] = useState({});

  const renderTemplate = () => {
    switch (template) {
      case "Card":
        return <Card />;
      case "Card2":
        return <Card2 />;
      case "BusinessCard":
        return <BusinessCard />;
      default:
        return <Card />;
    }
  };

  useEffect(() => {
    let selectedCard;
    switch (template) {
      case "Card":
        selectedCard = Card;
        break;
      case "Card2":
        selectedCard = Card2;
        break;
      case "BusinessCard":
        selectedCard = BusinessCard;
        break;
      default:
        selectedCard = Card;
    }

    setBackgroundStyle({
      backgroundColor:
        selectedCard.backgroundSettings.backgroundColor || "white",
      backgroundImage:
        selectedCard.backgroundSettings.backgroundImage || "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
    });
  }, [template]);

  return (
    <section className="ml-64 flex h-full min-h-screen w-full overflow-y-auto border-2 border-solid border-neutral-300">
      <div
        className="flex flex-[7] flex-col items-center border-2 border-solid border-neutral-300"
        style={backgroundStyle}
      >
        <div className="w-[560px] flex-grow rounded-3xl">
          {renderTemplate()}
        </div>
      </div>
      <EditBoard />
    </section>
  );
};

export default CardEditor;
