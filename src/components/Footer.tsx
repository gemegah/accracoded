import { Link } from 'react-router-dom';
import logo from '../assets/branding/logo.png';
import { useTransparentPng } from '../hooks/useTransparentPng';

import { closeSiteMenus } from '../app/navigation.js';

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Explore', path: '/explore' },
  { label: 'Events', path: '/events' },
  { label: 'Membership', path: '/membership' },
  { label: 'About', path: '/about' },
  { label: 'Privacy', path: '/privacy' }
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'tabler:brand-instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'tabler:brand-facebook' },
  { label: 'Email', href: 'mailto:hello@accracoded.com', icon: 'tabler:mail' }
];

export function Footer() {
  const footerLogo = useTransparentPng(logo);

  return (
    <footer className="app-footer">
      <section className="footer-bottom" aria-label="Footer navigation">
        <Link to="/" className="footer-brand" onClick={closeSiteMenus} aria-label="Accra Coded home">
          <img className="footer-brand__logo" src={footerLogo} alt="Accra Coded" />
          <small>Wellness. Rooted in Accra.</small>
        </Link>

        <nav className="footer-links" aria-label="Footer links">
          {footerLinks.map((item) => (
            <Link key={item.path} to={item.path} className="footer-link" onClick={closeSiteMenus}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer-socials" aria-label="Social links">
          {socialLinks.map((item) => (
            <a key={item.label} href={item.href} className="footer-social" target="_blank" rel="noopener noreferrer" aria-label={item.label}>
              <iconify-icon icon={item.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <div className="footer-site-credit" aria-label="Site credits">
        <p className="footer-site-credit__line">Powered by Spearbytes</p>
        <p className="footer-site-credit__line">Making Space Foundation</p>
      </div>
    </footer>
  );
}
