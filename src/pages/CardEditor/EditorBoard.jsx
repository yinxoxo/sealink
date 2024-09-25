import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
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
  Modal,
} from "antd";
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
import { ICON_LIST } from "../../cardTemplate/cardContent/iconList";
import { UploadOutlined } from "@ant-design/icons";
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import getCroppedImg from "../../utils/getCroppedImg";
import { useCardEditorContext } from "../../contexts/CardEditorContext";
import { saveProjectToFirestore } from "../../firebase/saveProjectToFirestore";
import { fetchUserProjects } from "../../firebase/fetchUserProjects";
import { useProjects } from "../../contexts/ProjectsContext";
import { useAuth } from "../../contexts/AuthContext";

const { Option } = Select;

const EditBoard = () => {
  const {
    projectId,
    setProjectId,
    currentProject,
    selectedText,
    setSelectedText,
    texts,
    setTexts,
    editingType,
    icons,
    setIcons,
    simpleCardButtons,
    setSimpleCardButtons,
    backgroundSettings,
    setBackgroundSettings,
    iconColor,
    setIconColor,
    iconSize,
    setIconSize,
    itemsOrder,
    setItemsOrder,
  } = useCardEditorContext();

  const navigate = useNavigate();
  const { user } = useAuth();
  const { template } = useParams();
  const { setProjects } = useProjects();

  const { control, handleSubmit, setValue } = useForm();

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
    !!backgroundSettings.backgroundImage,
  );
  const [tempBackgroundImage, setTempBackgroundImage] = useState(
    backgroundSettings.backgroundImage,
  );
  const [tempBackgroundColor, setTempBackgroundColor] = useState(
    backgroundSettings.backgroundColor || "#ffffff",
  );
  const [tempOpacity, setTempOpacity] = useState(
    backgroundSettings.opacity || 0.6,
  );
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropModalVisible, setIsCropModalVisible] = useState(false);
  const [editableTextItem, setEditableTextItem] = useState(null);
  const project = Array.isArray(currentProject)
    ? currentProject.find((p) => p.id === projectId)
    : null;

  console.log("current project in edit", currentProject);
  // console.log("icon in edit", icons);

  useEffect(() => {
    if (project) {
      setValue("title", project.title || "");
    }
  }, [project, setValue]);

  const onSubmit = async (data) => {
    const projectData = {
      title: data.title,
      templateId: template,
      background: {
        backgroundColor: backgroundSettings.backgroundColor,
        backgroundImage: backgroundSettings.backgroundImage
          ? backgroundSettings.backgroundImage
          : null,
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
      texts: texts.map((text, index) => ({
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
        buttonList: simpleCardButtons.buttons.map((button, index) => ({
          id: `button-${index + 1}`,
          text: button.text,
          url: button.url,
        })),
        style: {
          backgroundColor: simpleCardButtons.style.backgroundColor,
          width: simpleCardButtons.style.width,
          color: simpleCardButtons.style.color,
          borderRadius: simpleCardButtons.style.borderRadius,
          padding: simpleCardButtons.style.padding,
          fontSize: simpleCardButtons.style.fontSize,
          fontWeight: simpleCardButtons.style.fontWeight,
          fontFamily: simpleCardButtons.style.fontFamily,
        },
      },
      itemsOrder: itemsOrder,
    };

    console.log("Project Data:", projectData);

    try {
      const savedProjectId = await saveProjectToFirestore(
        user.uid,
        projectId,
        projectData,
      );
      if (!projectId && savedProjectId) {
        setProjectId(savedProjectId);
      }
      const updatedProjects = await fetchUserProjects(user);
      setProjects(updatedProjects);

      if (data.action === "publish") {
        setNewProjectUrl(`/sealink/${savedProjectId || projectId}`);
        setIsModalOpen(true);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during project save:", error);
    }
  };

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

  const handleSaveCroppedImage = async () => {
    try {
      const { blob } = await getCroppedImg(imageUrl, croppedAreaPixels);

      setUploading(true);

      const downloadURL = await uploadImageToFirebase(blob, "cropped_images");

      setImageUrl(downloadURL);
      setTempBackgroundImage(downloadURL);
      setUploading(false);
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to crop and upload the image.");
      setUploading(false);
    }
  };

  const handleUpload = (file) => {
    setUploading(true);
    const reader = new FileReader();

    reader.onload = async () => {
      const base64URL = reader.result;
      setImageUrl(base64URL);

      const blob = new Blob([file], { type: file.type });

      const downloadURL = await uploadImageToFirebase(blob, "backgroundimage");

      setTempBackgroundImage(downloadURL);
      setUploading(false);
      setIsCropModalVisible(true);
      message.success("Image uploaded successfully!");
    };

    reader.readAsDataURL(file);
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
    setIcons(updatedIcons);

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
        setIcons([...icons, newIcon]);
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
    const updatedButtons = simpleCardButtons.buttons.map((button, i) =>
      i === editButtonData.index ? { ...editButtonData } : button,
    );
    setSimpleCardButtons({
      ...simpleCardButtons,
      buttons: updatedButtons,
    });
    setIsButtonModalVisible(false);
  };

  const handleButtonDelete = (index) => {
    const updatedButtons = simpleCardButtons.buttons.filter(
      (_, i) => i !== index,
    );
    setSimpleCardButtons({
      ...simpleCardButtons,
      buttons: updatedButtons,
    });
  };

  const handleIconDelete = (id) => {
    console.log("Deleting icon with ID:", id);
    const updatedIcons = icons.filter((icon) => icon.id !== id);
    console.log("Icons after deletion:", updatedIcons);

    setIcons(updatedIcons);
  };

  const handleColorChange = (color) => {
    setTexts(
      texts.map((item, idx) =>
        idx === selectedText
          ? { ...item, style: { ...item.style, color: color.hex } }
          : item,
      ),
    );
  };

  const handleFontChange = (e) => {
    const selectedFont = e.target.value;

    setTexts(
      texts.map((item, idx) =>
        idx === selectedText
          ? { ...item, style: { ...item.style, fontFamily: selectedFont } }
          : item,
      ),
    );
  };

  const handleButtonStyleChange = (styleProp, value) => {
    setSimpleCardButtons((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        [styleProp]: value,
      },
    }));
  };

  const handleSaveBackgroundSettings = () => {
    if (useBackgroundImage && !tempBackgroundImage) {
      console.error(
        "Error: No background image available while useBackgroundImage is true",
      );
      return;
    }

    setBackgroundSettings((prevSettings) => {
      const newSettings = {
        ...prevSettings,
        backgroundImage: useBackgroundImage
          ? `url(${tempBackgroundImage})`
          : null,
        backgroundColor: useBackgroundImage ? null : tempBackgroundColor,
        opacity: tempOpacity,
      };

      return newSettings;
    });

    message.success("Background settings saved successfully!");
  };

  const renderTextEditor = () => {
    const currentFontStyle = texts[selectedText]?.style || {};
    return (
      <>
        <h1 className="mb-4 text-xl">Texts</h1>
        {texts.map((item, index) => (
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
              const updatedTexts = texts.filter((_, idx) => idx !== index);
              setTexts(updatedTexts);

              const updatedItemsOrder = itemsOrder.filter(
                (orderItem) => orderItem.id !== `text-${index + 1}`,
              );
              setItemsOrder(updatedItemsOrder);
            }}
            onUpdate={(index, updatedItem) => {
              const updatedTexts = texts.map((item, idx) =>
                idx === index ? updatedItem : item,
              );
              setTexts(updatedTexts);
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
            const newId = `text-${texts.length + 1}`;
            setTexts([...texts, newTextItem]);
            setItemsOrder([...itemsOrder, { id: newId, type: "text" }]);
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
            const updatedTexts = texts.map((item, idx) =>
              idx === selectedText ? editableTextItem : item,
            );
            setTexts(updatedTexts);
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
                    setIconColor(color.hex);
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
              onChange={(e) => setIconSize(parseInt(e.target.value, 10))}
              className="slider"
            />
            <span>{iconSize}px</span>
          </div>

          <h2 className="my-2 text-lg">Add Icons</h2>
          <Select
            style={{ width: "100%" }}
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
                    className="flex items-center"
                    style={{ opacity: isIconAdded ? 0.5 : 1 }}
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
    const { style, buttons } = simpleCardButtons;

    return (
      <>
        <h1 className="text-xl">Button</h1>
        <div className="mt-4">
          {buttons.map((button, index) => (
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
            const newButtonId = `button-${simpleCardButtons.buttons.length + 1}`;
            setSimpleCardButtons((prev) => {
              const newButton = {
                text: "New Button",
                url: "https://example.com/new-button",
              };
              const updatedButtons = [...prev.buttons, newButton];
              return {
                ...prev,
                buttons: updatedButtons,
              };
            });

            setItemsOrder((prevOrder) => {
              const newItemOrder = { id: newButtonId, type: "button" };
              return [...prevOrder, newItemOrder];
            });
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
              <Option key={font.value} value={font.value}>
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
            beforeUpload={(file) => {
              handleUpload(file);
              return false;
            }}
            showUploadList={false}
          >
            <Button
              icon={<UploadOutlined />}
              loading={uploading}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
          </Upload>
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
      <NavBar />

      <div className="flex flex-col p-4">
        {editingType === "text" ? (
          renderTextEditor()
        ) : editingType === "icon" ? (
          renderIconList()
        ) : editingType === "saveProject" ? (
          renderUserProjectForm()
        ) : editingType === "button" ? (
          renderButtonEditor()
        ) : editingType === "background" ? (
          <>
            {renderBackgroundEditor()}
            <CropperModal
              isCropModalVisible={isCropModalVisible}
              setIsCropModalVisible={setIsCropModalVisible}
              imageUrl={imageUrl}
              crop={crop}
              setCrop={setCrop}
              zoom={zoom}
              setZoom={setZoom}
              onCropComplete={onCropComplete}
              handleSaveCroppedImage={handleSaveCroppedImage}
              uploading={uploading}
            />
          </>
        ) : null}
      </div>
    </section>
  );
};

export default EditBoard;
