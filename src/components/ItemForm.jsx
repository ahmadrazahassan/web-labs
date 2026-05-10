import { useEffect, useState } from 'react';

const EMPTY = {
  title: '',
  category: '',
  status: 'To do',
  priority: 'Medium',
  description: '',
};

const STATUSES = ['To do', 'In progress', 'Done'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function ItemForm({
  initialValues,
  submitLabel = 'Save',
  onSubmit,
  submitting = false,
}) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setValues({
        title: initialValues.title ?? '',
        category: initialValues.category ?? '',
        status: initialValues.status ?? 'To do',
        priority: initialValues.priority ?? 'Medium',
        description: initialValues.description ?? '',
      });
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!values.title.trim()) next.title = 'Title is required';
    if (values.title.trim().length > 120)
      next.title = 'Title must be 120 characters or fewer';
    if (values.description && values.description.length > 2000)
      next.description = 'Description must be 2000 characters or fewer';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    await onSubmit({
      title: values.title.trim(),
      category: values.category.trim(),
      status: values.status,
      priority: values.priority,
      description: values.description.trim(),
    });
  };

  return (
    <form className="item-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="e.g. Finish assignment 3"
        />
        {errors.title && <span className="field__error">{errors.title}</span>}
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
          placeholder="e.g. Web Engineering"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={values.status}
            onChange={handleChange}
          >
            {STATUSES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={values.priority}
            onChange={handleChange}
          >
            {PRIORITIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={values.description}
          onChange={handleChange}
          placeholder="Add any details, notes, or context for this item…"
        />
        {errors.description && (
          <span className="field__error">{errors.description}</span>
        )}
      </div>

      <button type="submit" className="btn btn--primary" disabled={submitting}>
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
