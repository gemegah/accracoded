import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { bindDialogOverlay, handleDialogTrap, hideCrisis, showCrisis } from '../app/dialog.js';
import {
  filterExplore,
  filterHomeFeatured,
  renderExploreDirectory,
  renderResourceDetailById,
  searchExplore,
} from '../app/exploreDirectoryView.js';
import {
  clearCheckinError,
  copyShareLink,
  cycleMessage,
  selectMood,
  submitCheckin,
  toggleAudio,
  togglePlay
} from '../app/interactionHandlers.js';
import {
  closeSiteMenus,
  goTo,
  selectFormat,
  syncToggle,
  toggleSiteMenu
} from '../app/navigation.js';
import { renderSupportDirectory } from '../app/supportDirectoryView.js';
import { runLandingTypewriter } from '../app/typewriter.js';
import { flushCheckins } from '../data/checkinRepository.js';
import { WAITLIST_FORM_URL } from '../data/siteConfig.js';
import { flushTelemetry, trackEvent } from '../data/telemetryRepository.js';
import { state } from '../domain/appState.js';

type ActionElement = HTMLElement & {
  dataset: DOMStringMap;
};

type AccraCodedRouteConfig = {
  internalScreenRoutes: Record<string, string>;
  routeScreens: Record<string, string>;
  screenRoutes: Record<string, string>;
};

const DEFAULT_ROUTE_CONFIG: AccraCodedRouteConfig = {
  internalScreenRoutes: {
    's-campaign-format': '/campaign',
    's-content': '/campaign',
    's-checkin': '/campaign',
    's-explore-detail': '/explore'
  },
  routeScreens: {
    '/': 's-landing',
    '/explore': 's-explore',
    '/events': 's-events',
    '/membership': 's-membership',
    '/about': 's-about',
    '/campaign': 's-campaign',
    '/resources': 's-resources'
  },
  screenRoutes: {
    's-landing': '/',
    's-explore': '/explore',
    's-events': '/events',
    's-membership': '/membership',
    's-about': '/about',
    's-campaign': '/campaign',
    's-resources': '/resources'
  }
};

function getRouteForScreen(screenRoutes: Record<string, string>, screenId?: string) {
  return screenId ? screenRoutes[screenId] : undefined;
}

function getScreenForRoute(routeScreens: Record<string, string>, pathname: string) {
  if (pathname.startsWith('/explore/')) {
    return 's-explore-detail';
  }

  return routeScreens[pathname] || 's-landing';
}

function applyNetworkAwareDefaultFormat() {
  const connection = navigator.connection;
  if (!connection?.effectiveType) {
    return;
  }

  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    selectFormat('text');
  } else if (connection.effectiveType === '3g') {
    selectFormat('audio');
  }
}

