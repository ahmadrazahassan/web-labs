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

/**
 * Subscribe to the items collection in real time.
 * Local cache makes the first callback near-instant on repeat visits;
 * subsequent callbacks stream live changes (create / update / delete)
 * without a manual refetch.
 *
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
    onError
  );
}

export async function createItem(data) {
  const ref = await addDoc(itemsCollection, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getItem(id) {
  const snapshot = await getDoc(doc(db, ITEMS_COLLECTION, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function updateItem(id, data) {
  await updateDoc(doc(db, ITEMS_COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteItem(id) {
  await deleteDoc(doc(db, ITEMS_COLLECTION, id));
}
