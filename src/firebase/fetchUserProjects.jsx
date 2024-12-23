import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useQuery } from "react-query";
import { db } from "./firebaseConfig";

export const fetchUserProjects = async (user) => {
  if (!user?.uid) {
    throw new Error("User ID is required");
  }

  try {
    const q = query(
      collection(db, `users/${user.uid}/projects`),
      orderBy("createdTime", "desc"),
    );
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
    refetchOnWindowFocus: false,
  });
};
