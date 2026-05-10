import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page">
      <header className="page__header">
        <h1>Page not found</h1>
        <p className="page__subtitle">
          We couldn't find the page you're looking for.
        </p>
      </header>
      <div>
        <Link to="/" className="btn btn--secondary">
          Take me home
        </Link>
      </div>
    </section>
  );
}
