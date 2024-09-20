import { createContext, useContext, useState } from "react";
import { initialSimpleCardContent } from "../cardTemplate/cardContent/initialSimpleCardContent";
import { ICON_LIST, ICON_STYLE } from "../cardTemplate/cardContent/iconList";

const CardEditorContext = createContext();

export const useCardEditorContext = () => useContext(CardEditorContext);

export const CardEditorProvider = ({ children }) => {
  const [editingType, setEditingType] = useState(null);
  const [iconColor, setIconColor] = useState(ICON_STYLE.SimpleCard.color);
  const [iconSize, setIconSize] = useState(ICON_STYLE.SimpleCard.size || 30);

  const [texts, setTexts] = useState([...initialSimpleCardContent.texts]);

  const [icons, setIcons] = useState(ICON_LIST.slice(0, 3));
  const [selectedText, setSelectedText] = useState(null);

  const [simpleCardButtons, setSimpleCardButtons] = useState({
    buttons: [...initialSimpleCardContent.buttons.buttonList],
    style: { ...initialSimpleCardContent.buttons.style },
  });

  const [backgroundSettings, setBackgroundSettings] = useState({
    ...initialSimpleCardContent.backgroundSettings,
  });

  const contextValue = {
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
  };

  return (
    <CardEditorContext.Provider value={contextValue}>
      {children}
    </CardEditorContext.Provider>
  );
};
