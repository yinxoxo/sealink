import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import PropTypes from "prop-types";
import { FaRegTrashCan } from "react-icons/fa6";
import CropperModal from "./CropperModal";
import UploadButton from "./UploadButton";

const AvatarEditor = ({
  projectData,
  setProjectData,
  updateProjectData,
  handleAvatarSizeChange,
  deleteAvatar,
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
};

AvatarEditor.propTypes = {
  projectData: PropTypes.object.isRequired,
  setProjectData: PropTypes.func.isRequired,
  updateProjectData: PropTypes.func.isRequired,
  handleAvatarSizeChange: PropTypes.func.isRequired,
  deleteAvatar: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
  setIsCropModalVisible: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  crop: PropTypes.object.isRequired,
  setCrop: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  setZoom: PropTypes.func.isRequired,
  isCropModalVisible: PropTypes.bool.isRequired,
  onCropComplete: PropTypes.func.isRequired,
  handleSaveCroppedImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
};

export default AvatarEditor;
