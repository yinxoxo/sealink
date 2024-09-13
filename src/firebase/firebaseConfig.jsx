import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'sealink-4b0fd.firebaseapp.com',
  projectId: 'sealink-4b0fd',
  storageBucket: 'sealink-4b0fd.appspot.com',
  messagingSenderId: '372285846787',
  appId: '1:372285846787:web:65d74de1f650b0fedee536',
  measurementId: 'G-4WNNC6CQTN',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
