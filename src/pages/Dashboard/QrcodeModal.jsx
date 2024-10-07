import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import logo from "../../images/logo.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

export default QrcodeModal;
