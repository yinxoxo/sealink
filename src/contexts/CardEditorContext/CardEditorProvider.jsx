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
  const [projectData, setProjectData] = useState(null);
  const [editingType, setEditingType] = useState("text");
  const [selectedText, setSelectedText] = useState(null);

  const isDashboardPage = location.pathname === "/dashboard";
  const isCardEditorPage = location.pathname.startsWith(
    "/dashboard/card-editor",
  );

  const currentProject = useMemo(() => {
    return projects && projects.length > 0 && projectId
      ? projects.find((p) => p.id === projectId)
      : null;
  }, [projects, projectId]);

  if (!projectId && !projectData && isCardEditorPage) {
    if (template === "WoodCard") {
      setProjectData({ ...initialWoodCardContent });
    } else if (template === "SimpleCard") {
      setProjectData({ ...initialSimpleCardContent });
    } else if (template === "ArtCard") {
      setProjectData({ ...initialArtCardContent });
    } else if (template === "BreadCard") {
      setProjectData({ ...initialBreadCardContent });
    } else if (template === "JiaCard") {
      setProjectData({ ...initialJiaCardContent });
    } else if (template === "ForestCard") {
      setProjectData({ ...initialForestCardContent });
    } else if (template === "GalaxyCard") {
      setProjectData({ ...initialGalaxyCardContent });
    } else if (template === "NinaWishCard") {
      setProjectData({ ...initialNinaWishCardContent });
    } else {
      console.error("找不到對應的模板資料");
      return;
    }
  }

  if (currentProject && !projectData) {
    setProjectData(currentProject);
  }

  const contextValue = {
    projectData,
    setProjectData,
    projectId,
    editingType,
    setEditingType,
    selectedText,
    setSelectedText,
    currentProject,
  };

  return (
    <CardEditorContext.Provider value={contextValue}>
      {children}
    </CardEditorContext.Provider>
  );
};
