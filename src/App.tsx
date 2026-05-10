import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { CrisisDialog } from './components/CrisisDialog';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { WaitlistSection } from './components/WaitlistSection';
import { useAccraCodedApp } from './hooks/useAccraCodedApp';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const ExplorePage = lazy(() => import('./pages/ExplorePage').then((module) => ({ default: module.ExplorePage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then((module) => ({ default: module.EventsPage })));
const MembershipPage = lazy(() => import('./pages/MembershipPage').then((module) => ({ default: module.MembershipPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const CampaignPage = lazy(() => import('./pages/CampaignPage').then((module) => ({ default: module.CampaignPage })));
const SupportResourcesPage = lazy(() =>
  import('./pages/SupportResourcesPage').then((module) => ({ default: module.SupportResourcesPage }))
);
const AdminPage = lazy(() => import('./pages/AdminPage').then((module) => ({ default: module.AdminPage })));

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
      <Suspense fallback={<div className="page-shell screen__inner" aria-live="polite">Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
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
