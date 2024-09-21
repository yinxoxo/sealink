import { auth, googleProvider } from "../../firebase/firebaseConfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User registered:", user);
      return user;
    })
    .catch((error) => {
      console.error("Error registering:", error.code, error.message);
      throw error;
    });
};

export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in:", user);
      return user;
    })
    .catch((error) => {
      console.error("Error logging in:", error.code, error.message);
      throw error;
    });
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log("Google Sign-in successful:", user);
      return user;
    })
    .catch((error) => {
      console.error("Error during Google Sign-in:", error.code, error.message);
      throw error;
    });
};
