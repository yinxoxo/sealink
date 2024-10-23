import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import PropTypes from "prop-types";
import { ChromePicker } from "react-color";
import CropperModal from "./CropperModal";
import UploadButton from "./UploadButton";

const BackgroundEditor = ({
  projectData,
  setProjectData,
  updateProjectData,
  state,
  dispatch,
  setImageUrl,
  setIsCropModalVisible,
  imageUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  isCropModalVisible,
  onCropComplete,
  handleSaveCroppedImage,
  uploading,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Background</h1>
      <div className="my-4 flex h-fit w-full items-center justify-between">
        <div className="flex w-full">
          <h1 className="text-lg font-medium">Use Background Image ?</h1>
        </div>
        <Switch
          checked={state.useBackgroundImage}
          onCheckedChange={(checked) =>
            dispatch({ type: "SET_USE_BACKGROUND_IMAGE", payload: checked })
          }
        />
      </div>

      {state.useBackgroundImage ? (
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
                dispatch({ type: "TOGGLE_BACKGROUND_COLOR_PICKER" });
              }}
            >
              {state.showBackgroundColorPicker && (
                <div
                  className="absolute top-10 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChromePicker
                    color={projectData.background.backgroundColor || "#fff"}
                    onChange={(color) => {
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
};

BackgroundEditor.propTypes = {
  projectData: PropTypes.object.isRequired,
  setProjectData: PropTypes.func.isRequired,
  updateProjectData: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
  setIsCropModalVisible: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  crop: PropTypes.object.isRequired,
  setCrop: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  setZoom: PropTypes.func.isRequired,
  isCropModalVisible: PropTypes.bool.isRequired,
  onCropComplete: PropTypes.func.isRequired,
  handleSaveCroppedImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
};

export default BackgroundEditor;
