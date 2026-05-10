import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ItemForm from '../components/ItemForm.jsx';
import Spinner from '../components/Spinner.jsx';
import { useItems } from '../context/ItemsContext.jsx';

export default function EditItem() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getById, fetchById, update } = useItems();

  const preloaded = location.state?.item ?? getById(id);

  const [item, setItem] = useState(preloaded);
  const [loading, setLoading] = useState(!preloaded);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (item) return;
    let alive = true;
    (async () => {
      try {
        const data = await fetchById(id);
        if (!alive) return;
        if (!data) setError('This item could not be found.');
        else setItem(data);
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
  }, [id, item, fetchById]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError(null);
    // Navigate immediately; optimistic patch inside the context means the
    // detail page already shows the new values.
    try {
      navigate(`/items/${id}`, { state: { item: { ...item, ...values, id } } });
      await update(id, values);
    } catch (err) {
      console.error(err);
      setError('Could not save your changes. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading && !item) return <Spinner label="Loading item…" />;

  if (error && !item) {
    return (
      <section className="page">
        <div className="alert alert--error">{error}</div>
        <Link to="/items" className="back-link">
          ← Back to all items
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <Link to={`/items/${id}`} className="back-link">
        ← Back to item
      </Link>
      <header className="page__header">
        <h1>Edit Item</h1>
        <p className="page__subtitle">
          Update any field and save to apply your changes.
        </p>
      </header>

      {error && <div className="alert alert--error">{error}</div>}

      <ItemForm
        initialValues={item}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </section>
  );
}
