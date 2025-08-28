import { db } from "../javascripts/firebase";
import { 
  collection, doc, getDoc, onSnapshot, addDoc 
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const auth = getAuth();
const joincallButton = document.getElementById('joincallButton');
const remoteVideo = document.getElementById('remoteVideo');
let userid = null;

onAuthStateChanged(auth, (user,email) => {
  if (user) {
    userid = user.uid;
    email = user.email;

    let remoteStream = null;

// --- WebRTC setup ---
const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};
const peerConnection = new RTCPeerConnection(configuration);

const roomRef = doc(db, "rooms", "Math");
const calleeCandidatesCollection = collection(roomRef, "calleeCandidates");

peerConnection.onicecandidate = async (event) => {
  if (event.candidate) {
    await addDoc(calleeCandidatesCollection, event.candidate.toJSON());
  }
};

// --- Get remote ICE candidates and add to peerConnection ---
const callerCandidatesCollection = collection(roomRef, "calleeCandidates");
onSnapshot(callerCandidatesCollection, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const candidate = new RTCIceCandidate(change.doc.data());
      peerConnection.addIceCandidate(candidate);
    }
  });
});

const roomId = roomRef.id;

document.querySelector('#currentRoom').innerText =
  `Current room is ${roomId} - You are the callee!`;

   document.querySelector('#userLabel').innerText =
` ${email} - You are the caller!`;


joincallButton.onclick = async () => {
  remoteStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  remoteVideo.srcObject = remoteStream;

  remoteStream.getTracks().forEach(track => peerConnection.addTrack(track, remoteStream));

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
