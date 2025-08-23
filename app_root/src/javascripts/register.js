import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const auth = getAuth(app);

// Attach submit event to form
document.querySelector(".login__form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;

  if (!email || !password) {
    alert("Please fill out all fields");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // save name into Firebase user profile
      return updateProfile(user, { displayName: name }).then(() => user);
    })
    .then((user) => {
      alert(`Registered successfully! Welcome, ${user.displayName}`);
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
      console.error(error.code, error.message);
    });
});
