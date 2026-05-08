import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { EXPLORE_RESOURCES } from '../data/exploreDirectory.js';
import { FALLBACK_HOME_CATEGORY_METRICS, type HomeCategoryMetric } from '../data/homeCategories';
import { deleteJson, getJson, postJson, putJson } from '../lib/apiClient.js';
import '../styles/sections/admin.css';

type AdminOverview = {
  categories: number;
  qrScans: number;
  qrStatus: string;
  resources: number;
  waitlist: number;
};

type DirectoryResource = {
  about: string[];
  cardBadges: string[];
  cardDescription: string;
  cardImage: string;
  cardLocation: string;
  cardType: string;
  categories: string[];
  contactHref: string;
  contactLabel: string;
  description: string;
  email: string;
  enabled: boolean;
  featured: boolean;
  featuredRank: number;
  gallery: Array<Record<string, unknown>>;
  href: string;
  id: string;
  location: string;
  logoText: string;
  mapHref: string;
  name: string;
  resourceType: string;
  services: string[];
  summary: string;
  tags: string[];
};

type WaitlistSubmission = {
  createdAt: number;
  email: string;
  emailStatus: string;
  id: string;
  interest: string;
  location: string;
  name: string;
  source: string;
};

const emptyResource: DirectoryResource = {
  about: [],
  cardBadges: ['Verified'],
  cardDescription: '',
  cardImage: '',
  cardLocation: '',
  cardType: '',
  categories: ['wellness'],
  contactHref: '',
  contactLabel: 'View',
  description: '',
  email: '',
  enabled: true,
  featured: false,
  featuredRank: 999,
  gallery: [],
  href: '',
  id: '',
  location: '',
  logoText: '',
  mapHref: '',
  name: '',
  resourceType: 'organization',
  services: [],
  summary: '',
  tags: ['Wellness']
};

const adminNavItems = [
  { description: 'Homepage counts', icon: 'tabler:chart-bar', label: 'Metrics', path: '/admin/metrics', section: 'metrics' },
  { description: 'Resource manager', icon: 'tabler:folders', label: 'Directory', path: '/admin/directory', section: 'directory' },
  { description: 'Waitlist data', icon: 'tabler:users', label: 'Membership', path: '/admin/membership', section: 'membership' },
  { description: 'Coming soon', icon: 'tabler:qrcode', label: 'QR Analytics', path: '/admin/qr-analytics', section: 'qr-analytics' }
];

