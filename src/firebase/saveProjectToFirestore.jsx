import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const saveProjectToFirestore = async (
  userId,
  projectId,
  projectData,
) => {
  try {
    const projectRef = doc(db, `users/${userId}/projects/${projectId}`);

    await setDoc(
      projectRef,
      {
        title: projectData.title || "Untitled Project",
        templateId: projectData.templateId,
        background: projectData.background,
        socialLinks: projectData.socialLinks,
        texts: projectData.texts,
        buttons: projectData.buttons,
        createdTime: serverTimestamp(),
      },
      { merge: true },
    );

    console.log("Project saved successfully with ID: ", projectId);
  } catch (error) {
    console.error("Error saving project:", error);
  }
};
