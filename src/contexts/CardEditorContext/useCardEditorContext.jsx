import { useContext } from "react";
import { CardEditorContext } from "./CardEditorProvider";

export const useCardEditorContext = () => useContext(CardEditorContext);
