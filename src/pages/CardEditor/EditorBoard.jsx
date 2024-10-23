import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AvatarEditor from "@/features/cardEdit/components/AvatarEditor";
import BackgroundEditor from "@/features/cardEdit/components/BackgroundEditor";
import ButtonEditor from "@/features/cardEdit/components/ButtonEditor";
import IconEditor from "@/features/cardEdit/components/IconEditor";
import TextEditor from "@/features/cardEdit/components/TextEditor";
import { useIconEditor } from "@/features/cardEdit/hooks/useIconEditor";
import { useToast } from "@/hooks/use-toast";
import PropTypes from "prop-types";
import { useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import { useCardEditorContext } from "../../contexts/CardEditorContext/useCardEditorContext";
import DeployModal from "../../features/cardEdit/components/DeployModal";
import NavBar from "../../features/cardEdit/components/NavBar";
import useAvatarEditor from "../../features/cardEdit/hooks/useAvatarEditor";
import { useButtonEditor } from "../../features/cardEdit/hooks/useButtonEditor";
import { useHistoryLogic } from "../../features/cardEdit/hooks/useHistoryLogic";
import useImageUploadAndCrop from "../../features/cardEdit/hooks/useImageUploadAndCrop";
import { useSubmitProject } from "../../features/cardEdit/hooks/useSubmitProject";
import { ICON_LIST } from "../../features/cardTemplate/data/iconList";
const EditBoard = ({ isMobile, setIsMobile }) => {
  const {
    projectId,
    projectData,
    setProjectData,
    selectedText,
    setSelectedText,
    editingType,
  } = useCardEditorContext();

  const initialState = {
    isDeployModalOpen: false,
    newProjectUrl: "",
    showBackgroundColorPicker: false,
    showFontColorPicker: false,
    useBackgroundImage: !!projectData.background.backgroundImage,
    editableTextItem: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_IS_MODAL_OPEN":
        return { ...state, isDeployModalOpen: action.payload };
      case "SET_NEW_PROJECT_URL":
        return { ...state, newProjectUrl: action.payload };
      case "TOGGLE_BACKGROUND_COLOR_PICKER":
        return {
          ...state,
          showBackgroundColorPicker: !state.showBackgroundColorPicker,
          showFontColorPicker: false,
        };
      case "TOGGLE_FONT_COLOR_PICKER":
        return {
          ...state,
          showFontColorPicker: !state.showFontColorPicker,
          showBackgroundColorPicker: false,
        };
      case "CLOSE_ALL_COLOR_PICKERS":
        return {
          ...state,
          showBackgroundColorPicker: false,
          showFontColorPicker: false,
        };
      case "SET_USE_BACKGROUND_IMAGE":
        return {
          ...state,
          useBackgroundImage: action.payload,
        };
      case "SET_EDITABLE_TEXT_ITEM":
        return {
          ...state,
          editableTextItem: action.payload,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const { toast } = useToast();

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
    setSelectedIcon,
    isModalVisible,
    setIsModalVisible,
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

  const handleOuterClick = () => {
    dispatch({ type: "CLOSE_ALL_COLOR_PICKERS" });
  };

  const { onSubmit } = useSubmitProject({
    userId: user.uid,
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
  });

  const handleSubmitProject = (data) => {
    onSubmit(data);
  };

  const renderTextEditor = () => (
    <TextEditor
      projectData={projectData}
      setProjectData={setProjectData}
      updateProjectData={updateProjectData}
      setIsModalVisible={setIsModalVisible}
      isModalVisible={isModalVisible}
      dispatch={dispatch}
      state={state}
      itemsOrder={itemsOrder}
      selectedText={selectedText}
      setSelectedText={setSelectedText}
    />
  );

  const renderIconList = () => (
    <IconEditor
      projectData={projectData}
      icons={icons}
      ICON_LIST={ICON_LIST}
      iconColor={iconColor}
      iconSize={iconSize}
      addIcon={addIcon}
      handleIconEdit={handleIconEdit}
      handleIconDelete={handleIconDelete}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      setSelectedIcon={setSelectedIcon}
      editIconData={editIconData}
      setEditIconData={setEditIconData}
      handleSaveIconEdit={handleSaveIconEdit}
      state={state}
      dispatch={dispatch}
      updateProjectData={updateProjectData}
    />
  );

  const renderButtonEditor = () => (
    <ButtonEditor
      projectData={projectData}
      setProjectData={setProjectData}
      updateProjectData={updateProjectData}
      isButtonModalVisible={isButtonModalVisible}
      setIsButtonModalVisible={setIsButtonModalVisible}
      editButtonData={editButtonData}
      setEditButtonData={setEditButtonData}
      handleButtonEdit={handleButtonEdit}
      handleSaveButtonEdit={handleSaveButtonEdit}
      handleButtonDelete={handleButtonDelete}
      handleButtonStyleChange={handleButtonStyleChange}
      state={state}
      dispatch={dispatch}
    />
  );

  const renderBackgroundEditor = () => (
    <BackgroundEditor
      projectData={projectData}
      setProjectData={setProjectData}
      updateProjectData={updateProjectData}
      state={state}
      dispatch={dispatch}
      setImageUrl={setImageUrl}
      setIsCropModalVisible={setIsCropModalVisible}
      imageUrl={imageUrl}
      crop={crop}
      setCrop={setCrop}
      zoom={zoom}
      setZoom={setZoom}
      isCropModalVisible={isCropModalVisible}
      onCropComplete={onCropComplete}
      handleSaveCroppedImage={handleSaveCroppedImage}
      uploading={uploading}
    />
  );

  const renderAvatarEditor = () => (
    <AvatarEditor
      projectData={projectData}
      setProjectData={setProjectData}
      updateProjectData={updateProjectData}
      handleAvatarSizeChange={handleAvatarSizeChange}
      deleteAvatar={deleteAvatar}
      setImageUrl={setImageUrl}
      setIsCropModalVisible={setIsCropModalVisible}
      imageUrl={imageUrl}
      crop={crop}
      setCrop={setCrop}
      zoom={zoom}
      setZoom={setZoom}
      isCropModalVisible={isCropModalVisible}
      onCropComplete={onCropComplete}
      handleSaveCroppedImage={handleSaveCroppedImage}
      uploading={uploading}
    />
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
        isOpen={state.isDeployModalOpen}
        onClose={() => dispatch({ type: "SET_IS_MODAL_OPEN", payload: false })}
        projectUrl={state.newProjectUrl}
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

EditBoard.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  setIsMobile: PropTypes.func.isRequired,
};

export default EditBoard;
