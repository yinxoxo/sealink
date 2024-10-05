import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { ICON_LIST } from "../cardTemplate/cardContent/iconList";

const useCreateVirtualData = () => {
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getRandomDeviceType = () => {
    const devices = ["Mobile", "Tablet", "Desktop"];
    return devices[getRandomInt(0, devices.length - 1)];
  };

  const getRandomIconClickEvents = () => {
    const numberOfEvents = getRandomInt(0, 5);
    const clickEvents = [];

    for (let i = 0; i < numberOfEvents; i++) {
      const randomIcon = ICON_LIST[getRandomInt(0, ICON_LIST.length - 1)];
      clickEvents.push({
        tagName: "A",
        href: randomIcon.href,
        id: randomIcon.id,
      });
    }

    return clickEvents;
  };

  const getRandomButtonClickEvents = () => {
    const numberOfEvents = getRandomInt(0, 3);
    const clickEvents = [];

    for (let i = 0; i < numberOfEvents; i++) {
      clickEvents.push({
        tagName: "BUTTON",
        href: `https://example.com/button-${getRandomInt(1, 10)}`,
      });
    }

    return clickEvents;
  };

  const generateFakeVisitorDataForMonth = async (userId, projectId) => {
    try {
      const today = new Date();
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(today.getMonth() - 1);

      const visitorDataCollection = collection(
        db,
        `users/${userId}/projects/${projectId}/visitorData`,
      );

      for (
        let d = new Date(oneMonthAgo);
        d <= today;
        d.setDate(d.getDate() + 1)
      ) {
        const numberOfDocs = getRandomInt(1, 5);

        for (let i = 0; i < numberOfDocs; i++) {
          const clickEvents = [
            ...getRandomIconClickEvents(),
            ...getRandomButtonClickEvents(),
          ];

          const visitorDocRef = await addDoc(visitorDataCollection, {
            visitTime: d,
            clickEvents: clickEvents,
            deviceType: getRandomDeviceType(),
          });

          const newClickEvents = [
            ...clickEvents,
            ...getRandomIconClickEvents(),
          ];
          await updateDoc(doc(visitorDataCollection, visitorDocRef.id), {
            clickEvents: newClickEvents,
          });
        }
      }

      console.log("Successfully added fake data for the past month!");
    } catch (error) {
      console.error("Error generating fake data:", error);
    }
  };

  return { generateFakeVisitorDataForMonth };
};

export default useCreateVirtualData;
