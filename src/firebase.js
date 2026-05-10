import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Reads values from `.env` (see `.env.example`).
// When deploying (Vercel / Firebase Hosting) define the same VITE_FIREBASE_* vars.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const missing = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length > 0) {
  // Fails loudly in dev so you don't chase silent empty-data bugs.
  // eslint-disable-next-line no-console
  console.warn(
    `[firebase] Missing env vars: ${missing.join(
      ', '
    )}. Copy .env.example to .env and fill in your Firebase credentials.`
  );
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Single source of truth for the collection name.
export const ITEMS_COLLECTION = 'items';
