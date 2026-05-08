import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Explore', path: '/explore', screen: 's-explore' },
  { label: 'Events', path: '/events', screen: 's-events' },
  { label: 'Membership', path: '/membership', screen: 's-membership' },
  { label: 'About', path: '/about', screen: 's-about' },
  { label: 'Campaign', path: '/campaign', screen: 's-campaign' }
];

export function NavBar() {
  const menuId = 'app-site-menu';
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="app-nav-shell" aria-label="Site header" ref={navRef}>
      <div className="app-nav-inner">
        <div className="home-topbar">
          <Link to="/" className="home-wordmark" onClick={() => setIsMenuOpen(false)} aria-label="Go to homepage">
            <img src="./src/assets/home/home-wordmark.svg" alt="Accra Coded" />
          </Link>
          <nav className="home-nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `home-nav__link${isActive ? ' is-active' : ''}`}
                data-nav-screen={item.screen}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className={`home-menu-btn site-nav__toggle${isMenuOpen ? ' is-open' : ''}`}
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <nav
          className={`site-nav site-nav--mobile home-nav--mobile${isMenuOpen ? ' is-open' : ''}`}
          id={menuId}
          aria-label="Mobile primary"
          aria-hidden={!isMenuOpen}
          hidden={!isMenuOpen}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
              data-nav-screen={item.screen}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="home-divider" aria-hidden="true" />
      </div>
    </header>
  );
}
