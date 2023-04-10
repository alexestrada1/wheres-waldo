import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCLvkIwW1MHhnI7wEqQjRsz_67wQvgyMX8",
  authDomain: "waldo-1a04c.firebaseapp.com",
  projectId: "waldo-1a04c",
  storageBucket: "waldo-1a04c.appspot.com",
  messagingSenderId: "805412284184",
  appId: "1:805412284184:web:266bcb6430b1f3bb38206d"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);