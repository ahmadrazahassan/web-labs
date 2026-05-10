import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  createItem as createItemRemote,
  deleteItem as deleteItemRemote,
  getItem as getItemRemote,
  subscribeToItems,
  updateItem as updateItemRemote,
} from '../services/itemsService.js';

const ItemsContext = createContext(null);

/**
 * Single source of truth for the items collection.
 * - Subscribes once via onSnapshot (real-time, cheap reads after first load)
 * - Exposes imperative helpers for CRUD
 * - getById returns synchronously from cache when possible so detail pages
 *   render instantly; otherwise falls back to a one-shot fetch.
 */
export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep a by-id map in a ref for O(1) synchronous lookups without re-renders.
  const byIdRef = useRef(new Map());

  useEffect(() => {
    const unsubscribe = subscribeToItems(
      (next) => {
        const map = new Map();
        next.forEach((item) => map.set(item.id, item));
        byIdRef.current = map;
        setItems(next);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('[items] subscription error', err);
        setError(err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const create = useCallback(async (data) => {
    // addDoc resolves with the ref id; the snapshot listener will reflect
    // the new document in UI automatically.
    return createItemRemote(data);
  }, []);

  const update = useCallback(async (id, data) => {
    // Optimistic: patch local cache immediately; snapshot will reconcile.
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
    try {
      await updateItemRemote(id, data);
    } catch (err) {
      // Snapshot will restore truth on next event; surface the error.
      throw err;
    }
  }, []);

  const remove = useCallback(async (id) => {
    // Optimistic removal: UI updates instantly, background call syncs.
    const previous = byIdRef.current.get(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await deleteItemRemote(id);
    } catch (err) {
      // Rollback if the server rejects.
      if (previous) {
        setItems((prev) =>
          prev.some((i) => i.id === id) ? prev : [previous, ...prev]
        );
      }
      throw err;
    }
  }, []);

  const getById = useCallback((id) => byIdRef.current.get(id) ?? null, []);

  const fetchById = useCallback(async (id) => {
    const cached = byIdRef.current.get(id);
    if (cached) return cached;
    // Not in the live list yet (deep link, newly created elsewhere).
    const doc = await getItemRemote(id);
    if (doc) byIdRef.current.set(id, doc);
    return doc;
  }, []);

  const value = useMemo(
    () => ({ items, loading, error, create, update, remove, getById, fetchById }),
    [items, loading, error, create, update, remove, getById, fetchById]
  );

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
}

export function useItems() {
  const ctx = useContext(ItemsContext);
  if (!ctx) {
    throw new Error('useItems must be used inside <ItemsProvider>');
  }
  return ctx;
}
