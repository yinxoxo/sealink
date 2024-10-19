import uploadImageToFirebase from "@/features/cardEdit/api/uploadImageToFirebase";
import getCroppedImg from "@/features/cardEdit/utils/getCroppedImg";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const useImageUploadAndCrop = () => {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropModalVisible, setIsCropModalVisible] = useState(false);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCroppedImage = async (folderName, onSuccessCallback) => {
    try {
      const { blob } = await getCroppedImg(imageUrl, croppedAreaPixels);
      setUploading(true);

      const downloadURL = await uploadImageToFirebase(blob, folderName, toast);

      setImageUrl(downloadURL);
      onSuccessCallback(downloadURL);
      setUploading(false);

      toast({
        title: "Image uploaded",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast({
        title: "Error",
        description: "Failed to crop and upload the image.",
        variant: "destructive",
      });
    }
  };

  return {
    imageUrl,
    setImageUrl,
    uploading,
    setUploading,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedAreaPixels,
    setCroppedAreaPixels,
    isCropModalVisible,
    setIsCropModalVisible,
    onCropComplete,
    handleSaveCroppedImage,
  };
};

export default useImageUploadAndCrop;
