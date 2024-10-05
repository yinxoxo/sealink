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

    const userProjects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

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
