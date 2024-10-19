import { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { useCardEditorContext } from "../../contexts/CardEditorContext/useCardEditorContext";
import ArtCard from "../../features/cardTemplate/components/ArtCard";
import BreadCard from "../../features/cardTemplate/components/BreadCard";
import ForestCard from "../../features/cardTemplate/components/ForestCard";
import GalaxyCard from "../../features/cardTemplate/components/GalaxyCard";
import JiaCard from "../../features/cardTemplate/components/JiaCard";
import NinaWishCard from "../../features/cardTemplate/components/NinaWishCard";
import SimpleCard from "../../features/cardTemplate/components/SimpleCard";
import WoodCard from "../../features/cardTemplate/components/WoodCard";
import EditBoard from "./EditorBoard";

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
    <section className="relative flex w-full flex-col overflow-y-auto lg:h-full lg:min-h-screen xl:flex-row xl:items-center">
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          ...backgroundSettings,
        }}
      />

      <div className="relative z-10 mt-[60px] flex flex-grow flex-col items-center xl:mt-0 xl:h-screen">
        <div
          className={`overflow-y-auto rounded-3xl shadow-2xl xl:my-auto ${
            isMobile
              ? "h-[717px] w-[340px] lg:h-[801px] lg:w-[380px] 2xl:h-[1012px] 2xl:w-[480px]"
              : "h-[calc(56.25vw)] w-[calc(100vw-200px)] xl:max-h-[426px] xl:max-w-[720px] 2xl:max-h-[636px] 2xl:max-w-[1080px]"
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
