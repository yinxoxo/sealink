import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const updateScreenshotUrl = async (userId, projectId, screenshotUrl) => {
  try {
    const projectRef = doc(db, `users/${userId}/projects/${projectId}`);

    await setDoc(projectRef, { screenshotUrl }, { merge: true });
  } catch (error) {
    console.error("Error updating screenshot URL:", error);
  }
};

export const saveProjectToFirestore = async (
  userId,
  projectId,
  dataToMutate,
) => {
  const { action, ...projectData } = dataToMutate;

  try {
    if (projectId) {
      if (projectData.isPublished) {
        projectData.publishedUrl = `/sealink/${userId}/${projectData.templateId}/${projectId}`;
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
          isPublished: projectData.isPublished,
          publishedUrl: projectData.publishedUrl,
          screenshotUrl: projectData.screenshotUrl || null,
        },
        { merge: true },
      );

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
          isPublished: projectData.isPublished,
          screenshotUrl: projectData.screenshotUrl || null,
          createdTime: serverTimestamp(),
        },
      );
      const newProjectId = projectRef.id;

      let publishedUrl = null;
      if (projectData.isPublished) {
        const publishedUrl = `/sealink/${userId}/${projectData.templateId}/${newProjectId}`;
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
