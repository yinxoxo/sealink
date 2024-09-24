import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import initialSimpleCardContent from "../cardTemplate/cardContent/initialSimpleCardContent";
import {
  ICON_LIST,
  ICON_STYLE,
  ICON_MAP,
} from "../cardTemplate/cardContent/iconList";
// import { useProjects } from "./ProjectsContext";

const CardEditorContext = createContext();

export const useCardEditorContext = () => useContext(CardEditorContext);

export const CardEditorProvider = ({ children }) => {
  // with project
  // const { projects } = useProjects();
  const [projectId, setProjectId] = useState(null);

  const [currentProject, setCurrentProject] = useState(null);

  // init edit
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
    // 初始化排序
    ...initialSimpleCardContent.texts.map((text, index) => ({
      id: `text-${index + 1}`, // 你可以根據索引或其它規則生成 id
      type: "text",
    })),
    { id: `icons-1`, type: "icons" },
    ...initialSimpleCardContent.buttons.buttonList.map((button, index) => ({
      id: `button-${index + 1}`,
      type: "button",
    })),
  ]);

  useEffect(() => {
    if (!projectId && !currentProject) {
      setBackgroundSettings({
        ...initialSimpleCardContent.backgroundSettings,
      });
    }
  }, [projectId, currentProject]);

  useEffect(() => {
    if (currentProject && currentProject.length > 0 && projectId) {
      const project = currentProject.find((p) => p.id === projectId);

      if (project) {
        setTexts(project.texts);

        const newIcons = project.socialLinks.iconList.map((link) => ({
          icon: ICON_MAP[link.name],
          href: link.href,
          name: link.name,
        }));
        setIcons(newIcons);
        console.log("icon", newIcons);

        setIconColor(project.socialLinks.style.color);
        setIconSize(project.socialLinks.style.size);

        setSimpleCardButtons({
          buttons: [...project.buttons.buttonList],
          style: { ...project.buttons.style },
        });

        setBackgroundSettings({
          ...project.background,
        });
      }
    }
  }, [currentProject, projectId]);

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
