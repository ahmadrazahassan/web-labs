import { initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';

// Read from Vite env (see .env.example). These are safe to ship in the bundle —
// Firestore security rules are the real access boundary.
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
  // eslint-disable-next-line no-console
  console.warn(
    `[firebase] Missing env vars: ${missing.join(
      ', '
    )}. Copy .env.example to .env and fill in your Firebase credentials.`
  );
}

export const app = initializeApp(firebaseConfig);

// Persistent IndexedDB cache → subsequent page loads hydrate instantly from
// the local store while the live data syncs in the background. Multi-tab
// manager keeps every open tab in sync.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export const ITEMS_COLLECTION = 'items';
