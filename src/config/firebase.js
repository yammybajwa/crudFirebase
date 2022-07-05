import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyC4jVNI7-NH1esJU5Qa53kb7eVk_CnkZ50",
  authDomain: "crud-operation-39759.firebaseapp.com",
  projectId: "crud-operation-39759",
  storageBucket: "crud-operation-39759.appspot.com",
  messagingSenderId: "966356145109",
  appId: "1:966356145109:web:37dd2131bd3d13b91ee35c",
  measurementId: "G-SLNQZMHRB0"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export { analytics, firestore }