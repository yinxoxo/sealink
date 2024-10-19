import { useState } from "react";

const useAvatarEditor = (projectData, setProjectData, updateProjectData) => {
  const [avatarSize, setAvatarSize] = useState({
    width: projectData.avatar?.style?.width || "100px",
    height: projectData.avatar?.style?.height || "100px",
  });

  const handleAvatarSizeChange = (value) => {
    const updatedData = {
      ...projectData,
      avatar: {
        ...projectData.avatar,
        style: {
          ...projectData.avatar.style,
          width: `${value}px`,
          height: `${value}px`,
        },
      },
    };
    setProjectData(updatedData);
    updateProjectData(updatedData);
  };

  const deleteAvatar = () => {
    const updatedData = {
      ...projectData,
      avatar: {
        image: null,
        style: {
          width: "0px",
          height: "0px",
        },
      },
    };
    setProjectData(updatedData);
    updateProjectData(updatedData);
  };

  return {
    avatarSize,
    handleAvatarSizeChange,
    deleteAvatar,
  };
};

export default useAvatarEditor;
