import { Modal, Input, Select } from "antd";
import PropTypes from "prop-types";
import { ICON_LIST } from "../../../cardTemplate/cardContent/iconList";

const EditIconModal = ({
  isModalVisible,
  setIsModalVisible,
  editIconData,
  setEditIconData,
  handleSaveEdit,
}) => (
  <Modal
    title="Edit Icon"
    open={isModalVisible}
    onOk={handleSaveEdit}
    onCancel={() => setIsModalVisible(false)}
  >
    <div>
      <label>Icon Type</label>
      <Select
        value={editIconData.name}
        style={{ width: "100%" }}
        onChange={(value) => {
          const selectedIcon = ICON_LIST.find((icon) => icon.name === value);
          if (selectedIcon) {
            setEditIconData({
              ...editIconData,
              name: value,
              icon: selectedIcon.icon,
            });
          }
        }}
      >
        {ICON_LIST.map((icon) => (
          <Select.Option key={icon.name} value={icon.name}>
            <div className="flex items-center">
              <icon.icon size={20} className="mr-2" />
              <span>{icon.name}</span>
            </div>
          </Select.Option>
        ))}
      </Select>
    </div>
    <div className="mt-4">
      <label>Icon Link (Href)</label>
      <Input
        value={editIconData.href}
        onChange={(e) =>
          setEditIconData({ ...editIconData, href: e.target.value })
        }
      />
    </div>
  </Modal>
);

EditIconModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  editIconData: PropTypes.object.isRequired,
  setEditIconData: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
};

export default EditIconModal;
