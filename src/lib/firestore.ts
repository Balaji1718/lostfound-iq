import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export interface Institution {
  id: string;
  name: string;
  status?: string;
  logoUrl?: string;
  location?: string;
}

export interface MobileAppConfig {
  latestVersion?: string;
  releaseNotes?: string;
  apkUrl?: string;
  updatedAt?: string;
}

export interface WaitlistEntry {
  fullName: string;
  email: string;
  institution: string;
  role: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function fetchInstitutions(): Promise<Institution[]> {
  if (!db) return [];
  const snap = await getDocs(collection(db, "institutions"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Institution, "id">) }));
}

export async function fetchMobileAppConfig(): Promise<MobileAppConfig | null> {
  if (!db) return null;
  const ref = doc(db, "app_config", "mobile_app");
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as MobileAppConfig) : null;
}

export async function submitWaitlist(entry: WaitlistEntry) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Add VITE_FIREBASE_* environment variables.");
  }
  return addDoc(collection(db, "waitlist"), { ...entry, createdAt: serverTimestamp() });
}

export async function submitContactRequest(entry: ContactRequest) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Add VITE_FIREBASE_* environment variables.");
  }
  return addDoc(collection(db, "contact_requests"), { ...entry, createdAt: serverTimestamp() });
}
