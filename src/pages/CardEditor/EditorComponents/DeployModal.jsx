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
      <DialogContent className="flex flex-col items-center justify-center">
        <DialogTitle className="text-xl font-bold">Done!</DialogTitle>
        <p>
          Site successfully published to
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sea"
          >
            {projectUrl}
          </a>
        </p>
        <DialogFooter className="flex justify-end">
          <Button variant="outline" onClick={handleOkay}>
            Okay
          </Button>
          <Button variant="outline" onClick={handleViewSite}>
            View Site
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeployModal;
