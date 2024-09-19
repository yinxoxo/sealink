import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import Cropper from "react-easy-crop";

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
  uploading,
}) => (
  <Modal
    className="h-full w-full"
    open={isCropModalVisible}
    onCancel={() => setIsCropModalVisible(false)}
    footer={[
      <Button key="back" onClick={() => setIsCropModalVisible(false)}>
        Cancel
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={uploading}
        onClick={handleSaveCroppedImage}
      >
        Confirm and Upload
      </Button>,
    ]}
  >
    <div style={{ height: 400, width: "100%" }}>
      {imageUrl && (
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={9 / 16}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      )}
    </div>
  </Modal>
);

CropperModal.propTypes = {
  isCropModalVisible: PropTypes.bool.isRequired,
  setIsCropModalVisible: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  crop: PropTypes.object.isRequired,
  setCrop: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  setZoom: PropTypes.func.isRequired,
  onCropComplete: PropTypes.func.isRequired,
  handleSaveCroppedImage: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
};

export default CropperModal;
