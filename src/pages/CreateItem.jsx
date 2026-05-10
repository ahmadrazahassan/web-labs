import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ItemForm from '../components/ItemForm.jsx';
import { createItem } from '../services/itemsService.js';

export default function CreateItem() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError(null);
    try {
      const id = await createItem(values);
      navigate(`/items/${id}`);
    } catch (err) {
      console.error(err);
      setError('Could not save this item. Please try again in a moment.');
      setSubmitting(false);
    }
  };

  return (
    <section className="page">
      <Link to="/items" className="back-link">
        ← Back to all items
      </Link>

      <header className="page__header">
        <h1>Create Item</h1>
        <p className="page__subtitle">
          Fill in the details below. Your item will be saved to Firestore.
        </p>
      </header>

      {error && <div className="alert alert--error">{error}</div>}

      <ItemForm
        submitLabel="Create Item"
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </section>
  );
}
