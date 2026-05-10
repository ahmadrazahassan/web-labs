import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, ITEMS_COLLECTION } from '../firebase.js';

// Thin service layer isolating Firestore calls from UI components.

const itemsCollection = collection(db, ITEMS_COLLECTION);

export async function createItem(data) {
  const ref = await addDoc(itemsCollection, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function listItems() {
  const q = query(itemsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
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
