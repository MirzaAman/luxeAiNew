import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCL7ELr829_77j1d42hzk2hq8grLv3PZV4",
    authDomain: "luxe-c8a71.firebaseapp.com",
    projectId: "luxe-c8a71",
    storageBucket: "luxe-c8a71.appspot.com",
    messagingSenderId: "377615170210",
    appId: "1:377615170210:web:9b7b65a12a355c364b35fb",
    measurementId: "G-KRJKDM6HNQ"
  };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Set up Firebase Authentication with browser local persistence
const auth = initializeAuth(app, {
    persistence: browserLocalPersistence
});

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
