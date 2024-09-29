import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import {
  Select,
  Button,
  Input,
  Switch,
  Upload,
  message,
  Slider,
  Radio,
  Space,
} from "antd";
import {
  ICON_LIST,
  ICON_STYLE,
  ICON_MAP,
} from "../../cardTemplate/cardContent/iconList";
import IconCard from "./EditorComponents/IconCard";
import TextCard from "./EditorComponents/TextCard";
import ButtonCard from "./EditorComponents/ButtonCard";
import DeployModal from "./EditorComponents/DeployModal";
import EditTextModal from "./EditorComponents/EditTextModal";
import EditIconModal from "./EditorComponents/EditIconModal";
import EditButtonModal from "./EditorComponents/EditButtonModal";
import CropperModal from "./EditorComponents/CropperModal";
import { SketchPicker } from "react-color";
import fontOptions from "../../cardTemplate/cardContent/fontOptions";

import { UploadOutlined } from "@ant-design/icons";
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import getCroppedImg from "../../utils/getCroppedImg";
import { useCardEditorContext } from "../../contexts/CardEditorContext/useCardEditorContext";
import { saveProjectToFirestore } from "../../firebase/saveProjectToFirestore";
import { useAuth } from "../../contexts/AuthContext/useAuth";

const { Option } = Select;

