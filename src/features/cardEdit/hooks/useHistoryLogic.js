import { useState } from "react";

export const useHistoryLogic = (initialData, setProjectData) => {
  const [history, setHistory] = useState([initialData]);
  const [currentStep, setCurrentStep] = useState(0);
  const [redoHistory, setRedoHistory] = useState([]);

  const handleUndo = () => {
    if (currentStep > 0) {
      const previousStep = currentStep - 1;
      setRedoHistory([history[currentStep], ...redoHistory]);
      setCurrentStep(previousStep);
      setProjectData(history[previousStep]);
    }
  };

  const handleRedo = () => {
    if (redoHistory.length > 0) {
      const nextStep = redoHistory[0];
      setHistory([...history.slice(0, currentStep + 1), nextStep]);
      setRedoHistory(redoHistory.slice(1));
      setCurrentStep(currentStep + 1);
      setProjectData(nextStep);
    }
  };

  const handleReset = () => {
    if (history.length > 0) {
      setProjectData(history[0]);
      setCurrentStep(0);
      setRedoHistory([]);
    }
  };

  const updateHistory = (newData) => {
    const updatedHistory = [...history.slice(0, currentStep + 1), newData];
    setHistory(updatedHistory);
    setCurrentStep(currentStep + 1);
    setRedoHistory([]);
  };

  return {
    handleUndo,
    handleRedo,
    handleReset,
    updateHistory,
    currentStep,
    redoHistory,
    history,
  };
};
