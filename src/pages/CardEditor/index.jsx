import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArtCard from "../../CardTemplate/ArtCard";
import SimpleCard from "../../CardTemplate/SimpleCard";
import BusinessCard from "../../CardTemplate/BusinessCard";
import EditBoard from "./EditorBoard";
import ErrorMessage from "../../components/ErrorMessage";

const CardEditor = () => {
  const { template } = useParams();
  const [backgroundStyle, setBackgroundStyle] = useState({});

  const renderTemplate = () => {
    switch (template) {
      case "SimpleCard":
        return <SimpleCard />;
      case "ArtCard":
        return <ArtCard />;
      case "BusinessCard":
        return <BusinessCard />;
      default:
        return <ErrorMessage message="No matching template found." />;
    }
  };

  useEffect(() => {
    let selectedCard;
    switch (template) {
      case "SimpleCard":
        selectedCard = SimpleCard;
        break;
      case "ArtCard":
        selectedCard = ArtCard;
        break;
      case "BusinessCard":
        selectedCard = BusinessCard;
        break;
      default:
        selectedCard = null;
    }

    if (selectedCard && selectedCard.backgroundSettings) {
      setBackgroundStyle({
        backgroundColor:
          selectedCard.backgroundSettings.backgroundColor || "white",
        backgroundImage:
          selectedCard.backgroundSettings.backgroundImage || "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      });
    } else {
      setBackgroundStyle({
        backgroundColor: "white",
        backgroundImage: "none",
      });
    }
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
