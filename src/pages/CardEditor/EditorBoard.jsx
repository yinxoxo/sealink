import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";

import { ChromePicker } from "react-color";
import fontOptions from "../../cardTemplate/cardContent/fontOptions";
import {
  ICON_LIST,
  ICON_MAP,
  ICON_STYLE,
} from "../../cardTemplate/cardContent/iconList";
import ButtonCard from "./EditorComponents/ButtonCard";
import CropperModal from "./EditorComponents/CropperModal";
import DeployModal from "./EditorComponents/DeployModal";
import EditButtonModal from "./EditorComponents/EditButtonModal";
import EditIconModal from "./EditorComponents/EditIconModal";
import EditTextModal from "./EditorComponents/EditTextModal";
import IconCard from "./EditorComponents/IconCard";
import IconSelect from "./EditorComponents/IconSelect";
import TextCard from "./EditorComponents/TextCard";
import UploadButton from "./EditorComponents/UploadButton";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";
import { saveProjectToFirestore } from "../../firebase/saveProjectToFirestore";

import { useAuth } from "../../contexts/AuthContext/useAuth";
import { useCardEditorContext } from "../../contexts/CardEditorContext/useCardEditorContext";
import getCroppedImg from "../../utils/getCroppedImg";

import { FaRegTrashCan } from "react-icons/fa6";

