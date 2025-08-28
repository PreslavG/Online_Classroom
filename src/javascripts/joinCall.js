import { db } from "./firebase";
import { 
  collection, addDoc, doc, setDoc, getDoc, onSnapshot, updateDoc 
} from "firebase/firestore";

// --- WebRTC setup ---
const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }
  ]
};
const peerConnection = new RTCPeerConnection(configuration);





{
alert("Joining call...");
await peerConnection.setRemoteDescription(offer1);

const answer = await peerConnection.createAnswer();
await peerConnection.setLocalDescription(answer);

const roomWithAnswer = {
  answer: {
    type: answer.type,
    sdp: answer.sdp
  }
};

const roomsCollection = collection(db, "rooms");
const roomRef = await addDoc(roomsCollection, roomWithOffer);
const roomId = roomRef.id;
const roomSnapshot = await getDoc(roomRef);


// ✅ Update Firestore doc
await updateDoc(roomRef, roomWithAnswer);
const offer1 = roomSnapshot.data().offer;

// --- Collect ICE candidates ---
async function collectIceCandidates(roomRef, peerConnection, localName, remoteName) {
  const candidatesCollection = collection(roomRef, localName);

  peerConnection.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      const json = event.candidate.toJSON();
      addDoc(candidatesCollection, json);
    }
  });

  const remoteCandidatesCollection = collection(roomRef, remoteName);

  onSnapshot(remoteCandidatesCollection, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const data = change.doc.data();
        console.log("Got new remote ICE candidate: ", data);
        const candidate = new RTCIceCandidate(data);
        peerConnection.addIceCandidate(candidate);
      }
    });
  });
}
}