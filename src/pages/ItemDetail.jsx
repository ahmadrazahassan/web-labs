import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner.jsx';
import { useItems } from '../context/ItemsContext.jsx';

export default function ItemDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getById, fetchById, remove } = useItems();

  // Priority order for instant render:
  // 1. router state passed during navigation (same request cycle)
  // 2. in-memory snapshot cache from the live subscription
  // 3. network fetch (deep link on a cold cache)
  const preloaded = location.state?.item ?? getById(id);

  const [item, setItem] = useState(preloaded);
  const [loading, setLoading] = useState(!preloaded);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let alive = true;

    // Re-check cache if id changes (cheap and synchronous).
    const cached = location.state?.item ?? getById(id);
    if (cached) {
      setItem(cached);
      setLoading(false);
      // Still fetch in background to pick up any fresh server-side changes,
      // but only if the snapshot subscription hasn't provided it yet.
      return () => {
        alive = false;
      };
    }

    setLoading(true);
    (async () => {
      try {
        const data = await fetchById(id);
        if (!alive) return;
        setItem(data);
      } catch (err) {
        console.error(err);
        if (alive) setError('Could not load this item.');
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [id, location.state, getById, fetchById]);

  // Keep synced with live snapshot updates.
  useEffect(() => {
    const latest = getById(id);
    if (latest && latest !== item) setItem(latest);
  }, [getById, id, item]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Delete this item? This cannot be undone.'
    );
    if (!confirmed) return;
    setDeleting(true);
    try {
      // Navigate first so the user sees instant feedback; delete streams
      // through in the background via optimistic update.
      navigate('/items', { replace: true });
      await remove(id);
    } catch (err) {
      console.error(err);
      setError('Could not delete this item.');
      setDeleting(false);
    }
  };

  if (loading && !item) return <Spinner label="Loading item…" />;

  if (error) {
    return (
      <section className="page">
        <div className="alert alert--error">{error}</div>
        <Link to="/items" className="back-link">
          ← Back to all items
        </Link>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="page">
        <Link to="/items" className="back-link">
          ← Back to all items
        </Link>
        <h1>Item not found</h1>
        <p className="muted">
          There is no item with id <code>{id}</code>.
        </p>
      </section>
    );
  }

  return (
    <section className="page">
      <Link to="/items" className="back-link">
        ← Back to all items
      </Link>

      <header className="page__header">
        {item.category && <span className="badge">{item.category}</span>}
        <h1>{item.title}</h1>
        <p className="page__subtitle">
          {item.status ? `Status: ${item.status}` : 'No status set'}
          {item.priority ? ` · ${item.priority} priority` : ''}
        </p>
      </header>

      {item.description ? (
        <p className="detail__description glass">{item.description}</p>
      ) : (
        <p className="muted">No description provided.</p>
      )}

      <dl className="detail__meta">
        <dt>Item ID</dt>
        <dd>
          <code>{item.id}</code>
        </dd>
      </dl>

      <div className="page__actions">
        <Link
          to={`/items/${item.id}/edit`}
          state={{ item }}
          className="btn btn--primary"
        >
          Edit Item
        </Link>
        <button
          type="button"
          className="btn btn--danger"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting…' : 'Delete Item'}
        </button>
      </div>
    </section>
  );
}
