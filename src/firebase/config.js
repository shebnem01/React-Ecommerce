import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyBQg0p29cqZhnEOTCPwflDEOxu6sCxH190",
  authDomain: "react-project-5f8e1.firebaseapp.com",
  projectId: "react-project-5f8e1",
  storageBucket: "react-project-5f8e1.appspot.com",
  messagingSenderId: "788030850881",
  appId: "1:788030850881:web:a1f28f46ac2a8d534d03c0",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
