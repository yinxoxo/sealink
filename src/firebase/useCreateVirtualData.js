import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ICON_LIST } from "./cardTemplate/cardContent/iconList";
import { db } from "./firebaseConfig";

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

  const getRandomTime = (date) => {
    const randomHour = getRandomInt(0, 23);
    const randomMinute = getRandomInt(0, 59);
    const randomSecond = getRandomInt(0, 59);
    const newDate = new Date(date);
    newDate.setHours(randomHour, randomMinute, randomSecond);
    return newDate;
  };

  const generateFakeVisitorDataForYear = async (userId, projectId) => {
    try {
      const today = new Date();
      const oneYearAgo = new Date(today);
      oneYearAgo.setFullYear(today.getFullYear() - 1);

      const visitorDataCollection = collection(
        db,
        `users/${userId}/projects/${projectId}/visitorData`,
      );

      for (
        let d = new Date(oneYearAgo);
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
            visitTime: getRandomTime(d),
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
    } catch (error) {
      console.error("Error generating fake data:", error);
    }
  };

  return { generateFakeVisitorDataForYear };
};

export default useCreateVirtualData;
