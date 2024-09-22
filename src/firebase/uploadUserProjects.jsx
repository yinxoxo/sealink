import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const saveProjectToFirestore = async (userId, projectData) => {
  try {
    const projectsRef = collection(db, `users/${userId}/projects`);
    const docRef = await addDoc(projectsRef, {
      title: projectData.title || "Untitled Project",
      templateId: projectData.templateId,
      createdTime: serverTimestamp(),
    });

    const projectId = docRef.id;
    await updateDoc(doc(db, `users/${userId}/projects/${projectId}`), {
      projectId: projectId,
    });

    console.log("Project saved successfully with ID: ", projectId);
  } catch (error) {
    console.error("Error saving project:", error);
  }
};
