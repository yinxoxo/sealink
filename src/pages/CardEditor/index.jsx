import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArtCard from "../../CardTemplate/ArtCard";
import SimpleCard from "../../CardTemplate/SimpleCard";
import BusinessCard from "../../CardTemplate/BusinessCard";
import EditBoard from "./EditorBoard";
import ErrorMessage from "../../components/ErrorMessage";
import { initialSimpleCardContent } from "../../CardTemplate/cardContent/simpleCardContent";

const CardEditor = () => {
  const { template } = useParams();

  const [hydraText, setHydraText] = useState(
    initialSimpleCardContent.title.text,
  );
  const [juiceText, setJuiceText] = useState(
    initialSimpleCardContent.subtitle.text,
  );
  const [descriptionText, setDescriptionText] = useState(
    initialSimpleCardContent.description.text,
  );

  const [selectedText, setSelectedText] = useState(null);

  const [hydraTextStyle, setHydraTextStyle] = useState({
    fontSize: parseInt(initialSimpleCardContent.title.fontSize),
    fontWeight: initialSimpleCardContent.title.fontWeight,
    color: initialSimpleCardContent.title.color,
    fontFamily: initialSimpleCardContent.title.fontFamily,
  });

  const [juiceTextStyle, setJuiceTextStyle] = useState({
    fontSize: parseInt(initialSimpleCardContent.subtitle.fontSize),
    fontWeight: initialSimpleCardContent.subtitle.fontWeight,
    color: initialSimpleCardContent.subtitle.color,
    fontFamily: initialSimpleCardContent.subtitle.fontFamily,
  });

  const [descriptionTextStyle, setDescriptionTextStyle] = useState({
    fontSize: parseInt(initialSimpleCardContent.description.fontSize),
    fontWeight: initialSimpleCardContent.description.fontWeight,
    color: initialSimpleCardContent.description.color,
    fontFamily: initialSimpleCardContent.description.fontFamily,
  });

  const [backgroundStyle, setBackgroundStyle] = useState({});

  const renderTemplate = () => {
    switch (template) {
      case "SimpleCard":
        return (
          <SimpleCard
            hydraText={hydraText}
            juiceText={juiceText}
            descriptionText={descriptionText}
            setSelectedText={setSelectedText}
            hydraTextStyle={hydraTextStyle}
            juiceTextStyle={juiceTextStyle}
            descriptionTextStyle={descriptionTextStyle}
          />
        );
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
        <div className="mr-[450px] w-[560px] flex-grow rounded-3xl">
          {renderTemplate()}
        </div>
      </div>
      <EditBoard
        selectedText={selectedText}
        setHydraText={setHydraText}
        setJuiceText={setJuiceText}
        setDescriptionText={setDescriptionText}
        hydraText={hydraText}
        juiceText={juiceText}
        descriptionText={descriptionText}
        hydraTextStyle={hydraTextStyle}
        setHydraTextStyle={setHydraTextStyle}
        juiceTextStyle={juiceTextStyle}
        setJuiceTextStyle={setJuiceTextStyle}
        descriptionTextStyle={descriptionTextStyle}
        setDescriptionTextStyle={setDescriptionTextStyle}
      />
    </section>
  );
};

export default CardEditor;
