// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB2kLY76q3fURYNwsTJ7lg48AL0xgk1zQ4",
  authDomain: "whatsapp-clone-23d61.firebaseapp.com",
  projectId: "whatsapp-clone-23d61",
  storageBucket: "whatsapp-clone-23d61.appspot.com",
  messagingSenderId: "39353482464",
  appId: "1:39353482464:web:73e55f51368fbce1a8a485",
  measurementId: "G-125Q6KDG09"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db =firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth ,provider}
export default db;
