import { useState } from "react";
import { ChromePicker } from "react-color";
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

  const handleDialogClick = () => {
    setShowColorPicker(false);
    console.log("outside click");
  };

  if (!editTextData) {
    return;
  }

  return (
    <Dialog open={isTextModalVisible} onOpenChange={setIsTextModalVisible}>
      <DialogContent onClick={handleDialogClick}>
        <DialogHeader>
          <DialogTitle>Edit Text</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Text Content</label>
          <Input
            type="text"
            value={editTextData.text}
            onChange={(e) =>
              setEditTextData({ ...editTextData, text: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Font Size</label>
          <span className="text-sm">{editTextData.style.fontSize}</span>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
            <Slider
              defaultValue={[
                parseInt(
                  editTextData.style.fontSize.toString().replace("px", ""),
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
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Font Color</label>
          <div
            className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-[#f4f4f5] p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="relative"
            >
              <div
                className="h-6 w-20 cursor-pointer rounded-md"
                style={{
                  backgroundColor: editTextData.style.color,
                }}
              />
            </div>
            {showColorPicker && (
              <div className="top-100 absolute z-10">
                <ChromePicker
                  color={editTextData.style.color}
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
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Font Weight</label>
          <span className="text-sm">{editTextData.style.fontWeight}</span>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
            <Slider
              defaultValue={[editTextData.style.fontWeight]}
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
          </div>
        </div>

        <div className="mt-4">
          <label>Font Family</label>
          <Select
            value={editTextData.style.fontFamily}
            onValueChange={(value) =>
              setEditTextData({
                ...editTextData,
                style: { ...editTextData.style, fontFamily: value },
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Font Family" />
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
          <Button
            onClick={handleSaveTextEdit}
            className="bg-button hover:bg-button-hover"
          >
            Save
          </Button>
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
