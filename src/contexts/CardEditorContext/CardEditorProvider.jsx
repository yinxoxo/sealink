import { createContext, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import initialArtCardContent from "../../cardTemplate/cardContent/initialArtCardContent";
import initialBreadCardContent from "../../cardTemplate/cardContent/initialBreadCardContent";
import initialForestCardContent from "../../cardTemplate/cardContent/initialForestCardContent";
import initialGalaxyCardContent from "../../cardTemplate/cardContent/initialGalaxyCardContent";
import initialJiaCardContent from "../../cardTemplate/cardContent/initialJiaCardContent";
import initialNinaWishCardContent from "../../cardTemplate/cardContent/initialNinaWishCardContent";
import initialSimpleCardContent from "../../cardTemplate/cardContent/initialSimpleCardContent";
import initialWoodCardContent from "../../cardTemplate/cardContent/initialWoodCardContent";
import { useProjects } from "../ProjectContext/useProjects";

export const CardEditorContext = createContext();
export const CardEditorProvider = ({ children }) => {
  const location = useLocation();
  const { projectId, template } = useParams();
  const { projects } = useProjects();

  const [editingType, setEditingType] = useState("text");
  const [selectedText, setSelectedText] = useState(null);
  const [projectData, setProjectData] = useState(null);

  const isCardEditorPage = location.pathname.startsWith(
    "/dashboard/card-editor",
  );

  useMemo(() => {
    if (projects && projects.length > 0 && projectId) {
      const project = projects.find((p) => p.id === projectId);
      setProjectData(project || null);
    } else if (isCardEditorPage && !projectId) {
      let templateData;
      switch (template) {
        case "WoodCard":
          templateData = { ...initialWoodCardContent };
          break;
        case "SimpleCard":
          templateData = { ...initialSimpleCardContent };
          break;
        case "ArtCard":
          templateData = { ...initialArtCardContent };
          break;
        case "BreadCard":
          templateData = { ...initialBreadCardContent };
          break;
        case "JiaCard":
          templateData = { ...initialJiaCardContent };
          break;
        case "ForestCard":
          templateData = { ...initialForestCardContent };
          break;
        case "GalaxyCard":
          templateData = { ...initialGalaxyCardContent };
          break;
        case "NinaWishCard":
          templateData = { ...initialNinaWishCardContent };
          break;
        default:
          console.error(
            "The corresponding template information cannot be found",
          );
          templateData = null;
      }
      setProjectData(templateData);
    }
  }, [projects, projectId, template, isCardEditorPage]);

  const contextValue = {
    projectData,
    setProjectData,
    projectId,
    editingType,
    setEditingType,
    selectedText,
    setSelectedText,
  };

  return (
    <CardEditorContext.Provider value={contextValue}>
      {children}
    </CardEditorContext.Provider>
  );
};
