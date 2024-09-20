import { useNavigate } from "react-router-dom";
import SimpleCard from "../../CardTemplate/SimpleCard";
import ArtCard from "../../CardTemplate/ArtCard";
import BusinessCard from "../../CardTemplate/BusinessCard";
import { useCardEditorContext } from "../../contexts/CardEditorContext";

const Template = () => {
  const {
    hydraText,
    juiceText,
    descriptionText,
    hydraTextStyle,
    juiceTextStyle,
    descriptionTextStyle,
    icons,
    simpleCardButtons,
    backgroundSettings,
    iconColor,
    iconSize,
  } = useCardEditorContext();

  console.log("backgroundSet in template", backgroundSettings);

  const navigate = useNavigate();

  const handleTemplateClick = (template) => {
    navigate(`/dashboard/card-editor/${template}`);
  };

  return (
    <section className="flex flex-wrap justify-center">
      <div
        className="template-card"
        style={{ width: "300px", height: "650px" }}
        onClick={() => handleTemplateClick("SimpleCard")}
      >
        <div className="template-card-size">
          <SimpleCard
            hydraText={hydraText}
            juiceText={juiceText}
            descriptionText={descriptionText}
            icons={icons}
            iconColor={iconColor}
            iconSize={iconSize}
            hydraTextStyle={hydraTextStyle}
            juiceTextStyle={juiceTextStyle}
            descriptionTextStyle={descriptionTextStyle}
            simpleCardButtons={simpleCardButtons}
            backgroundSettings={backgroundSettings}
          />
        </div>
      </div>
      <div
        className="template-card"
        style={{ width: "300px", height: "650px" }}
        onClick={() => handleTemplateClick("ArtCard")}
      >
        <div className="template-card-size">
          <ArtCard />
        </div>
      </div>
      <div
        className="template-card"
        style={{ width: "300px", height: "650px" }}
        onClick={() => handleTemplateClick("BusinessCard")}
      >
        <div className="template-card-size">
          <BusinessCard />
        </div>
      </div>
    </section>
  );
};

export default Template;
