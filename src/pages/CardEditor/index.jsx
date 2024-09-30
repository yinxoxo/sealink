import { useParams } from "react-router-dom";
import ArtCard from "../../cardTemplate/ArtCard";
import SimpleCard from "../../cardTemplate/SimpleCard";
import WoodCard from "../../cardTemplate/WoodCard";
import BreadCard from "../../cardTemplate/BreadCard";
import JiaCard from "../../cardTemplate/JiaCard";
import ForestCard from "../../cardTemplate/ForestCard";
import GalaxyCard from "../../cardTemplate/GalaxyCard";
import EditBoard from "./EditorBoard";
import ErrorMessage from "../../components/ErrorMessage";
import { useCardEditorContext } from "../../contexts/CardEditorContext/useCardEditorContext";

const CardEditor = () => {
  const { template } = useParams();
  return <CardEditorContent template={template} />;
};

const CardEditorContent = ({ template }) => {
  const { projectData } = useCardEditorContext();

  if (!projectData) return null;

  const {
    backgroundColor,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
  } = projectData.background || {};

  const backgroundSettings = {
    backgroundColor: backgroundColor || "none",
    backgroundImage: backgroundImage ? backgroundImage : "none",
    backgroundSize: backgroundSize || "cover",
    backgroundPosition: backgroundPosition || "center",
  };

  const renderTemplate = () => {
    switch (template) {
      case "SimpleCard":
        return <SimpleCard />;
      case "WoodCard":
        return <WoodCard />;
      case "ArtCard":
        return <ArtCard />;
      case "BreadCard":
        return <BreadCard />;
      case "JiaCard":
        return <JiaCard />;
      case "ForestCard":
        return <ForestCard />;
      case "GalaxyCard":
        return <GalaxyCard />;

      default:
        return <ErrorMessage message="No matching template found." />;
    }
  };

  return (
    <section className="flex h-full min-h-screen w-full overflow-y-auto">
      <div
        className="flex flex-[7] flex-col items-center"
        style={{ ...backgroundSettings, opacity: 1 }}
      >
        <div className="mr-[450px] w-[560px] flex-grow rounded-3xl">
          {renderTemplate()}
        </div>
      </div>
      <EditBoard />
    </section>
  );
};

export default CardEditor;
