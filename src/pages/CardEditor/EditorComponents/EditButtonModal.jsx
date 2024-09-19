import { Modal, Input } from "antd";
import PropTypes from "prop-types";

const EditButtonModal = ({
  isButtonModalVisible,
  setIsButtonModalVisible,
  editButtonData,
  setEditButtonData,
  handleSaveButtonEdit,
}) => (
  <Modal
    title="Edit Button"
    open={isButtonModalVisible}
    onOk={handleSaveButtonEdit}
    onCancel={() => setIsButtonModalVisible(false)}
  >
    <div>
      <label>Button Text</label>
      <Input
        type="text"
        value={editButtonData?.text}
        onChange={(e) =>
          setEditButtonData({ ...editButtonData, text: e.target.value })
        }
      />
    </div>
    <div className="mt-4">
      <label>Button URL</label>
      <Input
        type="text"
        value={editButtonData?.url}
        onChange={(e) =>
          setEditButtonData({ ...editButtonData, url: e.target.value })
        }
      />
    </div>
  </Modal>
);

EditButtonModal.propTypes = {
  isButtonModalVisible: PropTypes.bool.isRequired,
  setIsButtonModalVisible: PropTypes.func.isRequired,
  editButtonData: PropTypes.object.isRequired,
  setEditButtonData: PropTypes.func.isRequired,
  handleSaveButtonEdit: PropTypes.func.isRequired,
};

export default EditButtonModal;
