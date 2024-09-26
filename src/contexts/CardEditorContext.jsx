import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useProjects } from "./ProjectContext.jsx/ProjectsProvider";
import initialSimpleCardContent from "../cardTemplate/cardContent/initialSimpleCardContent";
import {
  ICON_LIST,
  ICON_STYLE,
  ICON_MAP,
} from "../cardTemplate/cardContent/iconList";

const CardEditorContext = createContext();

export const useCardEditorContext = () => useContext(CardEditorContext);

export const CardEditorProvider = ({ children }) => {
  const [projectId, setProjectId] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [editingType, setEditingType] = useState(null);
  const [icons, setIcons] = useState(ICON_LIST.slice(0, 3));
  const [iconColor, setIconColor] = useState(ICON_STYLE.SimpleCard.color);
  const [iconSize, setIconSize] = useState(ICON_STYLE.SimpleCard.size || 30);
  const [texts, setTexts] = useState([...initialSimpleCardContent.texts]);
  const [selectedText, setSelectedText] = useState(null);
  const [simpleCardButtons, setSimpleCardButtons] = useState({
    buttons: [...initialSimpleCardContent.buttons.buttonList],
    style: { ...initialSimpleCardContent.buttons.style },
  });
  const [backgroundSettings, setBackgroundSettings] = useState({
    ...initialSimpleCardContent.backgroundSettings,
  });

  const [itemsOrder, setItemsOrder] = useState([
    ...initialSimpleCardContent.texts.map((text, index) => ({
      id: `text-${index + 1}`,
      type: "text",
    })),
    { id: `icons-1`, type: "icons" },
    ...initialSimpleCardContent.buttons.buttonList.map((button, index) => ({
      id: `button-${index + 1}`,
      type: "button",
    })),
  ]);

  const { projects } = useProjects();

  useEffect(() => {
    if (projects && projects.length > 0 && projectId) {
      const selectedProject = projects.find((p) => p.id === projectId);
      if (selectedProject) {
        setCurrentProject(selectedProject);
      }
    }
  }, [projects, projectId]);

  useEffect(() => {
    if (currentProject) {
      setTexts(currentProject.texts);

      const newIcons = currentProject.socialLinks.iconList.map((link) => ({
        icon: ICON_MAP[link.name],
        id: link.id,
        href: link.href,
        name: link.name,
      }));
      setIcons(newIcons);

      setIconColor(currentProject.socialLinks.style.color);
      setIconSize(currentProject.socialLinks.style.size);

      setSimpleCardButtons({
        buttons: [...currentProject.buttons.buttonList],
        style: { ...currentProject.buttons.style },
      });

      setBackgroundSettings({
        ...currentProject.background,
      });
      setItemsOrder(currentProject.itemsOrder);
    }
  }, [currentProject, projectId]);

  useEffect(() => {
    if (!projectId && !currentProject) {
      setBackgroundSettings({
        ...initialSimpleCardContent.backgroundSettings,
      });
    }
  }, [projectId, currentProject]);

  const contextValue = {
    projectId,
    setProjectId,
    editingType,
    setEditingType,
    iconColor,
    setIconColor,
    iconSize,
    setIconSize,
    texts,
    setTexts,
    icons,
    setIcons,
    selectedText,
    setSelectedText,
    simpleCardButtons,
    setSimpleCardButtons,
    backgroundSettings,
    setBackgroundSettings,
    currentProject,
    setCurrentProject,
    itemsOrder,
    setItemsOrder,
  };

  return (
    <CardEditorContext.Provider value={contextValue}>
      {children}
    </CardEditorContext.Provider>
  );
};
