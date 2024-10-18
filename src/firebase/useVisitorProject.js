import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import { db } from "./firebaseConfig";

export const visitorFetchProject = async (userId, projectId) => {
  if (!userId || !projectId) {
    throw new Error("User ID and Project ID are required");
  }

  try {
    const projectRef = doc(db, `users/${userId}/projects`, projectId);
    const projectSnap = await getDoc(projectRef);

    if (projectSnap.exists()) {
      return { id: projectSnap.id, ...projectSnap.data() };
    } else {
      throw new Error("Project not found");
    }
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const useVisitorProject = (userId, projectId) => {
  return useQuery(
    ["project", userId, projectId],
    () => visitorFetchProject(userId, projectId),
    {
      enabled: !!userId && !!projectId,
    },
  );
};
