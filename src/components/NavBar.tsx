import { Link, NavLink } from 'react-router-dom';

import { closeSiteMenus } from '../app/navigation.js';

const navItems = [
  { label: 'Explore', path: '/explore', screen: 's-explore' },
  { label: 'Events', path: '/events', screen: 's-events' },
  { label: 'Membership', path: '/membership', screen: 's-membership' },
  { label: 'About', path: '/about', screen: 's-about' },
  { label: 'Campaign', path: '/campaign', screen: 's-campaign' }
];

export function NavBar() {
  const menuId = 'app-site-menu';

  return (
    <header className="app-nav-shell" aria-label="Site header">
      <div className="app-nav-inner">
        <div className="home-topbar">
          <Link to="/" className="home-wordmark" onClick={closeSiteMenus} aria-label="Go to homepage">
            <img src="./src/assets/home/home-wordmark.svg" alt="Accra Coded" />
          </Link>
          <nav className="home-nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `home-nav__link${isActive ? ' is-active' : ''}`}
                data-nav-screen={item.screen}
                onClick={closeSiteMenus}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="home-menu-btn site-nav__toggle"
            data-action="toggle-site-menu"
            aria-controls={menuId}
            aria-expanded="false"
            aria-label="Open navigation menu"
          >
            <img src="./src/assets/home/home-menu-icon.svg" alt="" />
          </button>
        </div>
        <nav className="site-nav site-nav--mobile home-nav--mobile" id={menuId} aria-label="Mobile primary" hidden>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
              data-nav-screen={item.screen}
              onClick={closeSiteMenus}
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
