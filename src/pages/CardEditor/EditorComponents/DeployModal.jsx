import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DeployModal = ({ isOpen, onClose, projectUrl }) => {
  const navigate = useNavigate();

  const handleOkay = () => {
    onClose();
    navigate("/dashboard");
  };

  const handleViewSite = () => {
    window.open(projectUrl, "_blank");
    onClose();
    navigate("/dashboard");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-w-md flex-col items-center justify-center">
        <DialogTitle className="text-xl font-bold">Done!</DialogTitle>
        <p className="w-full break-words">Site successfully published to</p>
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 w-full break-words text-sea"
        >
          {projectUrl}
        </a>
        <DialogFooter className="flex justify-end">
          <Button variant="outline" onClick={handleOkay}>
            Okay
          </Button>
          <Button
            className="bg-button hover:bg-button-hover"
            onClick={handleViewSite}
          >
            View Site
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeployModal;
