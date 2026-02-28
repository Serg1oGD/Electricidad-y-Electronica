import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA3PDPZNSi7q6euZxNluEEEBzdU3cbJmxs",
  authDomain: "electricidad-y-electroni-db73a.firebaseapp.com",
  projectId: "electricidad-y-electroni-db73a",
  storageBucket: "electricidad-y-electroni-db73a.firebasestorage.app",
  messagingSenderId: "894383382881",
  appId: "1:894383382881:web:8f12f9924d91e582ece520"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);