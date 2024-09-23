import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchUserProjects = async (user) => {
  if (!user?.uid) return;

  try {
    const q = query(collection(db, `users/${user.uid}/projects`));
    const querySnapshot = await getDocs(q);

    const userProjects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log("fetch project:", userProjects);
    return userProjects;
  } catch (error) {
    console.error("Error fetching projects: ", error);
  }
};
