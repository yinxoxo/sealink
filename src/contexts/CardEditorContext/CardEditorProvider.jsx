import { useState, useMemo } from "react";
import { createContext } from "react";
import { useProjects } from "../ProjectContext/useProjects";
import initialSimpleCardContent from "../../cardTemplate/cardContent/initialSimpleCardContent";
import initialWoodCardContent from "../../cardTemplate/cardContent/initialWoodCardContent";
import initialArtCardContent from "../../cardTemplate/cardContent/initialArtCardContent";
import initialBreadCardContent from "../../cardTemplate/cardContent/initialBreadCardContent";
import initialJiaCardContent from "../../cardTemplate/cardContent/initialJiaCardContent";
import initialForestCardContent from "../../cardTemplate/cardContent/initialForestCardContent";
import initialGalaxyCardContent from "../../cardTemplate/cardContent/initialGalaxyCardContent";
import initialNinaWishCardContent from "../../cardTemplate/cardContent/initialNinaWishCardContent";
import { useParams, useLocation } from "react-router-dom";

export const CardEditorContext = createContext();
export const CardEditorProvider = ({ children }) => {
  const location = useLocation();
  const { projectId, template } = useParams();
  const { projects } = useProjects();
  const [editingType, setEditingType] = useState("text");
  const [selectedText, setSelectedText] = useState(null);

  const isCardEditorPage = location.pathname.startsWith(
    "/dashboard/card-editor",
  );

  const projectData = useMemo(() => {
    if (projects && projects.length > 0 && projectId) {
      const project = projects.find((p) => p.id === projectId);
      return project || null;
    } else if (isCardEditorPage && !projectId) {
      switch (template) {
        case "WoodCard":
          return { ...initialWoodCardContent };
        case "SimpleCard":
          return { ...initialSimpleCardContent };
        case "ArtCard":
          return { ...initialArtCardContent };
        case "BreadCard":
          return { ...initialBreadCardContent };
        case "JiaCard":
          return { ...initialJiaCardContent };
        case "ForestCard":
          return { ...initialForestCardContent };
        case "GalaxyCard":
          return { ...initialGalaxyCardContent };
        case "NinaWishCard":
          return { ...initialNinaWishCardContent };
        default:
          console.error(
            "The corresponding template information cannot be found",
          );
          return null;
      }
    } else {
      return null;
    }
  }, [projects, projectId, template, isCardEditorPage]);

  const contextValue = {
    projectData,
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
