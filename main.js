import './src/style.css';
import { db } from "./src/javascripts/firebase";
import { 
  collection, doc, getDoc, onSnapshot, addDoc 
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


// --- UI elements ---
const webcamButton = document.getElementById('webcamButton');
const localVideo = document.getElementById('localVideo');

let userid = null;

const auth = getAuth();
onAuthStateChanged(auth, (user,email) => {
  if (user) {
    userid = user.uid;
    email = user.email;

    let localStream = null;

// --- WebRTC setup ---
const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};
const peerConnection = new RTCPeerConnection(configuration);

// --- Handle new ICE candidates from the local peer ---
const roomRef = doc(db, "rooms", "Math");
const callerCandidatesCollection = collection(roomRef, "callerCandidates");

peerConnection.onicecandidate = async (event) => {
  if (event.candidate) {
    await addDoc(callerCandidatesCollection, event.candidate.toJSON());
  }
};

// --- Get remote ICE candidates and add to peerConnection ---
const calleeCandidatesCollection = collection(roomRef, "calleeCandidates");
onSnapshot(calleeCandidatesCollection, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const candidate = new RTCIceCandidate(change.doc.data());
      peerConnection.addIceCandidate(candidate);
    }
  });
});

const roomId = roomRef.id;

document.querySelector('#currentRoom').innerText =
  `Current room is ${roomId} - You are the caller!`;

   document.querySelector('#userLabel').innerText =
` ${email} - You are the caller!`;


webcamButton.onclick = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;

  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  const roomSnapshot = await getDoc(roomRef);
  if (!roomSnapshot.exists()) {
    console.error("Room 'Math' does not exist");
    return;
  }

  const roomData = roomSnapshot.data();
  console.log("Joined room:", roomData);

  if (roomData.answer) {
    const answerDesc = new RTCSessionDescription(roomData.answer);
    await peerConnection.setRemoteDescription(answerDesc);
  }
};

} else {
    // User is signed out
    // ...
  }
});
