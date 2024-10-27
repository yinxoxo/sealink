import { useState } from "react";
import {
  ICON_LIST,
  ICON_MAP,
} from "../../../features/cardTemplate/data/iconList";

export const useIconEditor = (
  projectData,
  setProjectData,
  updateProjectData,
) => {
  const [editIconData, setEditIconData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");

  const icons = projectData.socialLinks.iconList.map((link) => ({
    icon: ICON_MAP[link.name],
    id: link.id,
    href: link.href,
    name: link.name,
  }));

  const iconColor = projectData?.socialLinks?.style?.color;
  const iconSize = projectData?.socialLinks?.style?.size;

  const isIconAlreadyAdded = selectedIcon
    ? icons.some((icon) => icon.name === selectedIcon)
    : false;

  const handleIconEdit = (iconName) => {
    const iconToEdit = icons.find((icon) => icon.name === iconName);
    if (iconToEdit) {
      setEditIconData(iconToEdit);
      setIsModalVisible(true);
    }
  };

  const handleSaveIconEdit = () => {
    const updatedIcons = icons.map((icon) =>
      icon.id === editIconData.id ? editIconData : icon,
    );

    const updatedData = {
      ...projectData,
      socialLinks: {
        ...projectData.socialLinks,
        iconList: updatedIcons,
      },
    };
    setProjectData(updatedData);
    updateProjectData(updatedData);
    setIsModalVisible(false);
  };
  const addIcon = () => {
    if (selectedIcon) {
      if (isIconAlreadyAdded) {
        return;
      }

      const foundIcon = ICON_LIST.find((icon) => icon.name === selectedIcon);

      if (foundIcon && foundIcon.icon) {
        const newIcon = {
          id: foundIcon.id,
          name: foundIcon.name,
          icon: foundIcon.icon,
          href: foundIcon.href,
        };

        const updatedData = {
          ...projectData,
          socialLinks: {
            ...projectData.socialLinks,
            iconList: [...projectData.socialLinks.iconList, newIcon],
          },
        };
        setProjectData(updatedData);
        updateProjectData(updatedData);
      } else {
        console.error(`Icon ${selectedIcon} not found or invalid icon`);
      }
    }
  };

  const handleIconDelete = (id) => {
    const updatedIcons = icons.filter((icon) => icon.id !== id);

    const updatedData = {
      ...projectData,
      socialLinks: {
        ...projectData.socialLinks,
        iconList: updatedIcons,
      },
    };
    setProjectData(updatedData);
    updateProjectData(updatedData);
  };

  return {
    icons,
    iconColor,
    iconSize,
    editIconData,
    setEditIconData,
    isModalVisible,
    setIsModalVisible,
    selectedIcon,
    setSelectedIcon,
    handleIconEdit,
    handleSaveIconEdit,
    addIcon,
    handleIconDelete,
    isIconAlreadyAdded,
  };
};
