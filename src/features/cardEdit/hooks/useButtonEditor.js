import { useState } from "react";

export const useButtonEditor = (
  projectData,
  setProjectData,
  updateProjectData,
) => {
  const [isButtonModalVisible, setIsButtonModalVisible] = useState(false);
  const [editButtonData, setEditButtonData] = useState(null);

  const handleButtonEdit = (button, index) => {
    setEditButtonData({ ...button, index });
    setIsButtonModalVisible(true);
  };

  const handleSaveButtonEdit = () => {
    const updatedButtons = projectData.buttons.buttonList.map((button, i) =>
      i === editButtonData.index ? { ...editButtonData } : button,
    );

    const updatedData = {
      ...projectData,
      buttons: {
        ...projectData.buttons,
        buttonList: updatedButtons,
      },
    };
    setProjectData(updatedData);
    updateProjectData(updatedData);
    setIsButtonModalVisible(false);
  };

  const handleButtonDelete = (buttonId) => {
    const updatedButtons = projectData.buttons.buttonList.filter(
      (button) => button.id !== buttonId,
    );
    const updatedItemsOrder = projectData.itemsOrder.filter(
      (orderItem) => orderItem.id !== buttonId,
    );

    const updatedData = {
      ...projectData,
      buttons: {
        ...projectData.buttons,
        buttonList: updatedButtons,
      },
      itemsOrder: updatedItemsOrder,
    };

    setProjectData(updatedData);
    updateProjectData(updatedData);
  };

  const handleButtonStyleChange = (styleProp, value) => {
    const updatedData = {
      ...projectData,
      buttons: {
        ...projectData.buttons,
        style: {
          ...projectData.buttons.style,
          [styleProp]: value,
        },
      },
    };
    setProjectData(updatedData);
    updateProjectData(updatedData);
  };

  const addNewButton = () => {
    const maxId = projectData.buttons.buttonList.reduce((max, button) => {
      const idNumber = parseInt(button.id.split("-")[1]);
      return idNumber > max ? idNumber : max;
    }, 0);

    const newButtonId = `button-${maxId + 1}`;
    const newButton = {
      id: newButtonId,
      text: "New Button",
      url: "https://example.com/new-button",
    };

    const updatedData = {
      ...projectData,
      buttons: {
        ...projectData.buttons,
        buttonList: [...projectData.buttons.buttonList, newButton],
      },
      itemsOrder: [
        ...projectData.itemsOrder,
        { id: newButtonId, type: "button" },
      ],
    };
    setProjectData(updatedData);
    updateProjectData(updatedData);
  };

  return {
    isButtonModalVisible,
    setIsButtonModalVisible,
    editButtonData,
    setEditButtonData,
    handleButtonEdit,
    handleSaveButtonEdit,
    handleButtonDelete,
    handleButtonStyleChange,
    addNewButton,
  };
};
