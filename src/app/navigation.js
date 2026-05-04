import { SCREEN_TRANSITION_MS, state } from '../domain/appState.js';
import { trackEvent } from '../data/telemetryRepository.js';

export function syncToggle(format) {
  ['video', 'audio', 'text'].forEach((name) => {
    const tab = document.getElementById(`tb-${name}`);
    const view = document.getElementById(`view-${name}`);
    const isActive = name === format;

    if (tab) {
      tab.setAttribute('aria-pressed', String(isActive));
    }

    if (view) {
      view.classList.toggle('is-hidden', !isActive);
    }
  });
}

export function goTo(id) {
  const next = document.getElementById(id);
  const current = document.getElementById(state.currentScreen);

  if (!next || id === state.currentScreen || !current) {
    return;
  }

  current.classList.remove('is-active');
  next.classList.add('is-active');

  state.currentScreen = id;
  void trackEvent('screen_view', { screenId: id });

  window.setTimeout(() => {
    next.scrollTop = 0;
  }, SCREEN_TRANSITION_MS);

  if (id === 's-content') {
    syncToggle(state.selectedFormat);
  }
}

export function selectFormat(format, options = {}) {
  state.selectedFormat = format;

  ['video', 'audio', 'text'].forEach((name) => {
    const card = document.getElementById(`fmt-${name}`);
    const isSelected = name === format;

    if (!card) {
      return;
    }

    card.classList.toggle('is-selected', isSelected);
    card.setAttribute('aria-pressed', String(isSelected));
  });

  syncToggle(format);

  if (options.advance) {
    goTo('s-content');
  }
}