export function useAccraCodedApp({
  internalScreenRoutes,
  routeScreens,
  screenRoutes
}: AccraCodedRouteConfig = DEFAULT_ROUTE_CONFIG) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const navigateToScreen = (screenId?: string) => {
      const route = getRouteForScreen(screenRoutes, screenId);

      if (route) {
        navigate(route);
        return;
      }

      const internalRoute = screenId ? internalScreenRoutes[screenId] : undefined;

      if (screenId && internalRoute && internalRoute !== location.pathname) {
        navigate(internalRoute);
        window.setTimeout(() => goTo(screenId), 0);
        return;
      }

      goTo(screenId);
    };

    const actions: Record<string, (target: ActionElement) => void> = {
      'go-to': (target) => navigateToScreen(target.dataset.target),
      'select-format': (target) => selectFormat(target.dataset.format, { advance: true }),
      'switch-view': (target) => {
        state.selectedFormat = target.dataset.format || state.selectedFormat;
        syncToggle(state.selectedFormat);
      },
      'toggle-play': (target) => togglePlay(target),
      'toggle-audio': (target) => toggleAudio(target),
      'cycle-message': () => cycleMessage(),
      'select-mood': (target) => selectMood(target, target.dataset.mood),
      'submit-checkin': () => {
        void submitCheckin().then((completed) => {
          if (completed) {
            navigate('/resources');
          }
        });
      },
      'copy-link': (target) => copyShareLink(target),
      'toggle-site-menu': (target) => toggleSiteMenu(target),
      'filter-explore': (target) => {
        if (target.dataset.resetSearch === 'true') {
          const searchInput = document.getElementById('explore-search') as HTMLInputElement | null;
          if (searchInput) {
            searchInput.value = '';
          }
          searchExplore('');
        }
        filterExplore(target.dataset.category);
      },
      'go-to-filter-explore': (target) => {
        const searchInput = document.getElementById('explore-search') as HTMLInputElement | null;
        if (searchInput) {
          searchInput.value = '';
        }
        searchExplore('');
        navigateToScreen(target.dataset.target || 's-explore');
        window.setTimeout(() => filterExplore(target.dataset.category || 'all'), 0);
      },
      'campaign-back': (target) => {
        const fallbackScreen = target.dataset.fallback || 's-campaign';

        if (target.dataset.scope === 'route' && state.campaignOriginPath && state.campaignOriginPath !== location.pathname) {
          navigate(state.campaignOriginPath);
          return;
        }

        navigateToScreen(fallbackScreen);
      },
      'filter-home-featured': (target) => {
        filterHomeFeatured(target.dataset.category);
      },
      'open-waitlist': () => {
        const waitlistWindow = window.open(WAITLIST_FORM_URL, '_blank', 'noopener,noreferrer');
        if (!waitlistWindow) {
          window.location.assign(WAITLIST_FORM_URL);
        }
        void trackEvent('open_waitlist', {
          screenId: state.currentScreen
        });
      },
      'view-resource': (target) => {
        const resourceId = target.dataset.resourceId;
        if (resourceId) {
          navigate(`/explore/${resourceId}`);
        }
      },
      'show-crisis': (target) => showCrisis(target),
      'hide-crisis': () => hideCrisis()
    };

    const handleActionClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest('[data-action]') as ActionElement | null;
      if (!target) {
        return;
      }

      const action = actions[target.dataset.action || ''];
      action?.(target);
    };

    const handleGlobalKeydown = (event: KeyboardEvent) => {
      handleDialogTrap(event);

      if (event.key === 'Escape') {
        closeSiteMenus();
      }
    };

    const handleExploreSearch = (event: Event) => {
      const target = event.target as HTMLInputElement | null;

      if (target?.id === 'explore-search') {
        searchExplore(target.value);
      }
    };

    const handleSelectChange = (event: Event) => {
      const target = event.target as HTMLSelectElement | null;

      if (target?.id === 'age-select' || target?.id === 'gender-select') {
        clearCheckinError();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        void flushCheckins();
        void flushTelemetry();
      }
    };

    document.addEventListener('click', handleActionClick);
    document.addEventListener('input', handleExploreSearch);
    document.addEventListener('change', handleSelectChange);
    document.addEventListener('click', () => {
      void trackEvent('action_click', { screenId: state.currentScreen });
    }, { once: true });
    document.addEventListener('keydown', handleGlobalKeydown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    bindDialogOverlay();
    applyNetworkAwareDefaultFormat();
    syncToggle(state.selectedFormat);
    void flushCheckins();
    void flushTelemetry();
    void trackEvent('screen_view', { screenId: state.currentScreen });
    runLandingTypewriter();

    return () => {
      document.removeEventListener('click', handleActionClick);
      document.removeEventListener('input', handleExploreSearch);
      document.removeEventListener('change', handleSelectChange);
      document.removeEventListener('keydown', handleGlobalKeydown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [internalScreenRoutes, location.pathname, navigate, screenRoutes]);

  useEffect(() => {
    const previousPathname = state.currentPathname;

    if (location.pathname === '/campaign') {
      if (previousPathname && previousPathname !== '/campaign') {
        state.campaignOriginPath = previousPathname;
      }
    } else if (previousPathname && previousPathname !== location.pathname) {
      state.campaignOriginPath = null;
    }

    state.currentPathname = location.pathname;

    const screenId = getScreenForRoute(routeScreens, location.pathname);

    state.currentScreen = screenId;
    closeSiteMenus();
    renderSupportDirectory();
    renderExploreDirectory();
    if (location.pathname.startsWith('/explore/')) {
      renderResourceDetailById(decodeURIComponent(location.pathname.replace('/explore/', '')));
    }
    syncToggle(state.selectedFormat);
    void trackEvent('screen_view', { screenId });

    if (screenId === 's-landing') {
      runLandingTypewriter();
    }
  }, [location.pathname, routeScreens]);
}
