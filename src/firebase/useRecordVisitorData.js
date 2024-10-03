import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const useRecordVisitorData = (userId, projectId) => {
  const [clickCount, setClickCount] = useState(0);
  const [visitorDocId, setVisitorDocId] = useState(null);

  useEffect(() => {
    const handleClick = () => {
      setClickCount((prev) => prev + 1);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const recordVisitorData = async () => {
      try {
        const visitorDataCollection = collection(
          db,
          `users/${userId}/projects/${projectId}/visitorData`,
        );

        const visitorDocRef = await addDoc(visitorDataCollection, {
          visitTime: serverTimestamp(),
          clickCount: 0,
        });
        console.log("訪問數據寫入成功:", visitorDocRef.id);
        setVisitorDocId(visitorDocRef.id);
      } catch (error) {
        console.error("Error in recording visitor data:", error);
      }
    };

    if (userId && projectId) {
      recordVisitorData();
    }
  }, [userId, projectId]);

  useEffect(() => {
    const updateClickData = async () => {
      if (visitorDocId && clickCount > 0) {
        try {
          const visitorDocRef = doc(
            db,
            `users/${userId}/projects/${projectId}/visitorData/${visitorDocId}`,
          );
          await updateDoc(visitorDocRef, { clickCount });
        } catch (error) {
          console.error("Error in updating click count:", error);
        }
      }
    };
    updateClickData();
  }, [clickCount, visitorDocId, userId, projectId]);
};

export default useRecordVisitorData;
