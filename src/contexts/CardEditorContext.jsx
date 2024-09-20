import { createContext, useContext, useState } from "react";
import { initialSimpleCardContent } from "../cardTemplate/cardContent/initialSimpleCardContent";
import { ICON_LIST, ICON_STYLE } from "../cardTemplate/cardContent/iconList";

const CardEditorContext = createContext();

export const useCardEditorContext = () => useContext(CardEditorContext);

export const CardEditorProvider = ({ children }) => {
  const [editingType, setEditingType] = useState(null);
  const [iconColor, setIconColor] = useState(ICON_STYLE.SimpleCard.color);
  const [iconSize, setIconSize] = useState(ICON_STYLE.SimpleCard.size || 30);
  const [hydraText, setHydraText] = useState(
    initialSimpleCardContent.title.text,
  );
  const [juiceText, setJuiceText] = useState(
    initialSimpleCardContent.subtitle.text,
  );
  const [descriptionText, setDescriptionText] = useState(
    initialSimpleCardContent.description.text,
  );
  const [icons, setIcons] = useState(ICON_LIST.slice(0, 3));
  const [selectedText, setSelectedText] = useState(null);
  const [hydraTextStyle, setHydraTextStyle] = useState({
    fontSize: parseInt(initialSimpleCardContent.title.fontSize),
    fontWeight: initialSimpleCardContent.title.fontWeight,
    color: initialSimpleCardContent.title.color,
    fontFamily: initialSimpleCardContent.title.fontFamily,
  });
  const [juiceTextStyle, setJuiceTextStyle] = useState({
    fontSize: parseInt(initialSimpleCardContent.subtitle.fontSize),
    fontWeight: initialSimpleCardContent.subtitle.fontWeight,
    color: initialSimpleCardContent.subtitle.color,
    fontFamily: initialSimpleCardContent.subtitle.fontFamily,
  });
  const [descriptionTextStyle, setDescriptionTextStyle] = useState({
    fontSize: parseInt(initialSimpleCardContent.description.fontSize),
    fontWeight: initialSimpleCardContent.description.fontWeight,
    color: initialSimpleCardContent.description.color,
    fontFamily: initialSimpleCardContent.description.fontFamily,
  });
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
    hydraText,
    setHydraText,
    juiceText,
    setJuiceText,
    descriptionText,
    setDescriptionText,
    icons,
    setIcons,
    selectedText,
    setSelectedText,
    hydraTextStyle,
    setHydraTextStyle,
    juiceTextStyle,
    setJuiceTextStyle,
    descriptionTextStyle,
    setDescriptionTextStyle,
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
