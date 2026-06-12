import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  getCountFromServer,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export interface Institution {
  id: string;
  name: string;
  code?: string;
  status?: string;
  logoUrl?: string;
  location?: string;
}

export interface MobileAppConfig {
  version?: string;
  latestVersion?: string; // fallback compatibility
  releaseNotes?: string;
  apkUrl?: string;
  updatedAt?: string;
  releaseDate?: string;
}

export interface LandingPageConfig {
  supportEmail?: string;
  institutionEmail?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  footerText?: string;
  heroAnnouncement?: string;
  apkVersion?: string;
}

export interface AppStats {
  institutions?: number;
  users?: number;
  items?: number;
  returnedItems?: number;
}

export interface WaitlistEntry {
  name: string;
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

export async function fetchLandingPageConfig(): Promise<LandingPageConfig | null> {
  if (!db) return null;
  const ref = doc(db, "app_config", "landing_page");
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as LandingPageConfig) : null;
}

export async function fetchAppStats(): Promise<AppStats | null> {
  if (!db) return null;
  try {
    const ref = doc(db, "app_config", "landing_stats");
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as AppStats) : null;
  } catch (error) {
    console.error("Failed to query app_config/landing_stats:", error);
    return null;
  }
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
