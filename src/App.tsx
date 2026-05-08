import { useEffect, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { CrisisDialog } from './components/CrisisDialog';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { WaitlistSection } from './components/WaitlistSection';
import { useAccraCodedApp } from './hooks/useAccraCodedApp';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { CampaignPage } from './pages/CampaignPage';
import { EventsPage } from './pages/EventsPage';
import { ExplorePage } from './pages/ExplorePage';
import { HomePage } from './pages/HomePage';
import { MembershipPage } from './pages/MembershipPage';
import { SupportResourcesPage } from './pages/SupportResourcesPage';

type AppRoute = {
  element: ReactNode;
  path: string;
  screenId: string;
};

const appRoutes: AppRoute[] = [
  { path: '/', screenId: 's-landing', element: <HomePage /> },
  { path: '/explore', screenId: 's-explore', element: <ExplorePage /> },
  { path: '/explore/:resourceSlug', screenId: 's-explore-detail', element: <ExplorePage /> },
  { path: '/events', screenId: 's-events', element: <EventsPage /> },
  { path: '/membership', screenId: 's-membership', element: <MembershipPage /> },
  { path: '/about', screenId: 's-about', element: <AboutPage /> },
  { path: '/campaign', screenId: 's-campaign', element: <CampaignPage /> },
  { path: '/resources', screenId: 's-resources', element: <SupportResourcesPage /> },
  { path: '/admin', screenId: 's-admin', element: <AdminPage /> },
  { path: '/admin/login', screenId: 's-admin', element: <AdminPage /> },
  { path: '/admin/metrics', screenId: 's-admin', element: <AdminPage /> },
  { path: '/admin/directory', screenId: 's-admin', element: <AdminPage /> },
  { path: '/admin/membership', screenId: 's-admin', element: <AdminPage /> },
  { path: '/admin/qr-analytics', screenId: 's-admin', element: <AdminPage /> }
];

const screenRoutes = {
  ...Object.fromEntries(appRoutes.map(({ screenId, path }) => [screenId, path])),
  's-explore-detail': '/explore'
};
const routeScreens = Object.fromEntries(appRoutes.map(({ path, screenId }) => [path, screenId]));

const internalScreenRoutes = {
  's-campaign-format': '/campaign',
  's-content': '/campaign',
  's-checkin': '/campaign',
  's-explore-detail': '/explore'
};

function AnimatedRoutes() {
  const location = useLocation();

  useAccraCodedApp({
    internalScreenRoutes,
    routeScreens,
    screenRoutes
  });

  return (
    <main className="app-routes min-h-dvh flex-1">
      <Routes location={location} key={location.pathname}>
        {appRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function AppChrome() {
  const { pathname } = useLocation();
  const showWaitlist = pathname === '/';
  const showSiteChrome = !pathname.startsWith('/admin');

  return (
    <div className="app-shell flex flex-col min-h-screen">
      <ScrollToTop />
      {showSiteChrome ? <NavBar /> : null}
      <AnimatedRoutes />
      {showWaitlist ? <WaitlistSection /> : null}
      {showSiteChrome ? <Footer /> : null}
      <CrisisDialog />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppChrome />
    </BrowserRouter>
  );
}
