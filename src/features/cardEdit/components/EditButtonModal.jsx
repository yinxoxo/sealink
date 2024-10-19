import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";

const EditButtonModal = ({
  isButtonModalVisible,
  setIsButtonModalVisible,
  editButtonData,
  setEditButtonData,
  handleSaveButtonEdit,
}) => (
  <Dialog open={isButtonModalVisible} onOpenChange={setIsButtonModalVisible}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Button</DialogTitle>
      </DialogHeader>
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
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => setIsButtonModalVisible(false)}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveButtonEdit}
          className="bg-button hover:bg-button-hover"
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

EditButtonModal.propTypes = {
  isButtonModalVisible: PropTypes.bool.isRequired,
  setIsButtonModalVisible: PropTypes.func.isRequired,
  editButtonData: PropTypes.object.isRequired,
  setEditButtonData: PropTypes.func.isRequired,
  handleSaveButtonEdit: PropTypes.func.isRequired,
};

export default EditButtonModal;
