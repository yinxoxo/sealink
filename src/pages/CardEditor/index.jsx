import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ArtCard from "../../CardTemplate/ArtCard";
import SimpleCard from "../../CardTemplate/SimpleCard";
import BusinessCard from "../../CardTemplate/BusinessCard";
import EditBoard from "./EditorBoard";
import ErrorMessage from "../../components/ErrorMessage";
import { useCardEditorContext } from "../../contexts/CardEditorContext";

const CardEditor = () => {
  const { template, projectId } = useParams();
  const { setProjectId } = useCardEditorContext();

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);
      // console.log("set project id:", projectId);
    }
  }, [projectId, setProjectId]);

  return <CardEditorContent template={template} />;
};

const CardEditorContent = ({ template }) => {
  const { backgroundSettings, setBackgroundSettings } = useCardEditorContext();

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
    let backgroundConfig;

    switch (template) {
      case "SimpleCard":
        backgroundConfig = backgroundSettings;
        break;
      case "ArtCard":
      case "BusinessCard":
        backgroundConfig = {};
        break;
      default:
        backgroundConfig = null;
    }

    if (backgroundConfig) {
      setBackgroundSettings((prevSettings) => {
        const newSettings = {
          backgroundColor: backgroundConfig.backgroundColor || "none",
          backgroundImage: backgroundConfig.backgroundImage
            ? backgroundConfig.backgroundImage
            : "none",
          backgroundSize: backgroundConfig.backgroundSize || "cover",
          backgroundPosition: backgroundConfig.backgroundPosition || "center",
        };

        if (JSON.stringify(prevSettings) !== JSON.stringify(newSettings)) {
          return newSettings;
        }
        return prevSettings;
      });
    }
  }, [template, setBackgroundSettings]);

  return (
    <section className="ml-64 flex h-full min-h-screen w-full overflow-y-auto">
      <div
        className="flex flex-[7] flex-col items-center"
        style={{
          backgroundColor: backgroundSettings.backgroundColor,
          backgroundImage: backgroundSettings.backgroundImage,
          backgroundSize: backgroundSettings.backgroundSize,
          backgroundPosition: backgroundSettings.backgroundPosition,
        }}
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
