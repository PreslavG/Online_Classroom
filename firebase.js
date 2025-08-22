import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg015yHZp085jag5rd4TdxEhQruMPOIlU",
  authDomain: "online-classroom-42fe3.firebaseapp.com",
  projectId: "online-classroom-42fe3",
  storageBucket: "online-classroom-42fe3.firebasestorage.app",
  messagingSenderId: "1025372282011",
  appId: "1:1025372282011:web:27c9b2b36968f485eb3a3e",
  measurementId: "G-EYVMGRMELW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);