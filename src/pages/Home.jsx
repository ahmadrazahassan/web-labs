import { Link } from 'react-router-dom';

function IconPlus(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function IconList(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="4" cy="6" r="1.2" fill="currentColor" />
      <circle cx="4" cy="12" r="1.2" fill="currentColor" />
      <circle cx="4" cy="18" r="1.2" fill="currentColor" />
    </svg>
  );
}
function IconEdit(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  );
}

const features = [
  {
    icon: <IconPlus />,
    title: 'Create items',
    body: 'Fill out a clean form and save a new item to your collection. Everything you enter is stored in Firebase Firestore in real time.',
  },
  {
    icon: <IconList />,
    title: 'Browse everything',
    body: 'See every item you have saved in a neat, responsive card layout. Tap any card to open the full view for that item.',
  },
  {
    icon: <IconEdit />,
    title: 'Edit or remove',
    body: 'Update details whenever you like, or delete items you no longer need. The list stays in sync the moment you make a change.',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <span className="eyebrow">
          <span className="eyebrow__dot" />
          Single Page Application · React + Firebase
        </span>

        <h1>
          A calm place to <em>collect</em><br />
          and manage your items.
        </h1>

        <p className="hero__lead">
          Itemly is a lightweight item manager with create, view, edit, and
          delete — all without a page reload. Every item lives in Firestore
          and is reachable through a unique link, so nothing ever gets lost.
        </p>

        <div className="hero__actions">
          <Link className="btn btn--primary" to="/items">
            View All Items
          </Link>
          <Link className="btn btn--secondary" to="/items/new">
            Create Item
          </Link>
        </div>
      </section>

      <div className="stats glass" aria-hidden="true">
        <div className="stats__item">
          <span className="stats__value">Instant</span>
          <span className="stats__label">Page transitions</span>
        </div>
        <div className="stats__item">
          <span className="stats__value">Live</span>
          <span className="stats__label">Firestore sync</span>
        </div>
        <div className="stats__item">
          <span className="stats__value">Dynamic</span>
          <span className="stats__label">Routes per item</span>
        </div>
        <div className="stats__item">
          <span className="stats__value">Simple</span>
          <span className="stats__label">By design</span>
        </div>
      </div>

      <header className="section-head">
        <span className="section-head__kicker">What you can do</span>
        <h2>Everything you need for day-to-day item management.</h2>
        <p>
          Built for speed and clarity. Add, open, update, or remove items
          from a single, focused interface.
        </p>
      </header>

      <div className="feature-grid">
        {features.map((feature) => (
          <article key={feature.title} className="feature-card glass">
            <span className="feature-card__icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </article>
        ))}
      </div>
    </>
  );
}
