import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import EditTextModal from "./EditTextModal";
import TextCard from "./TextCard";
const TextEditor = ({
  projectData,
  setProjectData,
  updateProjectData,
  setIsModalVisible,
  isModalVisible,
  dispatch,
  state,
  itemsOrder,
  selectedText,
  setSelectedText,
}) => {
  return (
    <>
      <div className="mb-4 flex w-full">
        <h1 className="ml-2 text-3xl font-bold">Texts</h1>
      </div>
      {projectData.texts.map((item) => (
        <TextCard
          key={item.id}
          textItem={item}
          onEdit={() => {
            setSelectedText(item.id);
            dispatch({ type: "SET_EDITABLE_TEXT_ITEM", payload: item });
            setIsModalVisible(true);
          }}
          onDelete={() => {
            const updatedTexts = projectData.texts.filter(
              (textItem) => textItem.id !== item.id,
            );

            const updatedItemsOrder = itemsOrder.filter(
              (orderItem) => orderItem.id !== item.id,
            );

            const updatedData = {
              ...projectData,
              texts: updatedTexts,
              itemsOrder: updatedItemsOrder,
            };
            setProjectData(updatedData);
            updateProjectData(updatedData);
          }}
          onUpdate={(updatedItem) => {
            const updatedTexts = projectData.texts.map((textItem) =>
              textItem.id === item.id ? updatedItem : textItem,
            );
            const updatedData = {
              ...projectData,
              texts: updatedTexts,
            };
            setProjectData(updatedData);
            updateProjectData(updatedData);
          }}
        />
      ))}
      <Button
        className="mt-6 bg-button hover:bg-button-hover"
        onClick={() => {
          const maxId = projectData.texts.reduce((max, text) => {
            const idNumber = parseInt(text.id.split("-")[1]);
            return idNumber > max ? idNumber : max;
          }, 0);

          const newTextId = `text-${maxId + 1}`;
          const newTextItem = {
            id: newTextId,
            text: "New Text",
            style: {
              fontSize: "16px",
              fontWeight: 400,
              color: "#000000",
              fontFamily: "Arial",
            },
          };
          const updatedData = {
            ...projectData,
            texts: [...projectData.texts, newTextItem],
            itemsOrder: [
              ...projectData.itemsOrder,
              { id: newTextId, type: "text" },
            ],
          };
          setProjectData(updatedData);
          updateProjectData(updatedData);
        }}
      >
        Add New Text
      </Button>

      <EditTextModal
        isTextModalVisible={isModalVisible}
        setIsTextModalVisible={setIsModalVisible}
        editTextData={state.editableTextItem}
        dispatch={dispatch}
        handleSaveTextEdit={() => {
          const updatedTexts = projectData.texts.map((item) =>
            item.id === selectedText ? state.editableTextItem : item,
          );

          const updatedData = {
            ...projectData,
            texts: updatedTexts,
          };
          setProjectData(updatedData);
          updateProjectData(updatedData);
          setIsModalVisible(false);
        }}
      />
    </>
  );
};

TextEditor.propTypes = {
  projectData: PropTypes.object.isRequired,
  setProjectData: PropTypes.func.isRequired,
  updateProjectData: PropTypes.func.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  selectedText: PropTypes.string,
  setSelectedText: PropTypes.func.isRequired,
  itemsOrder: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TextEditor;
