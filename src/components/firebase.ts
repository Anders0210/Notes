import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Alle konfigurationsværdierne fra Firebase, som bruges til at oprette forbindelse til Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, // API key fra Firebase, som bruges til godkendelse af requests til Firebase
  authDomain: process.env.FIREBASE_AUTH_DOMAIN, // Auth domain fra Firebase, som er unik for hver Firebase projekt
  projectId: process.env.FIREBASE_PROJECT_ID, // Project ID fra Firebase, bruges til at differentiere mellem forskellige projekter
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Storage bucket fra Firebase, bruges til at gemme filer, og fortælle hvilken bucket der skal bruges
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, // Messaging sender ID fra Firebase, bruges til at sende beskeder
  appId: process.env.FIREBASE_APP_ID, // App ID fra Firebase, bruges til at identificere appen/ projektet
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Opret forbindelse til Firestore
export const db = getFirestore(app);
