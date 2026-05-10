import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  const linkClass = ({ isActive }) =>
    `nav-link${isActive ? ' nav-link--active' : ''}`;

  return (
    <div className="app-shell">
      <div className="scene" aria-hidden="true">
        <div className="scene__blob scene__blob--1" />
        <div className="scene__blob scene__blob--2" />
        <div className="scene__blob scene__blob--3" />
        <div className="scene__grain" />
      </div>

      <header className="navbar">
        <div className="navbar__inner">
          <NavLink to="/" className="navbar__brand">
            <span className="navbar__mark" aria-hidden="true" />
            Itemly
          </NavLink>

          <nav className="navbar__links" aria-label="Primary">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/items" className={linkClass}>
              View All Items
            </NavLink>
            <NavLink to="/items/new" className={linkClass}>
              Create Item
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <span>© {new Date().getFullYear()} Itemly. A simple item manager.</span>
          <span>Built with React, React Router, and Firebase Firestore.</span>
        </div>
      </footer>
    </div>
  );
}
