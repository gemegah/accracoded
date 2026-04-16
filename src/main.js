import { state } from './domain/appState.js';
import { bindDialogOverlay, handleDialogTrap, hideCrisis, showCrisis } from './app/dialog.js';
import { copyShareLink, selectMood, submitCheckin, toggleAudio, togglePlay } from './app/interactionHandlers.js';
import { goTo, selectFormat, syncToggle } from './app/navigation.js';
import { runLandingTypewriter } from './app/typewriter.js';

function handleActionClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) {
    return;
  }

  const action = target.dataset.action;

  if (action === 'go-to') {
    goTo(target.dataset.target);
    return;
  }

  if (action === 'select-format') {
    selectFormat(target.dataset.format);
    return;
  }

  if (action === 'switch-view') {
    state.selectedFormat = target.dataset.format;
    syncToggle(state.selectedFormat);
    return;
  }

  if (action === 'toggle-play') {
    togglePlay(target);
    return;
  }

  if (action === 'toggle-audio') {
    toggleAudio(target);
    return;
  }

  if (action === 'select-mood') {
    selectMood(target, target.dataset.mood);
    return;
  }

  if (action === 'submit-checkin') {
    submitCheckin();
    return;
  }

  if (action === 'copy-link') {
    copyShareLink(target);
    return;
  }

  if (action === 'show-crisis') {
    showCrisis(target);
    return;
  }

  if (action === 'hide-crisis') {
    hideCrisis();
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
  document.addEventListener('click', handleActionClick);
  document.addEventListener('keydown', handleDialogTrap);

  bindDialogOverlay();
  applyNetworkAwareDefaultFormat();
  syncToggle(state.selectedFormat);
  runLandingTypewriter();
}

initApp();
