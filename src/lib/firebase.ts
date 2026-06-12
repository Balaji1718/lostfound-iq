// Firebase initialization. Uses the project's public Firebase config.
// These are client-safe keys; they are exposed to browsers by design.
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyAgha1-KMhTirWjVjeniAljPv8WycghWeQ",
  authDomain: "findback-a68a1.firebaseapp.com",
  projectId: "findback-a68a1",
  storageBucket: "findback-a68a1.firebasestorage.app",
  messagingSenderId: "631704216729",
  appId: "1:631704216729:web:8d4a849cea158f6a64c408",
  measurementId: "G-463Y9L8X0N",
};

export const isFirebaseConfigured = Boolean(
  config.apiKey && config.projectId && config.appId,
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured && typeof window !== "undefined") {
  app = getApps().length ? getApps()[0] : initializeApp(config);
  db = getFirestore(app);
}

export { app, db };
