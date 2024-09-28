import {
  doc,
  addDoc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
export const saveProjectToFirestore = async (
  userId,
  projectId,
  projectData,
) => {
  try {
    if (projectId) {
      const projectRef = doc(db, `users/${userId}/projects/${projectId}`);
      await setDoc(
        projectRef,
        {
          itemsOrder: projectData.itemsOrder,
          title: projectData.title || "Untitled Project",
          templateId: projectData.templateId,
          background: projectData.background,
          socialLinks: projectData.socialLinks,
          texts: projectData.texts,
          buttons: projectData.buttons,
          avatar: projectData.avatar,
        },
        { merge: true },
      );
      console.log("Project saved successfully with ID: ", projectId);
    } else {
      const projectRef = await addDoc(
        collection(db, `users/${userId}/projects`),
        {
          itemsOrder: projectData.itemsOrder,
          title: projectData.title || "Untitled Project",
          templateId: projectData.templateId,
          background: projectData.background,
          socialLinks: projectData.socialLinks,
          texts: projectData.texts,
          buttons: projectData.buttons,
          avatar: projectData.avatar,
          createdTime: serverTimestamp(),
        },
      );
      console.log(
        "Project created successfully with auto-generated ID: ",
        projectRef.id,
      );
      return projectRef.id;
    }
  } catch (error) {
    console.error("Error saving project:", error);
  }
};
