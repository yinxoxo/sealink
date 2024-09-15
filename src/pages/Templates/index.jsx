import { useNavigate } from "react-router-dom";
import SimpleCard from "../../CardTemplate/SimpleCard";
import ArtCard from "../../CardTemplate/ArtCard";
import BusinessCard from "../../CardTemplate/BusinessCard";

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
          <SimpleCard />
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
