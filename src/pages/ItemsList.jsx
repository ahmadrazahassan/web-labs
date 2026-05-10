import { Link } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../components/Spinner.jsx';
import { useItems } from '../context/ItemsContext.jsx';

export default function ItemsList() {
  const { items, loading, error, remove } = useItems();
  const [deletingId, setDeletingId] = useState(null);
  const [localError, setLocalError] = useState(null);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Delete this item? This cannot be undone.'
    );
    if (!confirmed) return;
    setDeletingId(id);
    setLocalError(null);
    try {
      // Optimistic: UI updates instantly inside the context.
      await remove(id);
    } catch (err) {
      console.error(err);
      setLocalError('Could not delete that item. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // Only show the loader on the very first load (when we have zero data).
  if (loading && items.length === 0) {
    return <Spinner label="Loading items…" />;
  }

  const displayedError = localError || (error ? 'Could not load your items.' : null);

  return (
    <section className="page">
      <header className="page__header page__header--row">
        <div>
          <h1>View All Items</h1>
          <p className="page__subtitle">
            {items.length === 0
              ? 'No items yet. Create your first one to get started.'
              : `${items.length} ${items.length === 1 ? 'item' : 'items'} in your collection`}
          </p>
        </div>
        <Link to="/items/new" className="btn btn--primary">
          Create Item
        </Link>
      </header>

      {displayedError && <div className="alert alert--error">{displayedError}</div>}

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>Nothing here yet</h3>
          <p>Add your first item and it will show up here right away.</p>
          <Link to="/items/new" className="btn btn--primary">
            Create your first item
          </Link>
        </div>
      ) : (
        <ul className="card-grid">
          {items.map((item) => (
            <li key={item.id} className="card glass">
              {item.category && <span className="badge">{item.category}</span>}
              <h3 className="card__title">
                <Link
                  to={`/items/${item.id}`}
                  state={{ item }}
                >
                  {item.title}
                </Link>
              </h3>
              <p className="card__meta">
                {item.status ? `Status: ${item.status}` : 'No status'}
                {item.priority ? ` · ${item.priority} priority` : ''}
              </p>
              {item.description && (
                <p className="card__desc">{item.description}</p>
              )}
              <div className="card__actions">
                <Link
                  to={`/items/${item.id}`}
                  state={{ item }}
                  className="btn btn--ghost"
                >
                  View
                </Link>
                <Link
                  to={`/items/${item.id}/edit`}
                  state={{ item }}
                  className="btn btn--ghost"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                >
                  {deletingId === item.id ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
