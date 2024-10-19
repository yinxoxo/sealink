import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";
const uploadImageToFirebase = (blob, folderName = "cropped_images", toast) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${folderName}/${Date.now()}.png`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast({
          title: "Upload failed",
          description: `Upload failed: ${error.message}`,
          variant: "destructive",
        });
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      },
    );
  });
};

export default uploadImageToFirebase;
