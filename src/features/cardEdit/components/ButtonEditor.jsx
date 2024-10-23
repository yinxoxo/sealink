import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import PropTypes from "prop-types";
import { ChromePicker } from "react-color";
import fontOptions from "../../cardTemplate/data/fontOptions";
import ButtonCard from "./ButtonCard";
import EditButtonModal from "./EditButtonModal";

const ButtonEditor = ({
  projectData,
  setProjectData,
  updateProjectData,
  isButtonModalVisible,
  setIsButtonModalVisible,
  editButtonData,
  setEditButtonData,
  handleButtonEdit,
  handleSaveButtonEdit,
  handleButtonDelete,
  handleButtonStyleChange,
  state,
  dispatch,
}) => {
  const { style, buttonList } = projectData.buttons;

  return (
    <>
      <div className="flex w-full">
        <h1 className="ml-2 text-3xl font-bold">Buttons</h1>
      </div>

      <div className="mt-4">
        {buttonList.map((button, index) => (
          <ButtonCard
            key={button.id}
            button={button}
            onEdit={() => handleButtonEdit(button, index)}
            onDelete={() => handleButtonDelete(button.id)}
          />
        ))}
      </div>

      <Button
        className="mt-6 bg-button hover:bg-button-hover"
        onClick={() => {
          const maxId = projectData.buttons.buttonList.reduce((max, button) => {
            const idNumber = parseInt(button.id.split("-")[1]);
            return idNumber > max ? idNumber : max;
          }, 0);

          const newButtonId = `button-${maxId + 1}`;
          const newButton = {
            id: newButtonId,
            text: "New Button",
            url: "https://example.com/new-button",
          };

          const updatedData = {
            ...projectData,
            buttons: {
              ...projectData.buttons,
              buttonList: [...projectData.buttons.buttonList, newButton],
            },
            itemsOrder: [
              ...projectData.itemsOrder,
              { id: newButtonId, type: "button" },
            ],
          };
          setProjectData(updatedData);
          updateProjectData(updatedData);
        }}
      >
        Add Button
      </Button>

      {editButtonData && (
        <EditButtonModal
          isButtonModalVisible={isButtonModalVisible}
          setIsButtonModalVisible={setIsButtonModalVisible}
          editButtonData={editButtonData}
          setEditButtonData={setEditButtonData}
          handleSaveButtonEdit={handleSaveButtonEdit}
        />
      )}

      <div className="mt-6 flex w-full">
        <h1 className="ml-2 text-2xl font-bold">Appearance</h1>
      </div>
      <div className="mt-4 space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Background Color</label>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-[#f4f4f5] p-2">
            <div
              className="relative h-6 w-20 cursor-pointer rounded"
              style={{
                backgroundColor: style.backgroundColor,
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
                    color={style.backgroundColor}
                    onChangeComplete={(color) =>
                      handleButtonStyleChange("backgroundColor", color.hex)
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Width</label>
          <span className="text-sm">{style.width}</span>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
            <Slider
              min={50}
              max={100}
              step={1}
              defaultValue={[parseInt(style.width, 10)]}
              onValueCommit={(value) =>
                handleButtonStyleChange("width", `${value[0]}%`)
              }
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Border Radius</label>
          <span className="text-sm">{style.borderRadius}</span>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
            <Slider
              min={1}
              max={50}
              step={1}
              defaultValue={[parseInt(style.borderRadius, 10)]}
              onValueCommit={(value) =>
                handleButtonStyleChange("borderRadius", `${value[0]}px`)
              }
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Padding</label>
          <span className="text-sm">{style.padding}</span>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
            <Slider
              min={1}
              max={50}
              step={1}
              defaultValue={[parseInt(style.padding, 10) || 20]}
              onValueCommit={(value) =>
                handleButtonStyleChange("padding", `${value[0]}px`)
              }
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Font Size</label>
          <span className="text-sm">{style.fontSize}</span>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
            <Slider
              min={10}
              max={50}
              step={1}
              defaultValue={[parseInt(style.fontSize, 10) || 18]}
              onValueCommit={(value) =>
                handleButtonStyleChange("fontSize", `${value[0]}px`)
              }
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Font Weight</label>
          <span className="text-sm">{style.fontWeight}</span>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
            <Slider
              min={1}
              max={4}
              step={1}
              defaultValue={[
                style.fontWeight === 300
                  ? 1
                  : style.fontWeight === 400
                    ? 2
                    : style.fontWeight === 600
                      ? 3
                      : 4,
              ]}
              onValueCommit={(value) => {
                const weightMap = {
                  1: 300,
                  2: 400,
                  3: 600,
                  4: 700,
                };
                handleButtonStyleChange("fontWeight", weightMap[value[0]]);
              }}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Font Family</label>
          <Select
            value={projectData.buttons.style.fontFamily.split(",")[0]}
            onValueChange={(value) =>
              handleButtonStyleChange("fontFamily", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem
                  key={font.value}
                  value={font.value}
                  style={{ fontFamily: font.value }}
                >
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Text Color</label>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-[#f4f4f5] p-2">
            <div
              className="relative h-6 w-20 cursor-pointer rounded"
              style={{
                backgroundColor: style.color,
              }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "TOGGLE_FONT_COLOR_PICKER" });
              }}
            >
              {state.showFontColorPicker && (
                <div
                  className="absolute top-10 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChromePicker
                    color={style.color}
                    onChangeComplete={(color) =>
                      handleButtonStyleChange("color", color.hex)
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ButtonEditor.propTypes = {
  projectData: PropTypes.object.isRequired,
  setProjectData: PropTypes.func.isRequired,
  updateProjectData: PropTypes.func.isRequired,
  isButtonModalVisible: PropTypes.bool.isRequired,
  setIsButtonModalVisible: PropTypes.func.isRequired,
  editButtonData: PropTypes.object,
  setEditButtonData: PropTypes.func.isRequired,
  handleButtonEdit: PropTypes.func.isRequired,
  handleSaveButtonEdit: PropTypes.func.isRequired,
  handleButtonDelete: PropTypes.func.isRequired,
  handleButtonStyleChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ButtonEditor;
