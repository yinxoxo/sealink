import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";

const CropperModal = ({
  isCropModalVisible,
  setIsCropModalVisible,
  imageUrl,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  handleSaveCroppedImage,
  aspect,
  cropShape = "rect",
}) => (
  <Dialog open={isCropModalVisible} onOpenChange={setIsCropModalVisible}>
    <DialogContent className="h-auto p-0">
      <VisuallyHidden>
        <DialogTitle>Crop Your Image</DialogTitle>
        <DialogDescription>
          This is where you can crop your image.
        </DialogDescription>
      </VisuallyHidden>
      <div className="relative h-[600px] w-full">
        {imageUrl && (
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={cropShape}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                position: "relative",
                height: "100%",
                width: "100%",
              },
            }}
          />
        )}
        <div className="absolute bottom-0 right-0 flex justify-end space-x-2 p-2">
          <Button
            variant="outline"
            onClick={() => setIsCropModalVisible(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveCroppedImage}
            className="bg-button hover:bg-button-hover"
          >
            Upload
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

CropperModal.propTypes = {
  isCropModalVisible: PropTypes.bool.isRequired,
  setIsCropModalVisible: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  crop: PropTypes.object.isRequired,
  cropShape: PropTypes.string,
  setCrop: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  aspect: PropTypes.number.isRequired,
  setZoom: PropTypes.func.isRequired,
  onCropComplete: PropTypes.func.isRequired,
  handleSaveCroppedImage: PropTypes.func.isRequired,
};

export default CropperModal;
