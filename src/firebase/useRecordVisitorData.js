import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const useRecordVisitorData = (userId, projectId) => {
  const [visitorDocId, setVisitorDocId] = useState(null);

  const getDeviceType = () => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (window.matchMedia("(max-width: 767px)").matches && isTouchDevice) {
      return "Mobile";
    } else if (
      window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches &&
      isTouchDevice
    ) {
      return "Tablet";
    } else {
      return "Desktop";
    }
  };

  useEffect(() => {
    const recordVisitorData = async () => {
      try {
        const visitorDataCollection = collection(
          db,
          `users/${userId}/projects/${projectId}/visitorData`,
        );
        const visitorDocRef = await addDoc(visitorDataCollection, {
          visitTime: serverTimestamp(),
          clickEvents: [],
          deviceType: getDeviceType(),
        });
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
    const handleClick = async (event) => {
      let clickedElement = event.target;

      if (clickedElement.tagName === "BUTTON") {
        const elementInfo = {
          tagName: clickedElement.tagName,
          href: clickedElement.dataset.url || null,
        };
        try {
          if (visitorDocId) {
            const visitorDocRef = doc(
              db,
              `users/${userId}/projects/${projectId}/visitorData/${visitorDocId}`,
            );

            const docSnap = await getDoc(visitorDocRef);
            if (docSnap.exists()) {
              const existingData = docSnap.data();
              const updatedClickEvents = existingData.clickEvents || [];

              updatedClickEvents.push({
                ...elementInfo,
              });

              await updateDoc(visitorDocRef, {
                clickEvents: updatedClickEvents,
              });
            }
          }
        } catch (error) {
          console.error("Error in updating click events:", error);
        }
      } else if (
        clickedElement.tagName === "A" ||
        clickedElement.closest("a")
      ) {
        const anchorElement =
          clickedElement.tagName === "A"
            ? clickedElement
            : clickedElement.closest("a");

        const elementInfo = {
          tagName: anchorElement.tagName,
          href: anchorElement.href || null,
          id: anchorElement.id,
        };

        try {
          if (visitorDocId) {
            const visitorDocRef = doc(
              db,
              `users/${userId}/projects/${projectId}/visitorData/${visitorDocId}`,
            );

            const docSnap = await getDoc(visitorDocRef);
            if (docSnap.exists()) {
              const existingData = docSnap.data();
              const updatedClickEvents = existingData.clickEvents || [];

              updatedClickEvents.push({
                ...elementInfo,
              });

              await updateDoc(visitorDocRef, {
                clickEvents: updatedClickEvents,
              });
            }
          }
        } catch (error) {
          console.error("Error in updating click events:", error);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [visitorDocId, userId, projectId]);
};

export default useRecordVisitorData;
