import { state } from './domain/appState.js';
import { bindDialogOverlay, handleDialogTrap, hideCrisis, showCrisis } from './app/dialog.js';
import { copyShareLink, selectMood, submitCheckin, toggleAudio, togglePlay } from './app/interactionHandlers.js';
import { goTo, selectFormat, syncToggle } from './app/navigation.js';
import { renderSupportDirectory } from './app/supportDirectoryView.js';
import { runLandingTypewriter } from './app/typewriter.js';
import { flushCheckins } from './data/checkinRepository.js';
import { flushTelemetry, trackEvent } from './data/telemetryRepository.js';

const ACTIONS = {
  'go-to': (target) => goTo(target.dataset.target),
  'select-format': (target) => selectFormat(target.dataset.format),
  'switch-view': (target) => {
    state.selectedFormat = target.dataset.format;
    syncToggle(state.selectedFormat);
  },
  'toggle-play': (target) => togglePlay(target),
  'toggle-audio': (target) => toggleAudio(target),
  'select-mood': (target) => selectMood(target, target.dataset.mood),
  'submit-checkin': () => {
    void submitCheckin();
  },
  'copy-link': (target) => copyShareLink(target),
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

function initApp() {
  renderSupportDirectory();
  document.addEventListener('click', handleActionClick);
  document.addEventListener('click', () => {
    void trackEvent('action_click', { screenId: state.currentScreen });
  }, { once: true });
  document.addEventListener('keydown', handleDialogTrap);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushCheckins();
      void flushTelemetry();
    }
  });

  bindDialogOverlay();
  applyNetworkAwareDefaultFormat();
  syncToggle(state.selectedFormat);
  void flushCheckins();
  void flushTelemetry();
  void trackEvent('screen_view', { screenId: state.currentScreen });
  runLandingTypewriter();
}

initApp();
