import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, AuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { Firestore, getFirestore, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Firebase configuration
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
let analytics, auth: Auth | null = null, googleProvider: AuthProvider, db: Firestore;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  db = getFirestore(app);
}

// Export the user state
export let currentUser: User | null = null;

if (auth) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
    } else {
      currentUser = null;
    }
  });
}

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    if (auth && googleProvider) {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // User does not exist, create a new document
        await setDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          profilePicUrl: user.photoURL,
          createdAt: serverTimestamp(),
        });
      }
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

// Function to sign out the user
export const signOutUser = async () => {
  try {
    if (auth) {
      await signOut(auth);
    }
  } catch (error) {
    console.error("Sign-Out Error:", error);
  }
};

export { auth, googleProvider, db };
