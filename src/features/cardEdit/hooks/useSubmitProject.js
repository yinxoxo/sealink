import { useMutation, useQueryClient } from "react-query";
import { saveProjectToFirestore } from "../../../firebase/saveProjectToFirestore";

export const useSubmitProject = ({
  userId,
  projectId,
  dispatch,
  navigate,
  toast,
  projectData,
  template,
  icons,
  iconColor,
  iconSize,
  itemsOrder,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (dataToMutate) => saveProjectToFirestore(userId, projectId, dataToMutate),
    {
      onSuccess: (result, dataToMutate) => {
        const { action } = dataToMutate;
        const { publishedUrl } = result;
        queryClient.invalidateQueries("userProjects");

        if (action === "publish") {
          dispatch({ type: "SET_NEW_PROJECT_URL", payload: publishedUrl });
          dispatch({ type: "SET_IS_MODAL_OPEN", payload: true });
        } else {
          navigate("/dashboard");
        }
      },
      onError: (error) => {
        console.error("Error saving project:", error);
        toast({
          title: "Error",
          description: "Failed to save the project.",
          variant: "destructive",
        });
      },
    },
  );

  const onSubmit = (data) => {
    const newProjectData = {
      action: data.action,
      title: data.title,
      templateId: template,
      background: {
        backgroundColor: projectData.background.backgroundColor || null,
        backgroundImage: projectData.background.backgroundImage || null,
        opacity: projectData.background.opacity,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      socialLinks: {
        id: "icons-1",
        iconList: icons.map((icon) => ({
          id: icon.name,
          href: icon.href,
          name: icon.name,
        })),
        style: {
          color: iconColor,
          size: iconSize,
        },
      },
      texts: projectData.texts.map((text, index) => ({
        id: `text-${index + 1}`,
        text: text.text,
        style: {
          fontSize: text.style.fontSize,
          fontWeight: text.style.fontWeight,
          color: text.style.color,
          fontFamily: text.style.fontFamily,
        },
      })),
      buttons: {
        buttonList: projectData.buttons.buttonList.map((button, index) => ({
          id: `button-${index + 1}`,
          text: button.text,
          url: button.url,
        })),
        style: {
          backgroundColor: projectData.buttons.style.backgroundColor,
          width: projectData.buttons.style.width,
          color: projectData.buttons.style.color,
          borderRadius: projectData.buttons.style.borderRadius,
          padding: projectData.buttons.style.padding,
          fontSize: projectData.buttons.style.fontSize,
          fontWeight: projectData.buttons.style.fontWeight,
          fontFamily: projectData.buttons.style.fontFamily,
        },
      },
      itemsOrder,
      avatar: {
        image: projectData.avatar.image || null,
        style: {
          width: projectData.avatar.style.width,
          height: projectData.avatar.style.height,
        },
      },
      isPublished: data.action === "publish",
      publishedUrl: null,
      screenshotUrl: projectData.screenshotUrl || null,
    };

    mutation.mutate(newProjectData);
  };

  return {
    onSubmit,
    mutation,
  };
};
