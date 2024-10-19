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
import { useIconEditor } from "@/features/cardEdit/hooks/useIconEditor";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { Controller, useForm } from "react-hook-form";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import { useCardEditorContext } from "../../contexts/CardEditorContext/useCardEditorContext";
import ButtonCard from "../../features/cardEdit/components/ButtonCard";
import CropperModal from "../../features/cardEdit/components/CropperModal";
import DeployModal from "../../features/cardEdit/components/DeployModal";
import EditButtonModal from "../../features/cardEdit/components/EditButtonModal";
import EditIconModal from "../../features/cardEdit/components/EditIconModal";
import EditTextModal from "../../features/cardEdit/components/EditTextModal";
import IconCard from "../../features/cardEdit/components/IconCard";
import IconSelect from "../../features/cardEdit/components/IconSelect";
import NavBar from "../../features/cardEdit/components/NavBar";
import TextCard from "../../features/cardEdit/components/TextCard";
import UploadButton from "../../features/cardEdit/components/UploadButton";
import useAvatarEditor from "../../features/cardEdit/hooks/useAvatarEditor";
import { useButtonEditor } from "../../features/cardEdit/hooks/useButtonEditor";
import { useHistoryLogic } from "../../features/cardEdit/hooks/useHistoryLogic";
import useImageUploadAndCrop from "../../features/cardEdit/hooks/useImageUploadAndCrop";
import { useSubmitProject } from "../../features/cardEdit/hooks/useSubmitProject";
import fontOptions from "../../features/cardTemplate/data/fontOptions";
import { ICON_LIST } from "../../features/cardTemplate/data/iconList";
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
  const updateProjectData = (newData) => {
    updateHistory(newData);
    setProjectData(newData);
  };
  const {
    icons,
    iconColor,
    iconSize,
    editIconData,
    setEditIconData,
    isModalVisible,
    setIsModalVisible,
    setSelectedIcon,
    handleIconEdit,
    handleSaveIconEdit,
    addIcon,
    handleIconDelete,
  } = useIconEditor(projectData, setProjectData, updateProjectData, toast);
  const {
    isButtonModalVisible,
    setIsButtonModalVisible,
    editButtonData,
    setEditButtonData,
    handleButtonEdit,
    handleSaveButtonEdit,
    handleButtonDelete,
    handleButtonStyleChange,
  } = useButtonEditor(projectData, setProjectData, updateProjectData);
  const {
    imageUrl,
    setImageUrl,
    uploading,
    crop,
    setCrop,
    zoom,
    setZoom,
    isCropModalVisible,
    setIsCropModalVisible,
    onCropComplete,
    handleSaveCroppedImage,
  } = useImageUploadAndCrop();

  const { handleAvatarSizeChange, deleteAvatar } = useAvatarEditor(
    projectData,
    setProjectData,
    updateProjectData,
  );

  const { itemsOrder } = projectData;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { template } = useParams();
  const defaultValues = {
    title: projectData?.title || "",
  };
  const { control, handleSubmit } = useForm({
    defaultValues,
  });
  const {
    handleUndo,
    handleRedo,
    handleReset,
    updateHistory,
    currentStep,
    redoHistory,
  } = useHistoryLogic(projectData, setProjectData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectUrl, setNewProjectUrl] = useState("");
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);
  const [useBackgroundImage, setUseBackgroundImage] = useState(
    !!projectData.background.backgroundImage,
  );
  const [editableTextItem, setEditableTextItem] = useState(null);

  const handleOuterClick = () => {
    setShowBackgroundColorPicker(false);
    setShowFontColorPicker(false);
  };

  const { onSubmit } = useSubmitProject({
    userId: user.uid,
    projectId,
    setNewProjectUrl,
    setIsModalOpen,
    navigate,
    toast,
    projectData,
    template,
    icons,
    iconColor,
    iconSize,
    itemsOrder,
  });
  const handleSubmitProject = (data) => {
    onSubmit(data);
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
              onClick={deleteAvatar}
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
        <form onSubmit={handleSubmit(handleSubmitProject)}>
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
