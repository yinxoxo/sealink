import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaUpload } from "react-icons/fa6";

const UploadButton = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const downloadURL = URL.createObjectURL(file);
      onUpload(downloadURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div className="my-4 w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
      <Button
        onClick={handleClick}
        disabled={uploading}
        className="bg-button hover:bg-button-hover w-full"
      >
        <FaUpload className="mr-2 h-4 w-4" />
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};

export default UploadButton;
