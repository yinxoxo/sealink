import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArtCard from "../../CardTemplate/ArtCard";
import SimpleCard from "../../CardTemplate/SimpleCard";
import BusinessCard from "../../CardTemplate/BusinessCard";
import EditBoard from "./EditorBoard";
import ErrorMessage from "../../components/ErrorMessage";
import { initialSimpleCardContent } from "../../cardTemplate/cardContent/initialSimpleCardContent";
import { ICON_LIST, ICON_STYLE } from "../../CardTemplate/cardContent/iconList";

const CardEditor = () => {
  const { template } = useParams();
  const [editingType, setEditingType] = useState(null);
  const [iconColor, setIconColor] = useState(ICON_STYLE.SimpleCard.color);
  const [iconSize, setIconSize] = useState(ICON_STYLE.SimpleCard.size);

  const handleIconClick = () => {
    setEditingType("icon");
  };

  const handleTextClick = () => {
    setEditingType("text");
  };

  const handleButtonClick = () => {
    setEditingType("button");
  };

  const handleBackgroundClick = () => {
    setEditingType("background");
  };

  const [hydraText, setHydraText] = useState(
    initialSimpleCardContent.title.text,
  );
  const [juiceText, setJuiceText] = useState(
    initialSimpleCardContent.subtitle.text,
  );
  const [descriptionText, setDescriptionText] = useState(
    initialSimpleCardContent.description.text,
  );
  const [icons, setIcons] = useState(ICON_LIST.slice(0, 3));

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

  const [simpleCardButtons, setSimpleCardButtons] = useState({
    buttons: [...initialSimpleCardContent.buttons.buttonList],
    style: { ...initialSimpleCardContent.buttons.style },
  });

  const [backgroundStyle, setBackgroundStyle] = useState({});

  const [backgroundSettings, setBackgroundSettings] = useState({
    ...initialSimpleCardContent.backgroundSettings,
  });

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
            icons={icons}
            onIconsClick={handleIconClick}
            onTextClick={handleTextClick}
            onButtonClick={handleButtonClick}
            onBackgroundClick={handleBackgroundClick}
            iconStyle={{
              ...ICON_STYLE.SimpleCard,
              color: iconColor,
              size: iconSize,
            }}
            simpleCardButtons={simpleCardButtons}
            backgroundSettings={backgroundSettings}
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
    let backgroundSettings;

    switch (template) {
      case "SimpleCard":
        backgroundSettings = initialSimpleCardContent.backgroundSettings;
        break;
      case "ArtCard":
        backgroundSettings = {};
        break;
      case "BusinessCard":
        backgroundSettings = {};
        break;
      default:
        backgroundSettings = null;
    }

    if (backgroundSettings) {
      setBackgroundStyle({
        backgroundColor: backgroundSettings.backgroundColor
          ? backgroundSettings.backgroundColor
          : "none",
        backgroundImage: backgroundSettings.backgroundImage
          ? `url(${backgroundSettings.backgroundImage})`
          : "none",

        backgroundSize: backgroundSettings.backgroundSize || "cover",
        backgroundPosition: backgroundSettings.backgroundPosition || "center",
      });
    } else {
      setBackgroundStyle({
        backgroundColor: "white",
        backgroundImage: "none",
      });
    }
  }, [template]);

  useEffect(() => {
    if (backgroundSettings) {
      setBackgroundStyle({
        backgroundColor: backgroundSettings.backgroundColor || "white",
        backgroundImage: backgroundSettings.backgroundImage
          ? `url(${backgroundSettings.backgroundImage})`
          : "none",
        backgroundSize: backgroundSettings.backgroundSize || "cover",
        backgroundPosition: backgroundSettings.backgroundPosition || "center",
      });
    }
  }, [backgroundSettings]);

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
        icons={icons}
        setIcons={setIcons}
        editingType={editingType}
        iconList={ICON_LIST}
        iconStyle={{ color: iconColor, size: iconSize }}
        setIconStyle={({ color, size }) => {
          setIconColor(color);
          setIconSize(size);
        }}
        simpleCardButtons={simpleCardButtons}
        setSimpleCardButtons={setSimpleCardButtons}
        backgroundSettings={backgroundSettings}
        setBackgroundSettings={setBackgroundSettings}
        onBackgroundClick={handleBackgroundClick}
      />
    </section>
  );
};

export default CardEditor;
