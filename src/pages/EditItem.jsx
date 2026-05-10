import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ItemForm from '../components/ItemForm.jsx';
import Spinner from '../components/Spinner.jsx';
import { getItem, updateItem } from '../services/itemsService.js';

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await getItem(id);
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
  }, [id]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError(null);
    try {
      await updateItem(id, values);
      navigate(`/items/${id}`);
    } catch (err) {
      console.error(err);
      setError('Could not save your changes. Please try again.');
      setSubmitting(false);
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

      <ItemForm
        initialValues={item}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </section>
  );
}
