import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';

// Read from Vite env (see .env.example). Safe to ship; Firestore security
// rules are the real access boundary.
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
  console.error(
    `[firebase] Missing env vars: ${missing.join(
      ', '
    )}. Copy .env.example to .env and fill in your Firebase credentials, then restart the dev server.`
  );
}

export const app = initializeApp(firebaseConfig);

// Try to enable IndexedDB-backed cache. If the browser blocks IndexedDB
// (private mode, quota full, etc.) fall back to memory so the app still
// works instead of hanging forever.
function createDb() {
  try {
    return initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      '[firebase] Persistent cache unavailable, falling back to default.',
      err
    );
    return getFirestore(app);
  }
}

export const db = createDb();

// Helpful one-time sanity log so it's obvious which project we're talking to.
// eslint-disable-next-line no-console
console.info(
  `[firebase] Connected to project: ${firebaseConfig.projectId || '(missing projectId)'}`
);

export const ITEMS_COLLECTION = 'items';
