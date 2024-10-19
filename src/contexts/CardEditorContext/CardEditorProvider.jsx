import PropTypes from "prop-types";
import { createContext, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import initialArtCardContent from "../../features/cardTemplate/data/initialArtCardContent";
import initialBreadCardContent from "../../features/cardTemplate/data/initialBreadCardContent";
import initialForestCardContent from "../../features/cardTemplate/data/initialForestCardContent";
import initialGalaxyCardContent from "../../features/cardTemplate/data/initialGalaxyCardContent";
import initialJiaCardContent from "../../features/cardTemplate/data/initialJiaCardContent";
import initialNinaWishCardContent from "../../features/cardTemplate/data/initialNinaWishCardContent";
import initialSimpleCardContent from "../../features/cardTemplate/data/initialSimpleCardContent";
import initialWoodCardContent from "../../features/cardTemplate/data/initialWoodCardContent";
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

CardEditorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
