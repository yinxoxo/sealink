import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
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

const getToken = async (userId, projectId) => {
  const tokenQuery = query(
    collection(db, "tokens"),
    where("projectId", "==", projectId),
  );
  const tokenSnapshot = await getDocs(tokenQuery);
  if (!tokenSnapshot.empty) {
    const token = tokenSnapshot.docs[0].id;
    return token;
  } else {
    const tokenRef = await addDoc(collection(db, "tokens"), {
      userId,
      projectId,
    });
    return tokenRef.id;
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
        const token = await getToken(userId, projectId);
        projectData.publishedUrl = `/sealink/${token}`;
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
        const token = await getToken(userId, newProjectId);
        publishedUrl = `/sealink/${token}`;
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
