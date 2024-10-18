import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchVisitorData = async (user, projectId, startDate, endDate) => {
  if (!user?.uid || !projectId) {
    throw new Error("User ID and Project ID are required");
  }

  try {
    const visitorDataCollectionRef = collection(
      db,
      `users/${user.uid}/projects/${projectId}/visitorData`,
    );

    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);

    const q = query(
      visitorDataCollectionRef,
      where("visitTime", ">=", startTimestamp),
      where("visitTime", "<=", endTimestamp),
    );

    const visitorDataSnapshot = await getDocs(q);

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
