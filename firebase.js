import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxIQOZaIaMgfMOnbOSe_sGeHLAuBt8_1w",
  authDomain: "poi-finder-e2a61.firebaseapp.com",
  projectId: "poi-finder-e2a61",
  storageBucket: "poi-finder-e2a61.appspot.com",
  messagingSenderId: "1088168623325",
  appId: "1:1088168623325:web:3dce6f5417ce36ef6daf34",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
