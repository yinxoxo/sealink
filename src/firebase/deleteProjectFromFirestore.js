import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const deleteProjectFromFirestore = async (userId, projectId) => {
  try {
    const projectRef = doc(db, `users/${userId}/projects/${projectId}`);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete the project.");
  }
};
