import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAApY5bcMTNyqzyvwnk1oFr5jcMZ1StIY8",
  authDomain: "spotify-clone-c7f56.firebaseapp.com",
  projectId: "spotify-clone-c7f56",
  storageBucket: "spotify-clone-c7f56.firebasestorage.app",
  messagingSenderId: "307186278618",
  appId: "1:307186278618:web:6e2f8567a8b740871885e3",
  measurementId: "G-7MCY8E3JJ9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;