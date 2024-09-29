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
  dataToMutate,
) => {
  const { action, ...projectData } = dataToMutate;

  try {
    if (projectId) {
      if (projectData.isPublished) {
        projectData.publishedUrl = `/sealink/${projectData.templateId}/${projectId}`;
      }
      const projectRef = doc(db, `users/${userId}/projects/${projectId}`);
      await setDoc(
        projectRef,
        {
          itemsOrder: projectData.itemsOrder,
          title: projectData.title,
          templateId: projectData.templateId,
          background: projectData.background,
          socialLinks: projectData.socialLinks,
          texts: projectData.texts,
          buttons: projectData.buttons,
          avatar: projectData.avatar,
          publishedUrl: projectData.publishedUrl,
        },
        { merge: true },
      );
      console.log("Project saved successfully with ID: ", projectId);
      return { projectId, publishedUrl: projectData.publishedUrl };
    } else {
      const projectRef = await addDoc(
        collection(db, `users/${userId}/projects`),
        {
          itemsOrder: projectData.itemsOrder,
          title: projectData.title,
          templateId: projectData.templateId,
          background: projectData.background,
          socialLinks: projectData.socialLinks,
          texts: projectData.texts,
          buttons: projectData.buttons,
          avatar: projectData.avatar,
          createdTime: serverTimestamp(),
        },
      );
      const newProjectId = projectRef.id;
      console.log(
        "Project created successfully with auto-generated ID: ",
        projectRef.id,
      );
      let publishedUrl = null;
      if (projectData.isPublished) {
        const publishedUrl = `/sealink/${projectData.templateId}/${newProjectId}`;
        await setDoc(
          doc(db, `users/${userId}/projects/${newProjectId}`),
          { publishedUrl },
          { merge: true },
        );
        return { projectId: newProjectId, publishedUrl };
      }

      return { projectId: newProjectId, publishedUrl };
    }
  } catch (error) {
    console.error("Error saving project:", error);
  }
};
