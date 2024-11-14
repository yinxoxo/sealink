import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import { db } from "./firebaseConfig";

const fetchProjectByToken = async (token) => {
  const tokenRef = doc(db, "tokens", token);
  const tokenSnapshot = await getDoc(tokenRef);

  if (tokenSnapshot.exists()) {
    const { userId, projectId } = tokenSnapshot.data();
    return { userId, projectId };
  } else {
    throw new Error("Token not found");
  }
};

export const useFetchProjectByToken = (token) => {
  return useQuery(["projectInfo", token], () => fetchProjectByToken(token), {
    enabled: !!token,
  });
};
