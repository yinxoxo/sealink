import { useState, useMemo } from "react";
import { createContext } from "react";
import { useProjects } from "../ProjectContext/useProjects";
import initialSimpleCardContent from "../../cardTemplate/cardContent/initialSimpleCardContent";
import initialWoodCardContent from "../../cardTemplate/cardContent/initialWoodCardContent";
import { useParams, useLocation } from "react-router-dom";

export const CardEditorContext = createContext();
export const CardEditorProvider = ({ children }) => {
  const location = useLocation();
  const { projectId, template } = useParams();
  const { projects } = useProjects();
  const [projectData, setProjectData] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [selectedText, setSelectedText] = useState(null);

  const isCardEditorPage = location.pathname.startsWith(
    "/dashboard/card-editor",
  );

  const currentProject = useMemo(() => {
    return projects && projects.length > 0 && projectId
      ? projects.find((p) => p.id === projectId)
      : null;
  }, [projects, projectId]);

  if (!projectId && !projectData && isCardEditorPage) {
    // 根據模板判斷應該載入的初始資料
    if (template === "WoodCard") {
      setProjectData({ ...initialWoodCardContent });
    } else if (template === "SimpleCard") {
      setProjectData({ ...initialSimpleCardContent });
    } else {
      console.error("找不到對應的模板資料");
      return; // 或者其他錯誤處理
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
