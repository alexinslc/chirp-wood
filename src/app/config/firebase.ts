import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, AuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app and services
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
let analytics, auth: Auth, googleProvider: AuthProvider, db;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  db = getFirestore(app); // Initialize Firestore
}

export { auth, googleProvider, db };

export const signInWithGoogle = async () => {
  try {
    if (auth && googleProvider) {
      await signInWithPopup(auth, googleProvider);
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

export const signOutUser = async () => {
  try {
    if (auth) {
      await signOut(auth);
    }
  } catch (error) {
    console.error("Sign-Out Error:", error);
  }
};
