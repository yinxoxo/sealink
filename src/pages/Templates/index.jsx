import { useNavigate } from "react-router-dom";
import Card from "../../CardTemplate/Card"; // 模板1
import Card2 from "../../CardTemplate/Card2"; // 模板2

const Template = () => {
  const navigate = useNavigate();

  const handleTemplateClick = (template) => {
    console.log("click", template);
    navigate(`/dashboard/card-editor/${template}`);
  };

  return (
    <section className="flex flex-wrap justify-center">
      <div
        className="m-4 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-gray-300"
        style={{ width: "300px", height: "650px" }}
        onClick={() => handleTemplateClick("Card")}
      >
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <Card />
        </div>
      </div>

      <div
        className="m-4 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-gray-300"
        style={{ width: "300px", height: "650px" }}
        onClick={() => handleTemplateClick("Card2")}
      >
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <Card2 />
        </div>
      </div>
    </section>
  );
};

export default Template;
