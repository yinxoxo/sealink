import { auth, googleProvider } from "../../firebase/firebaseConfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firestore = getFirestore();

export const saveUserToFirestore = async (user) => {
  const userDocRef = doc(firestore, "users", user.uid);

  const userData = {
    ...(user.email && { email: user.email }),
    ...(user.displayName && { displayName: user.displayName }),
    authProvider: user.authProvider || "email",
    proMember: false,
    uid: user.uid,
  };

  try {
    await setDoc(userDocRef, userData, { merge: true });
    console.log("User data saved to Firestore");
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
    throw error;
  }
};

export const handleUserAuthentication = async (user) => {
  try {
    if (!user || !user.uid) {
      throw new Error("User or user UID is undefined.");
    }

    const userDocRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await saveUserToFirestore(user);
    }

    console.log("User authenticated successfully:", user);
  } catch (error) {
    console.error("Error handling user authentication:", error);
    throw error;
  }
};

export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (!userCredential || !userCredential.user) {
      throw new Error("User registration failed.");
    }

    return userCredential;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (!userCredential || !userCredential.user) {
      throw new Error("User login failed.");
    }

    const user = userCredential.user;
    console.log("User logged in successfully:", user);

    await handleUserAuthentication(user);

    return userCredential;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log("Google Sign-in successful:", user);

    await handleUserAuthentication(user);

    return user;
  } catch (error) {
    console.error("Error during Google Sign-in:", error);
    throw error;
  }
};
