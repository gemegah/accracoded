import { state } from './domain/appState.js';
import { bindDialogOverlay, handleDialogTrap, hideCrisis, showCrisis } from './app/dialog.js';
import { filterExplore, renderExploreDirectory, searchExplore } from './app/exploreDirectoryView.js';
import { clearCheckinError, copyShareLink, cycleMessage, selectMood, submitCheckin, toggleAudio, togglePlay } from './app/interactionHandlers.js';
import { closeSiteMenus, goTo, selectFormat, syncSiteNavigation, syncToggle, toggleSiteMenu } from './app/navigation.js';
import { renderSupportDirectory } from './app/supportDirectoryView.js';
import { runLandingTypewriter } from './app/typewriter.js';
import { flushCheckins } from './data/checkinRepository.js';
import { flushTelemetry, trackEvent } from './data/telemetryRepository.js';

const ACTIONS = {
  'go-to': (target) => goTo(target.dataset.target),
  'select-format': (target) => selectFormat(target.dataset.format, { advance: true }),
  'switch-view': (target) => {
    state.selectedFormat = target.dataset.format;
    syncToggle(state.selectedFormat);
  },
  'toggle-play': (target) => togglePlay(target),
  'toggle-audio': (target) => toggleAudio(target),
  'cycle-message': () => cycleMessage(),
  'select-mood': (target) => selectMood(target, target.dataset.mood),
  'submit-checkin': () => {
    void submitCheckin();
  },
  'copy-link': (target) => copyShareLink(target),
  'toggle-site-menu': (target) => toggleSiteMenu(target),
  'filter-explore': (target) => {
    if (target.dataset.resetSearch === 'true') {
      const searchInput = document.getElementById('explore-search');
      if (searchInput) {
        searchInput.value = '';
      }
      searchExplore('');
    }
    filterExplore(target.dataset.category);
  },
  'show-crisis': (target) => showCrisis(target),
  'hide-crisis': () => hideCrisis()
};

function handleActionClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) {
    return;
  }

  const action = ACTIONS[target.dataset.action];
  if (action) {
    action(target);
  }
}

function applyNetworkAwareDefaultFormat() {
  if (navigator.connection && navigator.connection.effectiveType) {
    const networkType = navigator.connection.effectiveType;
    if (networkType === 'slow-2g' || networkType === '2g') {
      selectFormat('text');
    } else if (networkType === '3g') {
      selectFormat('audio');
    }
  }
}

function applyInitialScreenFromHash() {
  const initialId = window.location.hash.slice(1);
  const initialScreen = initialId ? document.getElementById(initialId) : null;

  if (!initialScreen?.classList.contains('screen')) {
    syncSiteNavigation();
    return;
  }

  document.getElementById(state.currentScreen)?.classList.remove('is-active');
  initialScreen.classList.add('is-active');
  state.currentScreen = initialId;
  syncSiteNavigation(initialId);
}

function handleGlobalKeydown(event) {
  handleDialogTrap(event);

  if (event.key === 'Escape') {
    closeSiteMenus();
  }
}

function initApp() {
  renderSupportDirectory();
  renderExploreDirectory();
  applyInitialScreenFromHash();
  document.addEventListener('click', handleActionClick);
  document.getElementById('explore-search')?.addEventListener('input', (event) => {
    searchExplore(event.target.value);
  });
  document.getElementById('age-select')?.addEventListener('change', clearCheckinError);
  document.getElementById('gender-select')?.addEventListener('change', clearCheckinError);
  document.addEventListener('click', () => {
    void trackEvent('action_click', { screenId: state.currentScreen });
  }, { once: true });
  document.addEventListener('keydown', handleGlobalKeydown);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushCheckins();
      void flushTelemetry();
    }
  });

  bindDialogOverlay();
  applyNetworkAwareDefaultFormat();
  syncToggle(state.selectedFormat);
  syncSiteNavigation();
  void flushCheckins();
  void flushTelemetry();
  void trackEvent('screen_view', { screenId: state.currentScreen });
  runLandingTypewriter();
}

initApp();
