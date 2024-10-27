import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import PropTypes from "prop-types";
import { ChromePicker } from "react-color";
import EditIconModal from "./EditIconModal";
import IconCard from "./IconCard";
import IconSelect from "./IconSelect";

const IconEditor = ({
  projectData,
  icons,
  iconColor,
  iconSize,
  setSelectedIcon,
  ICON_LIST,
  addIcon,
  handleIconEdit,
  handleIconDelete,
  isModalVisible,
  setIsModalVisible,
  editIconData,
  setEditIconData,
  handleSaveIconEdit,
  isIconAlreadyAdded,
  state,
  dispatch,
  updateProjectData,
}) => {
  return (
    <>
      <div className="mb-4 flex w-full">
        <h1 className="ml-2 text-3xl font-bold">Icons</h1>
      </div>
      {icons.map((icon) => (
        <IconCard
          key={icon.id}
          icon={icon.icon}
          iconColor="black"
          iconName={icon.name}
          iconHref={icon.href}
          onEdit={() => handleIconEdit(icon.name)}
          onDelete={() => handleIconDelete(icon.id)}
        />
      ))}
      <div className="mt-8 w-full">
        <IconSelect
          icons={icons}
          setSelectedIcon={setSelectedIcon}
          ICON_LIST={ICON_LIST}
        />
        <Button
          className={`mt-2 w-full ${
            isIconAlreadyAdded
              ? "cursor-not-allowed bg-gray-400"
              : "bg-button hover:bg-button-hover"
          }`}
          onClick={() => {
            if (!isIconAlreadyAdded) {
              addIcon();
            }
          }}
          disabled={isIconAlreadyAdded}
        >
          {isIconAlreadyAdded ? "Icon Already Added" : "Add Icon"}
        </Button>
      </div>
      <div className="mt-6 flex w-full">
        <h1 className="ml-2 text-2xl font-bold">Appearance</h1>
      </div>
      <div className="mt-4 space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Icon Color</label>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-[#f4f4f5] p-2">
            <div
              className="relative h-6 w-20 cursor-pointer rounded"
              style={{
                backgroundColor: projectData.socialLinks.style.color,
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
                    color={iconColor}
                    onChangeComplete={(color) => {
                      setEditIconData({
                        ...editIconData,
                        color: color.hex,
                      });
                      const updatedData = {
                        ...projectData,
                        socialLinks: {
                          ...projectData.socialLinks,
                          style: {
                            ...projectData.socialLinks.style,
                            color: color.hex,
                          },
                        },
                      };
                      updateProjectData(updatedData);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Icon Size</label>
          <span className="text-sm">{iconSize}px</span>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
            <Slider
              min={10}
              max={100}
              step={1}
              defaultValue={[iconSize]}
              onValueCommit={(value) => {
                const newSize = value[0];
                const updatedData = {
                  ...projectData,
                  socialLinks: {
                    ...projectData.socialLinks,
                    style: {
                      ...projectData.socialLinks.style,
                      size: newSize,
                    },
                  },
                };
                updateProjectData(updatedData);
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>
      {editIconData && (
        <EditIconModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          editIconData={editIconData}
          setEditIconData={setEditIconData}
          handleSaveEdit={handleSaveIconEdit}
        />
      )}
    </>
  );
};

IconEditor.propTypes = {
  projectData: PropTypes.object.isRequired,
  icons: PropTypes.array.isRequired,
  iconColor: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  setSelectedIcon: PropTypes.func.isRequired,
  ICON_LIST: PropTypes.array.isRequired,
  addIcon: PropTypes.func.isRequired,
  handleIconEdit: PropTypes.func.isRequired,
  handleIconDelete: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  editIconData: PropTypes.object,
  setEditIconData: PropTypes.func.isRequired,
  handleSaveIconEdit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  updateProjectData: PropTypes.func.isRequired,
  isIconAlreadyAdded: PropTypes.bool,
};

export default IconEditor;
