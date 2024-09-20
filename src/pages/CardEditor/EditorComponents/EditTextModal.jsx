import { useState } from "react";
import { Modal, Input, Slider, Select } from "antd";
import { SketchPicker } from "react-color";
import PropTypes from "prop-types";
import { fontOptions } from "../../../cardTemplate/cardContent/fontOptions";

const { Option } = Select;

const EditTextModal = ({
  isTextModalVisible,
  setIsTextModalVisible,
  editTextData,
  setEditTextData,
  handleSaveTextEdit,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <Modal
      title="Edit Text"
      open={isTextModalVisible}
      onOk={handleSaveTextEdit}
      onCancel={() => setIsTextModalVisible(false)}
    >
      <div>
        <label>Text Content</label>
        <Input
          type="text"
          value={editTextData?.text}
          onChange={(e) =>
            setEditTextData({ ...editTextData, text: e.target.value })
          }
        />
      </div>

      <div className="mt-4">
        <label>Font Size</label>
        <Slider
          min={10}
          max={100}
          value={parseInt(
            editTextData?.style?.fontSize?.toString().replace("px", ""),
          )}
          onChange={(value) =>
            setEditTextData({
              ...editTextData,
              style: { ...editTextData.style, fontSize: value },
            })
          }
        />
        <span>{editTextData?.style?.fontSize}</span>
      </div>

      <div className="mt-4">
        <label>Font Color</label>
        <div onClick={() => setShowColorPicker(!showColorPicker)}>
          <div
            style={{
              backgroundColor: editTextData?.style?.color,
              width: "40px",
              height: "40px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          />
        </div>
        {showColorPicker && (
          <div style={{ position: "absolute", zIndex: 2 }}>
            <SketchPicker
              onChangeComplete={(color) =>
                setEditTextData({
                  ...editTextData,
                  style: { ...editTextData.style, color: color.hex },
                })
              }
            />
          </div>
        )}
      </div>

      <div className="mt-4">
        <label>Font Weight</label>
        <Slider
          min={300}
          max={700}
          step={100}
          value={editTextData?.style?.fontWeight}
          onChange={(value) =>
            setEditTextData({
              ...editTextData,
              style: { ...editTextData.style, fontWeight: value },
            })
          }
        />
        <span>{editTextData?.style?.fontWeight}</span>
      </div>

      <div className="mt-4">
        <label>Font Family</label>
        <Select
          value={editTextData?.style?.fontFamily}
          onChange={(value) =>
            setEditTextData({
              ...editTextData,
              style: { ...editTextData.style, fontFamily: value },
            })
          }
          style={{ width: "100%" }}
        >
          {fontOptions.map((font) => (
            <Select.Option key={font.value} value={font.value}>
              {font.label}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};

EditTextModal.propTypes = {
  isTextModalVisible: PropTypes.bool.isRequired,
  setIsTextModalVisible: PropTypes.func.isRequired,
  editTextData: PropTypes.object.isRequired,
  setEditTextData: PropTypes.func.isRequired,
  handleSaveTextEdit: PropTypes.func.isRequired,
};

export default EditTextModal;
