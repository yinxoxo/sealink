import { useState } from "react";
import { useParams } from "react-router-dom";
import ArtCard from "../../cardTemplate/ArtCard";
import SimpleCard from "../../cardTemplate/SimpleCard";
import WoodCard from "../../cardTemplate/WoodCard";
import BreadCard from "../../cardTemplate/BreadCard";
import JiaCard from "../../cardTemplate/JiaCard";
import ForestCard from "../../cardTemplate/ForestCard";
import GalaxyCard from "../../cardTemplate/GalaxyCard";
import NinaWishCard from "../../cardTemplate/NinaWishCard";
import EditBoard from "./EditorBoard";
import ErrorMessage from "../../components/ErrorMessage";
import { useCardEditorContext } from "../../contexts/CardEditorContext/useCardEditorContext";

const CardEditor = () => {
  const { template } = useParams();
  return <CardEditorContent template={template} />;
};

const CardEditorContent = ({ template }) => {
  const [isMobile, setIsMobile] = useState(true);
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
      case "NinaWishCard":
        return <NinaWishCard />;

      default:
        return <ErrorMessage message="No matching template found." />;
    }
  };

  return (
    <section className="flex h-fit min-h-screen w-full items-center overflow-y-auto">
      <div
        className={`flex max-h-screen flex-[7] flex-col items-center ${
          isMobile ? "" : "pb-[120px] pt-[120px]"
        }`}
        style={{ ...backgroundSettings, opacity: 1 }}
      >
        <div
          className={`my-auto overflow-y-auto pr-[450px] ${
            isMobile
              ? "aspect-[9/16] max-h-screen w-[70%] min-w-[300px]"
              : "aspect-[16/9] max-h-screen w-full"
          }`}
        >
          {renderTemplate()}
        </div>
      </div>
      <EditBoard isMobile={isMobile} setIsMobile={setIsMobile} />
    </section>
  );
};

export default CardEditor;
