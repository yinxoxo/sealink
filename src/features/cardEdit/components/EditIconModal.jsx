import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropTypes from "prop-types";
import { ICON_LIST } from "../../cardTemplate/data/iconList";

const EditIconModal = ({
  isModalVisible,
  setIsModalVisible,
  editIconData,
  setEditIconData,
  handleSaveEdit,
}) => (
  <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Icon</DialogTitle>
      </DialogHeader>
      <div>
        <label>Icon Type</label>
        <Select
          value={editIconData.name}
          onValueChange={(value) => {
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
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Icon" />
          </SelectTrigger>
          <SelectContent>
            {ICON_LIST.map((icon) => (
              <SelectItem key={icon.name} value={icon.name}>
                <div className="flex items-center">
                  <icon.icon size={20} className="mr-2" />
                  <span>{icon.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
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
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsModalVisible(false)}>
          Cancel
        </Button>
        <Button
          onClick={handleSaveEdit}
          className="bg-button hover:bg-button-hover"
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

EditIconModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  editIconData: PropTypes.object.isRequired,
  setEditIconData: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
};

export default EditIconModal;