function splitList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(value: number) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [overview, setOverview] = useState<AdminOverview>({ categories: 0, qrScans: 0, qrStatus: 'coming_soon', resources: 0, waitlist: 0 });
  const [metrics, setMetrics] = useState<HomeCategoryMetric[]>(FALLBACK_HOME_CATEGORY_METRICS);
  const [resources, setResources] = useState<DirectoryResource[]>([]);
  const [resourceDraft, setResourceDraft] = useState<DirectoryResource>(emptyResource);
  const [waitlist, setWaitlist] = useState<WaitlistSubmission[]>([]);
  const [interestFilter, setInterestFilter] = useState('all');

  const isLoginRoute = location.pathname === '/admin/login';

  async function loadAdminData() {
    const [overviewResponse, metricsResponse, resourcesResponse, waitlistResponse] = await Promise.all([
      getJson('/admin/overview'),
      getJson('/admin/home-metrics'),
      getJson('/admin/resources'),
      getJson('/admin/waitlist')
    ]);

    setOverview(overviewResponse?.overview || overview);
    setMetrics(Array.isArray(metricsResponse?.metrics) && metricsResponse.metrics.length ? metricsResponse.metrics : FALLBACK_HOME_CATEGORY_METRICS);
    setResources(Array.isArray(resourcesResponse?.resources) ? resourcesResponse.resources : []);
    setWaitlist(Array.isArray(waitlistResponse?.submissions) ? waitlistResponse.submissions : []);
  }

  useEffect(() => {
    let active = true;
    void getJson('/admin/me')
      .then(() => {
        if (!active) {
          return;
        }
        setAuthenticated(true);
        void loadAdminData();
      })
      .catch(() => {
        if (active) {
          setAuthenticated(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    try {
      await postJson('/admin/login', { password });
      setAuthenticated(true);
      setPassword('');
      navigate('/admin');
      await loadAdminData();
    } catch {
      setMessage('That password did not work.');
    }
  }

  async function handleLogout() {
    await postJson('/admin/logout', {});
    setAuthenticated(false);
    navigate('/admin/login');
  }

  async function saveMetrics() {
    const response = await putJson('/admin/home-metrics', { metrics });
    setMetrics(response?.metrics || metrics);
    setMessage('Homepage category metrics saved.');
    await loadAdminData();
  }

  async function seedStaticContent() {
    setMessage('Seeding current site content...');
    await putJson('/admin/home-metrics', { metrics: FALLBACK_HOME_CATEGORY_METRICS });
    for (const resource of EXPLORE_RESOURCES) {
      await postJson('/admin/resources', resource);
    }
    setMessage('Seeded the current homepage metrics and resource directory into D1.');
    await loadAdminData();
  }

  async function saveResource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = {
      ...resourceDraft,
      id: resourceDraft.id || undefined,
      featuredRank: Number(resourceDraft.featuredRank) || 999
    };
    const path = resourceDraft.id ? `/admin/resources/${encodeURIComponent(resourceDraft.id)}` : '/admin/resources';
    const response = resourceDraft.id ? await putJson(path, payload) : await postJson(path, payload);
    setMessage(`Saved ${response?.resource?.name || payload.name}.`);
    setResourceDraft(emptyResource);
    await loadAdminData();
  }

  function handleCardImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setMessage('Please choose an image file.');
      event.target.value = '';
      return;
    }

    if (file.size > 1_500_000) {
      setMessage('Please choose an image under 1.5 MB for now.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setResourceDraft((draft) => ({ ...draft, cardImage: reader.result as string }));
        setMessage('Image uploaded into the card image field.');
      }
    };
    reader.readAsDataURL(file);
  }

  async function deleteResource(id: string) {
    await deleteJson(`/admin/resources/${encodeURIComponent(id)}`);
    setMessage('Resource deleted.');
    if (resourceDraft.id === id) {
      setResourceDraft(emptyResource);
    }
    await loadAdminData();
  }

  const filteredWaitlist = useMemo(
    () => waitlist.filter((item) => interestFilter === 'all' || item.interest === interestFilter),
    [interestFilter, waitlist]
  );

  const interests = useMemo(() => ['all', ...Array.from(new Set(waitlist.map((item) => item.interest).filter(Boolean)))], [waitlist]);
  const currentAdminItem = adminNavItems.find((item) => item.path === location.pathname);
  const currentAdminSection = currentAdminItem?.section;

  if (authenticated === null) {
    return <main className="admin-page admin-page--loading">Loading admin...</main>;
  }

  if (!authenticated) {
    if (!isLoginRoute) {
      return <Navigate to="/admin/login" replace />;
    }

    return (
      <main className="admin-page admin-login">
        <form className="admin-card admin-login__form" onSubmit={handleLogin}>
          <p className="admin-eyebrow">Accra Coded Admin</p>
          <h1>Sign in</h1>
          <label className="admin-field">
            <span>Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          </label>
          {message ? <p className="admin-message admin-message--error">{message}</p> : null}
          <button type="submit" className="admin-button admin-button--primary">Enter admin</button>
        </form>
      </main>
    );
  }

  if (isLoginRoute || location.pathname === '/admin') {
    return <Navigate to="/admin/metrics" replace />;
  }

  if (!currentAdminSection) {
    return <Navigate to="/admin/metrics" replace />;
  }

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar" aria-label="Admin dashboard sections">
          <div className="admin-brand">
            <span className="admin-brand__mark">AC</span>
            <div>
              <strong>Accra Coded</strong>
              <small>Admin suite</small>
            </div>
          </div>
          <p className="admin-sidebar__title">Menu</p>
          <nav className="admin-sidebar__nav">
            {adminNavItems.map((item) => (
              <NavLink className={({ isActive }) => `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`} to={item.path} key={item.path}>
                <iconify-icon icon={item.icon} aria-hidden="true"></iconify-icon>
                <span>{item.label}</span>
                <small>{item.description}</small>
              </NavLink>
            ))}
          </nav>
          <div className="admin-sidebar__panel">
            <span>Content sync</span>
            <p>Refresh D1 with the current static directory and homepage metrics.</p>
            <button type="button" className="admin-button admin-button--dark" onClick={seedStaticContent}>Seed content</button>
          </div>
          <button type="button" className="admin-sidebar__logout" onClick={handleLogout}>
            <iconify-icon icon="tabler:logout" aria-hidden="true"></iconify-icon>
            Log out
          </button>
        </aside>

        <section className="admin-workspace">
          <header className="admin-header">
            <div>
              <p className="admin-eyebrow">Accra Coded Admin</p>
              <h1>{currentAdminItem?.label || 'Dashboard'}</h1>
            </div>
            <label className="admin-command">
              <iconify-icon icon="tabler:search" aria-hidden="true"></iconify-icon>
              <span className="sr-only">Search admin</span>
              <input type="search" placeholder="Search or type a command" />
              <kbd>Ctrl F</kbd>
            </label>
            <div className="admin-profile" aria-label="Admin status">
              <span className="admin-profile__dot" aria-hidden="true"></span>
              <iconify-icon icon="tabler:bell" aria-hidden="true"></iconify-icon>
              <span className="admin-profile__avatar">AC</span>
            </div>
          </header>

          <div className="admin-main">
          {message ? <p className="admin-message">{message}</p> : null}

          <section className="admin-overview" aria-label="Admin overview">
            <article className="admin-stat"><span>Resources</span><strong>{overview.resources}</strong></article>
            <article className="admin-stat"><span>Waitlist</span><strong>{overview.waitlist}</strong></article>
            <article className="admin-stat"><span>Categories</span><strong>{overview.categories}</strong></article>
            <article className="admin-stat admin-stat--muted"><span>QR scans</span><strong>Coming soon</strong></article>
          </section>

          {currentAdminSection === 'metrics' ? <section className="admin-card">
            <div className="admin-section-head">
              <div>
                <p className="admin-eyebrow">Homepage</p>
                <h2>Category card numbers</h2>
              </div>
              <button type="button" className="admin-button admin-button--primary" onClick={saveMetrics}>Save metrics</button>
            </div>
            <div className="admin-metrics-grid">
              {metrics.map((metric, index) => (
                <article className="admin-mini-card" key={metric.id}>
                  <label className="admin-field">
                    <span>Label</span>
                    <input value={metric.label} onChange={(event) => setMetrics((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} />
                  </label>
                  <label className="admin-field">
                    <span>Number</span>
                    <input value={metric.meta} onChange={(event) => setMetrics((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, meta: event.target.value } : item))} />
                  </label>
                  <label className="admin-check">
                    <input type="checkbox" checked={metric.enabled !== false} onChange={(event) => setMetrics((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, enabled: event.target.checked } : item))} />
                    Enabled
                  </label>
                </article>
              ))}
            </div>
          </section> : null}

          {currentAdminSection === 'directory' ? <section className="admin-card">
            <div className="admin-section-head">
              <div>
                <p className="admin-eyebrow">Directory</p>
                <h2>Resources</h2>
              </div>
              <button type="button" className="admin-button" onClick={() => setResourceDraft(emptyResource)}>New resource</button>
            </div>

            <div className="admin-resource-layout">
              <div className="admin-resource-list">
                {resources.map((resource) => (
                  <button type="button" className="admin-resource-row" key={resource.id} onClick={() => setResourceDraft(resource)}>
                    <strong>{resource.name}</strong>
                    <span>{resource.cardType || resource.resourceType} / {resource.enabled ? 'Published' : 'Hidden'}</span>
                  </button>
                ))}
              </div>

              <form className="admin-resource-form" onSubmit={saveResource}>
                <div className="admin-form-grid">
                  <label className="admin-field"><span>Name</span><input value={resourceDraft.name} onChange={(event) => setResourceDraft({ ...resourceDraft, name: event.target.value })} required /></label>
                  <label className="admin-field"><span>Type</span><input value={resourceDraft.resourceType} onChange={(event) => setResourceDraft({ ...resourceDraft, resourceType: event.target.value })} /></label>
                  <label className="admin-field"><span>Categories</span><input value={resourceDraft.categories.join(', ')} onChange={(event) => setResourceDraft({ ...resourceDraft, categories: splitList(event.target.value) })} required /></label>
                  <label className="admin-field"><span>Tags</span><input value={resourceDraft.tags.join(', ')} onChange={(event) => setResourceDraft({ ...resourceDraft, tags: splitList(event.target.value) })} /></label>
                  <label className="admin-field"><span>Location</span><input value={resourceDraft.location} onChange={(event) => setResourceDraft({ ...resourceDraft, location: event.target.value })} /></label>
                  <div className="admin-image-field">
                    <label className="admin-field"><span>Card image URL</span><input value={resourceDraft.cardImage} onChange={(event) => setResourceDraft({ ...resourceDraft, cardImage: event.target.value })} /></label>
                    <label className="admin-field">
                      <span>Or upload image</span>
                      <input type="file" accept="image/*" onChange={handleCardImageUpload} />
                    </label>
                    <p className="admin-help">Uploads are stored as image data in this resource. Use hosted URLs for larger production images.</p>
                    {resourceDraft.cardImage ? <img className="admin-image-preview" src={resourceDraft.cardImage} alt={`${resourceDraft.name || 'Resource'} card preview`} /> : null}
                  </div>
                  <label className="admin-field"><span>Card type</span><input value={resourceDraft.cardType} onChange={(event) => setResourceDraft({ ...resourceDraft, cardType: event.target.value })} /></label>
                  <label className="admin-field"><span>Card location</span><input value={resourceDraft.cardLocation} onChange={(event) => setResourceDraft({ ...resourceDraft, cardLocation: event.target.value })} /></label>
                  <label className="admin-field"><span>Badges</span><input value={resourceDraft.cardBadges.join(', ')} onChange={(event) => setResourceDraft({ ...resourceDraft, cardBadges: splitList(event.target.value) })} /></label>
                  <label className="admin-field"><span>Featured rank</span><input type="number" value={resourceDraft.featuredRank} onChange={(event) => setResourceDraft({ ...resourceDraft, featuredRank: Number(event.target.value) })} /></label>
                </div>
                <label className="admin-field"><span>Summary</span><textarea value={resourceDraft.summary} onChange={(event) => setResourceDraft({ ...resourceDraft, summary: event.target.value })} required /></label>
                <label className="admin-field"><span>Card description</span><textarea value={resourceDraft.cardDescription} onChange={(event) => setResourceDraft({ ...resourceDraft, cardDescription: event.target.value })} /></label>
                <label className="admin-field"><span>About lines</span><textarea value={resourceDraft.about.join('\n')} onChange={(event) => setResourceDraft({ ...resourceDraft, about: splitLines(event.target.value) })} /></label>
                <label className="admin-field"><span>Services</span><textarea value={resourceDraft.services.join('\n')} onChange={(event) => setResourceDraft({ ...resourceDraft, services: splitLines(event.target.value) })} /></label>
                <div className="admin-form-actions">
                  <label className="admin-check"><input type="checkbox" checked={resourceDraft.featured} onChange={(event) => setResourceDraft({ ...resourceDraft, featured: event.target.checked })} /> Featured</label>
                  <label className="admin-check"><input type="checkbox" checked={resourceDraft.enabled} onChange={(event) => setResourceDraft({ ...resourceDraft, enabled: event.target.checked })} /> Published</label>
                  <button type="submit" className="admin-button admin-button--primary">Save resource</button>
                  {resourceDraft.id ? <button type="button" className="admin-button admin-button--danger" onClick={() => deleteResource(resourceDraft.id)}>Delete</button> : null}
                </div>
              </form>
            </div>
          </section> : null}

          {currentAdminSection === 'membership' ? <section className="admin-card">
            <div className="admin-section-head">
              <div>
                <p className="admin-eyebrow">Membership</p>
                <h2>Waitlist submissions</h2>
              </div>
              <label className="admin-field admin-field--compact">
                <span>Interest</span>
                <select value={interestFilter} onChange={(event) => setInterestFilter(event.target.value)}>
                  {interests.map((interest) => <option value={interest} key={interest}>{interest}</option>)}
                </select>
              </label>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Name</th><th>Email</th><th>Interest</th><th>Location</th><th>Date</th><th>Email</th></tr></thead>
                <tbody>
                  {filteredWaitlist.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.interest}</td>
                      <td>{item.location || '-'}</td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>{item.emailStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section> : null}

          {currentAdminSection === 'qr-analytics' ? <section className="admin-card admin-coming-soon">
            <p className="admin-eyebrow">QR analytics</p>
            <h2>Scanned QR code data</h2>
            <p>Coming soon. The schema is ready, but public QR tracking is intentionally shelved for this phase.</p>
          </section> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