const EditBoard = () => {
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
  const { control, handleSubmit, setValue } = useForm();

  const [history, setHistory] = useState([projectData]);
  const [currentStep, setCurrentStep] = useState(0);
  const [redoHistory, setRedoHistory] = useState([]);

  const updateProjectData = (newData) => {
    const updatedHistory = [...history.slice(0, currentStep + 1), newData];
    setHistory(updatedHistory);
    setCurrentStep(currentStep + 1);
    setRedoHistory([]);
    setProjectData(newData);
    console.log("update data");
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
  const [tempBackgroundImage, setTempBackgroundImage] = useState(
    projectData.background.backgroundImage,
  );
  const [tempBackgroundColor, setTempBackgroundColor] = useState(
    projectData.background.backgroundColor || "#ffffff",
  );
  const [tempOpacity, setTempOpacity] = useState(
    projectData.background.opacity || 0.6,
  );
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropModalVisible, setIsCropModalVisible] = useState(false);
  const [editableTextItem, setEditableTextItem] = useState(null);

  useEffect(() => {
    if (projectData) {
      setValue("title", projectData.title || "");
    }
  }, [projectData, setValue]);

  const onSubmit = async (data) => {
    const newProjectData = {
      title: data.title,
      templateId: template,
      background: {
        backgroundColor: projectData.background.backgroundColor || null,
        backgroundImage: projectData.background.backgroundImage || null,
        opacity: tempOpacity,
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
        image: projectData.avatar.image,
        style: {
          width: projectData.avatar.style.width,
          height: projectData.avatar.style.height,
        },
      },
    };

    console.log("Submit Project Data:", newProjectData);
    mutation.mutate(newProjectData, {
      action: data.action,
    });
  };

  const mutation = useMutation(
    (newProjectData) =>
      saveProjectToFirestore(user.uid, projectId, newProjectData),
    {
      onSuccess: (savedProjectId, variables) => {
        const { action } = variables;

        queryClient.invalidateQueries("userProjects");

        if (action === "publish") {
          setNewProjectUrl(`/sealink/${savedProjectId || projectId}`);
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
          message.error(`Upload failed: ${error.message}`);
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
      setTempBackgroundImage(downloadURL);
      onSuccessCallback(downloadURL);
      setUploading(false);
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to crop and upload the image.");
      setUploading(false);
    }
  };

  const handleUpload = (file, folderName, onSuccessCallback) => {
    setUploading(true);
    const reader = new FileReader();

    reader.onload = async () => {
      const base64URL = reader.result;
      setImageUrl(base64URL);

      const blob = new Blob([file], { type: file.type });

      const downloadURL = await uploadImageToFirebase(blob, folderName);
      onSuccessCallback(downloadURL);

      setUploading(false);
      setIsCropModalVisible(true);
      message.success("Image uploaded successfully!");
    };

    reader.readAsDataURL(file);
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

  const handleButtonDelete = (index) => {
    const updatedButtons = projectData.buttons.buttonList.filter(
      (_, i) => i !== index,
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
  };

  const handleIconDelete = (id) => {
    console.log("Deleting icon with ID:", id);
    const updatedIcons = icons.filter((icon) => icon.id !== id);
    console.log("Icons after deletion:", updatedIcons);

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

  const handleSaveBackgroundSettings = () => {
    if (useBackgroundImage && !tempBackgroundImage) {
      console.error(
        "Error: No background image available while useBackgroundImage is true",
      );
      return;
    }

    const updatedData = {
      ...projectData,
      background: {
        backgroundImage: useBackgroundImage
          ? `url(${tempBackgroundImage})`
          : null,
        backgroundColor: useBackgroundImage ? null : tempBackgroundColor,
        opacity: tempOpacity,
      },
    };
    setProjectData(updatedData);
    updateProjectData(updatedData);
    message.success("Background settings saved successfully!");
  };

  const renderTextEditor = () => {
    return (
      <>
        <h1 className="mb-4 text-xl">Texts</h1>
        {projectData.texts.map((item, index) => (
          <TextCard
            key={index}
            textItem={item}
            index={index}
            onEdit={() => {
              setSelectedText(index);
              setEditableTextItem(item);
              setIsModalVisible(true);
            }}
            onDelete={() => {
              const updatedTexts = projectData.texts.filter(
                (_, idx) => idx !== index,
              );

              const updatedItemsOrder = itemsOrder.filter(
                (orderItem) => orderItem.id !== `text-${index + 1}`,
              );

              const updatedData = {
                ...projectData,
                texts: updatedTexts,
                itemsOrder: updatedItemsOrder,
              };
              setProjectData(updatedData);
              updateProjectData(updatedData);
            }}
            onUpdate={(index, updatedItem) => {
              const updatedTexts = projectData.texts.map((item, idx) =>
                idx === index ? updatedItem : item,
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
        <button
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => {
            const newTextItem = {
              text: "New Text",
              style: {
                fontSize: "16px",
                fontWeight: 400,
                color: "#000000",
                fontFamily: "Arial",
              },
            };
            const newId = `text-${projectData.texts.length + 1}`;

            const updatedData = {
              ...projectData,
              texts: [...projectData.texts, newTextItem],
              itemsOrder: [
                ...projectData.itemsOrder,
                { id: newId, type: "text" },
              ],
            };
            setProjectData(updatedData);
            updateProjectData(updatedData);
          }}
        >
          Add New Text
        </button>

        <EditTextModal
          isTextModalVisible={isModalVisible}
          setIsTextModalVisible={setIsModalVisible}
          editTextData={editableTextItem}
          setEditTextData={setEditableTextItem}
          handleSaveTextEdit={() => {
            const updatedTexts = projectData.texts.map((item, idx) =>
              idx === selectedText ? editableTextItem : item,
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
          <h2 className="mb-4 text-xl">Icons</h2>
          <h2 className="text-lg">Current Icons</h2>
          {icons.map((icon) => (
            <IconCard
              key={icon.id}
              icon={icon.icon}
              iconColor="black"
              iconName={icon.name}
              onEdit={() => handleIconEdit(icon.name)}
              onDelete={() => handleIconDelete(icon.id)}
            />
          ))}
          <div className="my-4">
            <label>Icon Color</label>
            <div onClick={() => setShowFontColorPicker(!showFontColorPicker)}>
              <div
                style={{
                  backgroundColor: iconColor,
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              />
            </div>
            {showFontColorPicker && (
              <div style={{ position: "absolute", zIndex: 2 }}>
                <SketchPicker
                  color={editIconData?.color}
                  onChangeComplete={(color) => {
                    setEditIconData({ ...editIconData, color: color.hex });
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
          <div className="my-4 flex flex-col">
            <label>Icon Size</label>
            <input
              type="range"
              min="10"
              max="100"
              value={iconSize}
              onChange={(e) => {
                const newSize = parseInt(e.target.value, 10);
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
              className="slider"
            />
            <span>{iconSize}px</span>
          </div>

          <h2 className="my-2 text-lg">Add Icons</h2>
          <Select
            className="w-full"
            placeholder="Select an icon"
            onChange={(value) => setSelectedIcon(value)}
          >
            {ICON_LIST.map((icon) => {
              const IconComponent = icon.icon;
              const isIconAdded = icons.some(
                (existingIcon) => existingIcon.name === icon.name,
              );

              return (
                <Option
                  key={icon.name}
                  value={icon.name}
                  disabled={isIconAdded}
                >
                  <div
                    className={`flex items-center ${isIconAdded ? "opacity-50" : "opacity-100"}`}
                  >
                    <IconComponent size={20} className="mr-2" />
                    <span>{icon.name}</span>
                  </div>
                </Option>
              );
            })}
          </Select>
          <Button className="mt-4" type="default" onClick={addIcon}>
            Add Icon
          </Button>
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
        <h1 className="text-xl">Button</h1>
        <div className="mt-4">
          {buttonList.map((button, index) => (
            <ButtonCard
              key={index}
              button={button}
              index={index}
              onEdit={() => handleButtonEdit(button, index)}
              onDelete={() => handleButtonDelete(index)}
            />
          ))}
        </div>

        <Button
          type="primary"
          onClick={() => {
            const newButtonId = `button-${buttonList.length + 1}`;
            const newButton = {
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

        <div className="mt-4">
          <label>Background Color</label>
          <div
            style={{
              backgroundColor: style.backgroundColor,
              width: "40px",
              height: "40px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => {
              setShowBackgroundColorPicker(!showBackgroundColorPicker);
              setShowFontColorPicker(false);
            }}
          />
          {showBackgroundColorPicker && (
            <div className="absolute z-10">
              <SketchPicker
                color={style.backgroundColor}
                onChangeComplete={(color) =>
                  handleButtonStyleChange("backgroundColor", color.hex)
                }
              />
            </div>
          )}
        </div>

        <div className="mt-4">
          <label>Width</label>
          <input
            type="range"
            min="50"
            max="100"
            value={parseInt(style.width, 10) || 70}
            onChange={(e) =>
              handleButtonStyleChange("width", `${e.target.value}%`)
            }
          />
          <span>{style.width}</span>
        </div>

        <div className="mt-4">
          <label>Border Radius</label>
          <input
            type="range"
            min="1"
            max="50"
            value={parseInt(style.borderRadius, 10) || 20}
            onChange={(e) =>
              handleButtonStyleChange("borderRadius", `${e.target.value}px`)
            }
          />
          <span>{style.borderRadius}</span>
        </div>

        <div className="mt-4">
          <label>Padding</label>
          <input
            type="range"
            min="1"
            max="50"
            value={parseInt(style.padding, 10) || 20}
            onChange={(e) =>
              handleButtonStyleChange("padding", `${e.target.value}px`)
            }
          />
          <span>{style.padding}</span>
        </div>

        <div className="mt-4">
          <label>Font Size</label>
          <input
            type="range"
            min="10"
            max="50"
            value={parseInt(style.fontSize, 10) || 18}
            onChange={(e) =>
              handleButtonStyleChange("fontSize", `${e.target.value}px`)
            }
          />
          <span>{style.fontSize}</span>
        </div>

        <div className="mt-4">
          <label>Font Weight</label>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={
              style.fontWeight === 300
                ? 1
                : style.fontWeight === 400
                  ? 2
                  : style.fontWeight === 600
                    ? 3
                    : 4
            }
            onChange={(e) => {
              const weightMap = {
                1: 300,
                2: 400,
                3: 600,
                4: 700,
              };
              handleButtonStyleChange("fontWeight", weightMap[e.target.value]);
            }}
          />
          <span>{style.fontWeight}</span>
        </div>

        <div className="mt-4">
          <label>Font Family</label>
          <Select
            value={style.fontFamily}
            onChange={(value) => handleButtonStyleChange("fontFamily", value)}
            className="rounded border p-2"
          >
            {fontOptions.map((font) => (
              <Option
                key={font.value}
                value={font.value}
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mt-4">
          <label>Text Color</label>
          <div
            style={{
              backgroundColor: style.color,
              width: "40px",
              height: "40px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={() => {
              setShowFontColorPicker(!showFontColorPicker);
              setShowBackgroundColorPicker(false);
            }}
          />
          {showFontColorPicker && (
            <div style={{ position: "absolute", zIndex: 2 }}>
              <SketchPicker
                color={style.color}
                onChangeComplete={(color) =>
                  handleButtonStyleChange("color", color.hex)
                }
              />
            </div>
          )}
        </div>
      </>
    );
  };

  const renderBackgroundEditor = () => (
    <div>
      <h2 className="mb-4">Edit Background</h2>
      <div className="my-4">
        <label>Use Background Image</label>
        <Switch
          checked={useBackgroundImage}
          onChange={(checked) => setUseBackgroundImage(checked)}
        />
      </div>

      {useBackgroundImage ? (
        <div>
          <label>Background Image URL</label>
          <Input
            value={tempBackgroundImage}
            placeholder="Enter image URL or upload"
          />
          <Upload
            beforeUpload={(file) =>
              handleUpload(file, "backgroundimage", (downloadURL) => {
                setTempBackgroundImage(downloadURL);
                updateProjectData((prevData) => ({
                  ...prevData,
                  background: {
                    ...prevData.background,
                    backgroundImage: downloadURL,
                  },
                }));
              })
            }
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
          </Upload>

          <CropperModal
            isCropModalVisible={isCropModalVisible}
            setIsCropModalVisible={setIsCropModalVisible}
            imageUrl={imageUrl}
            crop={crop}
            setCrop={setCrop}
            zoom={zoom}
            setZoom={setZoom}
            aspect={9 / 16}
            onCropComplete={onCropComplete}
            handleSaveCroppedImage={() =>
              handleSaveCroppedImage("backgroundimage", (downloadURL) => {
                setTempBackgroundImage(downloadURL);
                setProjectData((prevData) => ({
                  ...prevData,
                  background: {
                    ...prevData.background,
                    backgroundImage: downloadURL,
                  },
                }));
              })
            }
            uploading={uploading}
          />
        </div>
      ) : (
        <div className="my-4">
          <label>Background Color</label>
          <div
            onClick={() =>
              setShowBackgroundColorPicker(!showBackgroundColorPicker)
            }
          >
            <div
              style={{
                backgroundColor: tempBackgroundColor,
                width: "40px",
                height: "40px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            />
          </div>
          {showBackgroundColorPicker && (
            <div className="absolute z-10">
              <SketchPicker
                color={tempBackgroundColor}
                onChangeComplete={(color) => setTempBackgroundColor(color.hex)}
              />
            </div>
          )}
        </div>
      )}

      <div className="my-4">
        <label>Background Opacity</label>
        <Slider
          min={0.1}
          max={1}
          step={0.1}
          value={tempOpacity}
          onChange={(value) => setTempOpacity(value)}
        />
        <span>{tempOpacity}</span>
      </div>

      <Button type="primary" onClick={handleSaveBackgroundSettings}>
        Save Background Settings
      </Button>
    </div>
  );

  const renderAvatarEditor = () => (
    <div>
      <h2 className="mb-4">Edit Avatar</h2>
      {projectData.avatar?.image && (
        <>
          <div className="my-4">
            <label>Adjust Avatar Size</label>
            <Slider
              min={50}
              max={300}
              value={parseInt(projectData.avatar.style.width, 10)}
              onChange={handleAvatarSizeChange}
            />
          </div>
          <div className="my-4">
            <Button
              danger
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
              Delete Avatar
            </Button>
          </div>
        </>
      )}

      <div className="my-4">
        <Upload
          beforeUpload={(file) =>
            handleUpload(file, "avatars", (downloadURL) => {
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
            })
          }
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />} loading={uploading}>
            {uploading ? "Uploading..." : "Upload New Avatar"}
          </Button>
        </Upload>
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
            setProjectData((prevData) => ({
              ...prevData,
              avatar: {
                ...prevData.avatar,
                image: downloadURL,
              },
            }));
          })
        }
        uploading={uploading}
      />
    </div>
  );

  const renderUserProjectForm = () => {
    return (
      <div className="rounded-lg p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field, fieldState: { error } }) => (
              <div className="mb-4">
                <label className="mb-1 block font-bold text-gray-700">
                  Title (required)
                </label>
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
            defaultValue="draft"
            render={({ field, fieldState: { error } }) => (
              <div className="mb-4">
                <label className="mb-1 block font-bold text-gray-700">
                  Action
                </label>
                <Radio.Group
                  {...field}
                  className={`space-y-2 ${error ? "border-red-500" : ""}`}
                >
                  <Space direction="vertical">
                    <Radio value="publish">Publish to a /sealink/id URL</Radio>
                    <Radio value="draft">Save as an offline draft</Radio>
                  </Space>
                </Radio.Group>
                {error && (
                  <span className="text-sm text-red-500">{error.message}</span>
                )}
              </div>
            )}
          />
          <Button type="primary" htmlType="submit" className="mt-4">
            Save
          </Button>
        </form>
      </div>
    );
  };

  return (
    <section className="fixed right-0 flex h-screen w-[450px] flex-[3] flex-col overflow-y-auto bg-white">
      <DeployModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectUrl={newProjectUrl}
      />
      <NavBar
        onUndo={handleUndo}
        onRedo={handleRedo}
        disableUndo={currentStep === 0}
        disableRedo={redoHistory.length === 0}
      />

      <div className="flex flex-col p-4">
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
