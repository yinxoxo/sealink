import { useState } from "react";
import { SketchPicker } from "react-color";
import PropTypes from "prop-types";
import fontOptions from "../../../cardTemplate/cardContent/fontOptions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const EditTextModal = ({
  isTextModalVisible,
  setIsTextModalVisible,
  editTextData,
  setEditTextData,
  handleSaveTextEdit,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <Dialog open={isTextModalVisible} onOpenChange={setIsTextModalVisible}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Text</DialogTitle>
        </DialogHeader>

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
            defaultValue={[
              parseInt(
                editTextData?.style?.fontSize?.toString().replace("px", ""),
                10,
              ),
            ]}
            max={100}
            step={1}
            onValueChange={(value) =>
              setEditTextData({
                ...editTextData,
                style: { ...editTextData.style, fontSize: value[0] },
              })
            }
            className="w-full"
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
            defaultValue={[editTextData?.style?.fontWeight]}
            min={300}
            max={700}
            step={100}
            onValueChange={(value) =>
              setEditTextData({
                ...editTextData,
                style: { ...editTextData.style, fontWeight: value[0] },
              })
            }
            className="w-full"
          />
          <span>{editTextData?.style?.fontWeight}</span>
        </div>

        <div className="mt-4">
          <label>Font Family</label>
          <Select
            value={editTextData?.style?.fontFamily}
            onValueChange={(value) =>
              setEditTextData({
                ...editTextData,
                style: { ...editTextData.style, fontFamily: value },
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsTextModalVisible(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveTextEdit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

EditTextModal.propTypes = {
  isTextModalVisible: PropTypes.bool.isRequired,
  setIsTextModalVisible: PropTypes.func.isRequired,
  editTextData: PropTypes.object,
  setEditTextData: PropTypes.func.isRequired,
  handleSaveTextEdit: PropTypes.func.isRequired,
};

export default EditTextModal;
