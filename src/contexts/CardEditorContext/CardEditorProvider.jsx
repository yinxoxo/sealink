import { useState, useMemo } from "react";
import { createContext } from "react";
import { useProjects } from "../ProjectContext/useProjects";
import initialSimpleCardContent from "../../cardTemplate/cardContent/initialSimpleCardContent";
import { useParams } from "react-router-dom";

export const CardEditorContext = createContext();
export const CardEditorProvider = ({ children }) => {
  const { projectId } = useParams();
  const { projects } = useProjects();
  const [projectData, setProjectData] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [selectedText, setSelectedText] = useState(null);

  const currentProject = useMemo(() => {
    return projects && projects.length > 0 && projectId
      ? projects.find((p) => p.id === projectId)
      : null;
  }, [projects, projectId]);

  if (!projectId && !projectData) {
    setProjectData({ ...initialSimpleCardContent });
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
