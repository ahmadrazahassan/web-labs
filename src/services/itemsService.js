import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, ITEMS_COLLECTION } from '../firebase.js';

// Thin service layer isolating Firestore from UI components.

const itemsCollection = collection(db, ITEMS_COLLECTION);

// Safety net: if Firestore never responds (database not created, rules
// blocking, offline with no cache, etc.) we reject with a readable error
// so the UI can recover instead of hanging on "Saving…" forever.
const DEFAULT_TIMEOUT_MS = 10_000;

function withTimeout(promise, label = 'Firestore operation') {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(
        new Error(
          `${label} timed out after ${DEFAULT_TIMEOUT_MS / 1000}s. ` +
            'Check that Firestore is enabled in your Firebase project and that security rules allow read/write.'
        )
      );
    }, DEFAULT_TIMEOUT_MS);

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

/**
 * Subscribe to the items collection in real time.
 * @param {(items: Array) => void} onChange
 * @param {(error: Error) => void} onError
 * @returns {() => void} unsubscribe
 */
export function subscribeToItems(onChange, onError) {
  const q = query(itemsCollection, orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    { includeMetadataChanges: false },
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onChange(items);
    },
    (err) => {
      // eslint-disable-next-line no-console
      console.error('[items] onSnapshot error', err);
      if (onError) onError(err);
    }
  );
}

export async function createItem(data) {
  const ref = await withTimeout(
    addDoc(itemsCollection, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }),
    'Create item'
  );
  return ref.id;
}

export async function getItem(id) {
  const snapshot = await withTimeout(
    getDoc(doc(db, ITEMS_COLLECTION, id)),
    'Load item'
  );
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function updateItem(id, data) {
  await withTimeout(
    updateDoc(doc(db, ITEMS_COLLECTION, id), {
      ...data,
      updatedAt: serverTimestamp(),
    }),
    'Update item'
  );
}

export async function deleteItem(id) {
  await withTimeout(
    deleteDoc(doc(db, ITEMS_COLLECTION, id)),
    'Delete item'
  );
}
