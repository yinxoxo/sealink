import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PropTypes from "prop-types";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import logo from "../../../assets/images/logo.png";

const QrcodeModal = ({ isOpen, onClose, project }) => {
  const qrCodeRef = useRef();

  const handleDownload = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    downloadLink.click();
  };
  const fullUrl = `https://sealink-4b0fd.web.app${project.publishedUrl}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center" ref={qrCodeRef}>
          <QRCodeCanvas
            value={fullUrl}
            size={250}
            imageSettings={{
              src: logo,
              x: undefined,
              y: undefined,
              height: 30,
              width: 75,
              opacity: 1,
              excavate: true,
            }}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleDownload}
            className="bg-button text-white hover:bg-button-hover"
          >
            Download QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

QrcodeModal.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isPublished: PropTypes.bool.isRequired,
    publishedUrl: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default QrcodeModal;
