// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgVkCVRgrHh_FdwOeTYFK26qseZPZa5ik",
  authDomain: "whats-app-clone-a97a5.firebaseapp.com",
  projectId: "whats-app-clone-a97a5",
  storageBucket: "whats-app-clone-a97a5.appspot.com",
  messagingSenderId: "966437711046",
  appId: "1:966437711046:web:4f1f31e49715cd20c43bc7",
  measurementId: "G-0M47FG187S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;