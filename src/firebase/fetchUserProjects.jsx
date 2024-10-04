import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useQuery } from "react-query";

export const fetchUserProjects = async (user) => {
  if (!user?.uid) {
    throw new Error("User ID is required");
  }

  try {
    const q = query(collection(db, `users/${user.uid}/projects`));
    const querySnapshot = await getDocs(q);

    const userProjects = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const projectData = doc.data();

        const visitorDataCollectionRef = collection(
          db,
          `users/${user.uid}/projects/${doc.id}/visitorData`,
        );
        const visitorDataSnapshot = await getDocs(visitorDataCollectionRef);

        const visitorData = visitorDataSnapshot.docs.map((visitorDoc) => ({
          id: visitorDoc.id,
          ...visitorDoc.data(),
        }));

        return {
          id: doc.id,
          ...projectData,
          visitorData,
        };
      }),
    );

    return userProjects;
  } catch (error) {
    console.error("Error fetching projects: ", error);
    throw error;
  }
};

export const useUserProjects = (user) => {
  return useQuery(["userProjects", user?.uid], () => fetchUserProjects(user), {
    enabled: !!user?.uid,
  });
};
