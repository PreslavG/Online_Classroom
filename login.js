import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";



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


const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  onAuthStateChanged(auth, (user) => {
  if (user) {
    alert("User is signed in");
    const uid = user.uid;
    // ...
  } else {
    alert("No user is signed in");
  }
});