const EditBoard = ({ isMobile, setIsMobile }) => {
  const { toast } = useToast();
  const {
    projectId,
    projectData,
    setProjectData,
    selectedText,
    setSelectedText,
    editingType,
  } = useCardEditorContext();

  const icons = projectData.socialLinks.iconList.map((link) => ({
    icon: ICON_MAP[link.name],
    id: link.id,
    href: link.href,
    name: link.name,
  }));
  const iconColor =
    projectData?.socialLinks?.style?.color || ICON_STYLE.SimpleCard.color;
  const iconSize =
    projectData?.socialLinks?.style?.size || ICON_STYLE.SimpleCard.size;

  const { itemsOrder } = projectData;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { template } = useParams();
  const defaultValues = {
    title: projectData?.title || "",
  };
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const [history, setHistory] = useState([projectData]);
  const [currentStep, setCurrentStep] = useState(0);
  const [redoHistory, setRedoHistory] = useState([]);

  const updateProjectData = (newData) => {
    const updatedHistory = [...history.slice(0, currentStep + 1), newData];
    setHistory(updatedHistory);
    setCurrentStep(currentStep + 1);
    setRedoHistory([]);
    setProjectData(newData);
  };

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectUrl, setNewProjectUrl] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editIconData, setEditIconData] = useState(null);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);
  const [isButtonModalVisible, setIsButtonModalVisible] = useState(false);
  const [editButtonData, setEditButtonData] = useState(null);
  const [useBackgroundImage, setUseBackgroundImage] = useState(
    !!projectData.background.backgroundImage,
  );

  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropModalVisible, setIsCropModalVisible] = useState(false);
  const [editableTextItem, setEditableTextItem] = useState(null);

  const handleOuterClick = () => {
    setShowBackgroundColorPicker(false);
    setShowFontColorPicker(false);
  };

  const onSubmit = async (data) => {
    const newProjectData = {
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
      itemsOrder: itemsOrder,
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

    const dataToMutate = {
      ...newProjectData,
      action: data.action,
    };

    mutation.mutate(dataToMutate);
  };

  const mutation = useMutation(
    (dataToMutate) => saveProjectToFirestore(user.uid, projectId, dataToMutate),
    {
      onSuccess: async (result, dataToMutate) => {
        const { action } = dataToMutate;
        const { publishedUrl } = result;
        queryClient.invalidateQueries("userProjects");

        if (action === "publish") {
          setNewProjectUrl(publishedUrl);
          setIsModalOpen(true);
        } else {
          navigate("/dashboard");
        }
      },
      onError: (error) => {
        console.error("Error saving project:", error);
      },
    },
  );

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const uploadImageToFirebase = (blob, folderName = "cropped_images") => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `${folderName}/${Date.now()}.png`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          toast({
            title: "Upload failed",
            description: `Upload failed: ${error.message}`,
            variant: "destructive",
          });
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        },
      );
    });
  };

  const handleSaveCroppedImage = async (folderName, onSuccessCallback) => {
    try {
      const { blob } = await getCroppedImg(imageUrl, croppedAreaPixels);

      setUploading(true);

      const downloadURL = await uploadImageToFirebase(blob, folderName);

      setImageUrl(downloadURL);
      onSuccessCallback(downloadURL);
      setUploading(false);

      toast({
        title: "Image uploaded",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast({
        title: "Error",
        description: "Failed to crop and upload the image.",
        variant: "destructive",
      });
    }
  };
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

  const renderTextEditor = () => {
    return (
      <>
        <div className="mb-4 flex w-full">
          <h1 className="ml-2 text-3xl font-bold">Texts</h1>
        </div>
        {projectData.texts.map((item) => (
          <TextCard
            key={item.id}
            textItem={item}
            onEdit={() => {
              setSelectedText(item.id);
              setEditableTextItem(item);
              setIsModalVisible(true);
            }}
            onDelete={() => {
              const updatedTexts = projectData.texts.filter(
                (textItem) => textItem.id !== item.id,
              );

              const updatedItemsOrder = itemsOrder.filter(
                (orderItem) => orderItem.id !== item.id,
              );

              const updatedData = {
                ...projectData,
                texts: updatedTexts,
                itemsOrder: updatedItemsOrder,
              };
              setProjectData(updatedData);
              updateProjectData(updatedData);
            }}
            onUpdate={(updatedItem) => {
              const updatedTexts = projectData.texts.map((textItem) =>
                textItem.id === item.id ? updatedItem : textItem,
              );
              const updatedData = {
                ...projectData,
                texts: updatedTexts,
              };
              setProjectData(updatedData);
              updateProjectData(updatedData);
            }}
          />
        ))}
        <Button
          className="mt-6 bg-button hover:bg-button-hover"
          onClick={() => {
            const maxId = projectData.texts.reduce((max, text) => {
              const idNumber = parseInt(text.id.split("-")[1]);
              return idNumber > max ? idNumber : max;
            }, 0);

            const newTextId = `text-${maxId + 1}`;
            const newTextItem = {
              id: newTextId,
              text: "New Text",
              style: {
                fontSize: "16px",
                fontWeight: 400,
                color: "#000000",
                fontFamily: "Arial",
              },
            };
            const updatedData = {
              ...projectData,
              texts: [...projectData.texts, newTextItem],
              itemsOrder: [
                ...projectData.itemsOrder,
                { id: newTextId, type: "text" },
              ],
            };
            setProjectData(updatedData);
            updateProjectData(updatedData);
          }}
        >
          Add New Text
        </Button>

        <EditTextModal
          isTextModalVisible={isModalVisible}
          setIsTextModalVisible={setIsModalVisible}
          editTextData={editableTextItem}
          setEditTextData={setEditableTextItem}
          handleSaveTextEdit={() => {
            const updatedTexts = projectData.texts.map((item) =>
              item.id === selectedText ? editableTextItem : item,
            );

            const updatedData = {
              ...projectData,
              texts: updatedTexts,
            };
            setProjectData(updatedData);
            updateProjectData(updatedData);
            setIsModalVisible(false);
          }}
        />
      </>
    );
  };

  const renderIconList = () => (
    <>
      {editingType === "icon" ? (
        <>
          <div className="mb-4 flex w-full">
            <h1 className="ml-2 text-3xl font-bold">Icons</h1>
          </div>
          {icons.map((icon) => (
            <IconCard
              key={icon.id}
              icon={icon.icon}
              iconColor="black"
              iconName={icon.name}
              iconHref={icon.href}
              onEdit={() => handleIconEdit(icon.name)}
              onDelete={() => handleIconDelete(icon.id)}
            />
          ))}
          <div className="mt-8 w-full">
            <IconSelect
              icons={icons}
              setSelectedIcon={setSelectedIcon}
              ICON_LIST={ICON_LIST}
            />
            <Button
              className="mt-2 w-full bg-button hover:bg-button-hover"
              onClick={addIcon}
            >
              Add Icon
            </Button>
          </div>
          <div className="mt-6 flex w-full">
            <h1 className="ml-2 text-2xl font-bold">Appearance</h1>
          </div>
          <div className="mt-4 space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Icon Color</label>
              <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-[#f4f4f5] p-2">
                <div
                  className="relative h-6 w-20 cursor-pointer rounded"
                  style={{
                    backgroundColor: projectData.socialLinks.style.color,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFontColorPicker(!showFontColorPicker);
                    setShowBackgroundColorPicker(false);
                  }}
                >
                  {showFontColorPicker && (
                    <div
                      className="absolute top-10 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ChromePicker
                        color={editIconData?.color}
                        onChangeComplete={(color) => {
                          setEditIconData({
                            ...editIconData,
                            color: color.hex,
                          });
                          const updatedData = {
                            ...projectData,
                            socialLinks: {
                              ...projectData.socialLinks,
                              style: {
                                ...projectData.socialLinks.style,
                                color: color.hex,
                              },
                            },
                          };
                          setProjectData(updatedData);
                          updateProjectData(updatedData);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Icon Size</label>
              <span className="text-sm">{iconSize}px</span>
              <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
                <Slider
                  min={10}
                  max={100}
                  step={1}
                  defaultValue={[iconSize]}
                  onValueCommit={(value) => {
                    const newSize = value[0];
                    const updatedData = {
                      ...projectData,
                      socialLinks: {
                        ...projectData.socialLinks,
                        style: {
                          ...projectData.socialLinks.style,
                          size: newSize,
                        },
                      },
                    };
                    setProjectData(updatedData);
                    updateProjectData(updatedData);
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
      {editIconData && (
        <EditIconModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          editIconData={editIconData}
          setEditIconData={setEditIconData}
          handleSaveEdit={handleSaveIconEdit}
        />
      )}
    </>
  );

  const renderButtonEditor = () => {
    const { style, buttonList } = projectData.buttons;

    return (
      <>
        <div className="flex w-full">
          <h1 className="ml-2 text-3xl font-bold">Buttons</h1>
        </div>

        <div className="mt-4">
          {buttonList.map((button, index) => (
            <ButtonCard
              key={button.id}
              button={button}
              // index={index}
              onEdit={() => handleButtonEdit(button, index)}
              onDelete={() => handleButtonDelete(button.id)}
            />
          ))}
        </div>

        <Button
          className="mt-6 bg-button hover:bg-button-hover"
          onClick={() => {
            const maxId = projectData.buttons.buttonList.reduce(
              (max, button) => {
                const idNumber = parseInt(button.id.split("-")[1]);
                return idNumber > max ? idNumber : max;
              },
              0,
            );

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
          }}
        >
          Add Button
        </Button>

        {editButtonData && (
          <EditButtonModal
            isButtonModalVisible={isButtonModalVisible}
            setIsButtonModalVisible={setIsButtonModalVisible}
            editButtonData={editButtonData}
            setEditButtonData={setEditButtonData}
            handleSaveButtonEdit={handleSaveButtonEdit}
          />
        )}

        <div className="mt-6 flex w-full">
          <h1 className="ml-2 text-2xl font-bold">Appearance</h1>
        </div>
        <div className="mt-4 space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Background Color</label>
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-[#f4f4f5] p-2">
              <div
                className="relative h-6 w-20 cursor-pointer rounded"
                style={{
                  backgroundColor: style.backgroundColor,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBackgroundColorPicker(!showBackgroundColorPicker);
                  setShowFontColorPicker(false);
                }}
              >
                {showBackgroundColorPicker && (
                  <div
                    className="absolute top-10 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ChromePicker
                      color={style.backgroundColor}
                      onChangeComplete={(color) =>
                        handleButtonStyleChange("backgroundColor", color.hex)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Width</label>
            <span className="text-sm">{style.width}</span>
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
              <Slider
                min={50}
                max={100}
                step={1}
                defaultValue={[parseInt(style.width, 10)]}
                onValueCommit={(value) =>
                  handleButtonStyleChange("width", `${value[0]}%`)
                }
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Border Radius</label>
            <span className="text-sm">{style.borderRadius}</span>
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
              <Slider
                min={1}
                max={50}
                step={1}
                defaultValue={[parseInt(style.borderRadius, 10)]}
                onValueCommit={(value) =>
                  handleButtonStyleChange("borderRadius", `${value[0]}px`)
                }
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Padding</label>
            <span className="text-sm">{style.padding}</span>
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
              <Slider
                min={1}
                max={50}
                step={1}
                defaultValue={[parseInt(style.padding, 10) || 20]}
                onValueCommit={(value) =>
                  handleButtonStyleChange("padding", `${value[0]}px`)
                }
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Font Size</label>
            <span className="text-sm">{style.fontSize}</span>
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
              <Slider
                min={10}
                max={50}
                step={1}
                defaultValue={[parseInt(style.fontSize, 10) || 18]}
                onValueCommit={(value) =>
                  handleButtonStyleChange("fontSize", `${value[0]}px`)
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Font Weight</label>
            <span className="text-sm">{style.fontWeight}</span>
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
              <Slider
                min={1}
                max={4}
                step={1}
                defaultValue={[
                  style.fontWeight === 300
                    ? 1
                    : style.fontWeight === 400
                      ? 2
                      : style.fontWeight === 600
                        ? 3
                        : 4,
                ]}
                onValueCommit={(value) => {
                  const weightMap = {
                    1: 300,
                    2: 400,
                    3: 600,
                    4: 700,
                  };
                  handleButtonStyleChange("fontWeight", weightMap[value[0]]);
                }}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Font Family</label>
            <Select
              value={projectData.buttons.style.fontFamily.split(",")[0]}
              onValueChange={(value) =>
                handleButtonStyleChange("fontFamily", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem
                    key={font.value}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Text Color</label>
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-[#f4f4f5] p-2">
              <div
                className="relative h-6 w-20 cursor-pointer rounded"
                style={{
                  backgroundColor: style.color,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFontColorPicker(!showFontColorPicker);
                  setShowBackgroundColorPicker(false);
                }}
              >
                {showFontColorPicker && (
                  <div
                    className="absolute top-10 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ChromePicker
                      color={style.color}
                      onChangeComplete={(color) =>
                        handleButtonStyleChange("color", color.hex)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderBackgroundEditor = () => (
    <div>
      <h1 className="text-3xl font-bold">Background</h1>
      <div className="my-4 flex h-fit w-full items-center justify-between">
        <div className="flex w-full">
          <h1 className="text-lg font-medium">Use Background Image ?</h1>
        </div>
        <Switch
          checked={useBackgroundImage}
          onCheckedChange={(checked) => setUseBackgroundImage(checked)}
        />
      </div>

      {useBackgroundImage ? (
        <div className="mt-2 space-y-2">
          <label className="text-sm font-medium">Background Image </label>
          <Input
            value={projectData.background.backgroundImage}
            placeholder="Enter image URL or upload"
            onChange={(e) => {
              const newImage = e.target.value;
              const updatedData = {
                ...projectData,
                background: {
                  ...projectData.background,
                  backgroundImage: newImage,
                  backgroundColor: null,
                },
              };
              setProjectData(updatedData);
              updateProjectData(updatedData);
            }}
          />
          <UploadButton
            onUpload={(downloadURL) => {
              setImageUrl(downloadURL);
              setIsCropModalVisible(true);
            }}
          />

          <CropperModal
            isCropModalVisible={isCropModalVisible}
            setIsCropModalVisible={setIsCropModalVisible}
            imageUrl={imageUrl}
            crop={crop}
            setCrop={setCrop}
            zoom={zoom}
            setZoom={setZoom}
            aspect={9 / 16}
            cropShape="rect"
            onCropComplete={onCropComplete}
            handleSaveCroppedImage={() =>
              handleSaveCroppedImage("backgroundimage", (downloadURL) => {
                const updatedData = {
                  ...projectData,
                  background: {
                    ...projectData.background,
                    backgroundImage: `url(${downloadURL})`,
                    backgroundColor: null,
                  },
                };

                setProjectData(updatedData);
                updateProjectData(updatedData);
                setIsCropModalVisible(false);
              })
            }
            uploading={uploading}
          />
        </div>
      ) : (
        <div className="mt-2 flex flex-col space-y-2">
          <label className="text-sm font-medium">Background Color</label>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-[#f4f4f5] p-2">
            <div
              className="relative h-6 w-20 cursor-pointer rounded"
              style={{
                backgroundColor: projectData.background.backgroundColor,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowBackgroundColorPicker(!showBackgroundColorPicker);
                setShowFontColorPicker(false);
              }}
            >
              {showBackgroundColorPicker && (
                <div
                  className="absolute top-10 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChromePicker
                    color={projectData.background.backgroundColor || "#fff"}
                    onChange={(color) => {
                      // setTempBackgroundColor(color.hex);
                      const updatedData = {
                        ...projectData,
                        background: {
                          ...projectData.background,
                          backgroundImage: null,
                          backgroundColor: color.hex,
                        },
                      };

                      setProjectData(updatedData);
                      updateProjectData(updatedData);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mb-2 mt-6 space-y-2">
        <div className="flex w-full justify-between">
          <label htmlFor="background-opacity" className="text-sm font-medium">
            Background Opacity
          </label>
          <span className="text-sm text-graySpan">
            {projectData.background.opacity}
          </span>
        </div>
        <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
          <Slider
            id="background-opacity"
            min={0.1}
            max={1}
            step={0.1}
            defaultValue={[projectData.background.opacity]}
            onValueCommit={(value) => {
              const newOpacity = value[0];
              const updatedData = {
                ...projectData,
                background: {
                  ...projectData.background,
                  opacity: newOpacity,
                },
              };
              setProjectData(updatedData);
              updateProjectData(updatedData);
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderAvatarEditor = () => (
    <div>
      <div className="flex w-full">
        <h1 className="ml-2 text-3xl font-bold">Avatar</h1>
      </div>

      {projectData.avatar?.image && (
        <>
          <div className="mt-4 flex flex-col space-y-2">
            <label className="text-sm font-medium">Adjust Avatar Size</label>
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
              <Slider
                min={50}
                max={300}
                defaultValue={[parseInt(projectData.avatar.style.width, 10)]}
                onValueCommit={(value) => handleAvatarSizeChange(value[0])}
              />
            </div>
          </div>
          <div className="my-4">
            <Button
              className="w-full bg-[#8992a3] hover:bg-[#595f6b]"
              onClick={() => {
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
              }}
            >
              <FaRegTrashCan className="mr-2 h-4 w-4" />
              Delete Avatar
            </Button>
          </div>
        </>
      )}
      <div className="my-4 w-full">
        <UploadButton
          onUpload={(downloadURL) => {
            setImageUrl(downloadURL);
            setIsCropModalVisible(true);
          }}
        />
      </div>
      <CropperModal
        isCropModalVisible={isCropModalVisible}
        setIsCropModalVisible={setIsCropModalVisible}
        imageUrl={imageUrl}
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        cropShape="round"
        aspect={1 / 1}
        onCropComplete={onCropComplete}
        handleSaveCroppedImage={() =>
          handleSaveCroppedImage("avatars", (downloadURL) => {
            const updatedData = {
              ...projectData,
              avatar: {
                ...projectData.avatar,
                image: downloadURL,
                style: {
                  width: "100px",
                  height: "100px",
                },
              },
            };
            setProjectData(updatedData);
            updateProjectData(updatedData);
            setIsCropModalVisible(false);
          })
        }
        uploading={uploading}
      />
    </div>
  );

  const renderUserProjectForm = () => {
    return (
      <div className="rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field, fieldState: { error } }) => (
              <div className="mb-4">
                <div className="mb-4 flex w-full flex-col">
                  <h1 className="text-3xl font-bold">Title (required)</h1>
                  <small className="mt-1 text-gray-500">
                    This site's title (and what gets shown at the top of the
                    browser window).
                  </small>
                </div>
                <Input
                  {...field}
                  placeholder="Enter project title"
                  className={`w-full rounded-lg border p-2 ${error ? "border-red-500" : "border-gray-300"}`}
                />
                {error && (
                  <span className="text-sm text-red-500">{error.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name="action"
            control={control}
            rules={{ required: "Please select an action" }}
            render={({ field, fieldState: { error } }) => (
              <div className="mb-4">
                <div className="my-6 flex w-full">
                  <h1 className="text-2xl font-bold">Action</h1>
                </div>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className={`space-y-2 ${error ? "border-red-500" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="publish" id="publish" />
                    <label htmlFor="publish">
                      Publish to a /sealink/id URL
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="draft" id="draft" />
                    <label htmlFor="draft">Save as an offline draft</label>
                  </div>
                </RadioGroup>
                {error && (
                  <span className="text-sm text-red-500">{error.message}</span>
                )}
              </div>
            )}
          />
          <Button
            type="submit"
            className="mt-4 w-full bg-button hover:bg-button-hover"
          >
            Save
          </Button>
        </form>
      </div>
    );
  };

  return (
    <section
      className="right-0 z-20 flex w-full flex-col overflow-y-auto bg-white lg:h-full lg:max-h-svh lg:w-full xl:max-w-[450px]"
      onClick={handleOuterClick}
    >
      <DeployModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectUrl={newProjectUrl}
      />
      <NavBar
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        onUndo={handleUndo}
        onRedo={handleRedo}
        disableUndo={currentStep === 0}
        disableRedo={redoHistory.length === 0}
        onReset={handleReset}
      />

      <div className="flex flex-col p-5 xl:mt-16">
        {editingType === "text"
          ? renderTextEditor()
          : editingType === "icon"
            ? renderIconList()
            : editingType === "saveProject"
              ? renderUserProjectForm()
              : editingType === "button"
                ? renderButtonEditor()
                : editingType === "background"
                  ? renderBackgroundEditor()
                  : editingType === "avatar"
                    ? renderAvatarEditor()
                    : null}
      </div>
    </section>
  );
};

export default EditBoard;
