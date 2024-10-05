import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchVisitorData = async (user, projectId) => {
  if (!user?.uid || !projectId) {
    throw new Error("User ID and Project ID are required");
  }

  try {
    const visitorDataCollectionRef = collection(
      db,
      `users/${user.uid}/projects/${projectId}/visitorData`,
    );
    const visitorDataSnapshot = await getDocs(visitorDataCollectionRef);

    const visitorData = visitorDataSnapshot.docs.map((visitorDoc) => ({
      id: visitorDoc.id,
      ...visitorDoc.data(),
    }));

    return visitorData;
  } catch (error) {
    console.error("Error fetching visitor data: ", error);
    throw error;
  }
};
