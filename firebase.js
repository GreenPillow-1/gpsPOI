import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "insert",
  authDomain: "insert",
  projectId: "insert",
  storageBucket: "insert",
  messagingSenderId: "insert",
  appId: "insert",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
