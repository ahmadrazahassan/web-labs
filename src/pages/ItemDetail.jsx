import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner.jsx';
import { deleteItem, getItem } from '../services/itemsService.js';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getItem(id);
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
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Delete this item? This cannot be undone.'
    );
    if (!confirmed) return;
    setDeleting(true);
    try {
      await deleteItem(id);
      navigate('/items', { replace: true });
    } catch (err) {
      console.error(err);
      setError('Could not delete this item. Please try again.');
      setDeleting(false);
    }
  };

  if (loading) return <Spinner label="Loading item…" />;

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
        <Link to={`/items/${item.id}/edit`} className="btn btn--primary">
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
