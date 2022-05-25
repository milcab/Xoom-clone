// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
// import { getDatabase } from "firebase-admin/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const config = {
  NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyDkoD9pAZK6rzu6BqIAgcDaxspTDpwJuBY",
  NEXT_PUBLIC_FIREBASE_APP_ID: "75471273840",
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    "milca-transfer-njit-project.firebaseapp.com",
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-WRJZWV84F1",
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "75471273840",
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: "milca-transfer-njit-project",
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    "milca-transfer-njit-project.appspot.com",
  NEXT_PUBLIC_FIREBASE_DATABASE_URL:
    "https://milca-transfer-njit-project-default-rtdb.firebaseio.com/",
};

export const firebaseConfig = {
  apiKey: config.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: config.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: config.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: config.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  measurementId: config.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: config.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: config.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: config.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(firebase);
export const auth = getAuth(firebase);
// export const database = getDatabase(firebase);

export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const emailVerification = () => sendEmailVerification(auth.currentUser);

export const updateUser = ({ displayName, phoneNumber, photoURL = "" }) =>
  updateProfile(auth.currentUser, {
    displayName,
    phoneNumber,
    photoURL,
  });

export default firebase;
