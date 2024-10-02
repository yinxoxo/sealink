import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const deleteProjectFromFirestore = async (userId, projectId) => {
  try {
    const projectRef = doc(db, `users/${userId}/projects/${projectId}`);
    await deleteDoc(projectRef);

    console.log(`Project with ID ${projectId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete the project.");
  }
};
