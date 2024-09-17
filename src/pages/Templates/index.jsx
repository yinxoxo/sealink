import { useNavigate } from "react-router-dom";
import SimpleCard from "../../CardTemplate/SimpleCard";
import ArtCard from "../../CardTemplate/ArtCard";
import BusinessCard from "../../CardTemplate/BusinessCard";
import { initialSimpleCardContent } from "../../CardTemplate/cardContent/simpleCardContent"; // 引入 initialSimpleCardContent

const Template = () => {
  const navigate = useNavigate();

  const handleTemplateClick = (template) => {
    console.log("click", template);
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
            hydraText={initialSimpleCardContent.title.text}
            juiceText={initialSimpleCardContent.subtitle.text}
            descriptionText={initialSimpleCardContent.description.text}
            icons={initialSimpleCardContent.icons}
            hydraTextStyle={{
              fontSize: parseInt(initialSimpleCardContent.title.fontSize),
              fontWeight: initialSimpleCardContent.title.fontWeight,
              color: initialSimpleCardContent.title.color,
              fontFamily: initialSimpleCardContent.title.fontFamily,
            }}
            juiceTextStyle={{
              fontSize: parseInt(initialSimpleCardContent.subtitle.fontSize),
              fontWeight: initialSimpleCardContent.subtitle.fontWeight,
              color: initialSimpleCardContent.subtitle.color,
              fontFamily: initialSimpleCardContent.subtitle.fontFamily,
            }}
            descriptionTextStyle={{
              fontSize: parseInt(initialSimpleCardContent.description.fontSize),
              fontWeight: initialSimpleCardContent.description.fontWeight,
              color: initialSimpleCardContent.description.color,
              fontFamily: initialSimpleCardContent.description.fontFamily,
            }}
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
