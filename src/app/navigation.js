import { SCREEN_TRANSITION_MS, state } from '../domain/appState.js';
import { trackEvent } from '../data/telemetryRepository.js';

const ACTIVE_CAMPAIGN_FORMATS = ['video', 'text'];

export function closeSiteMenus() {
  document.querySelectorAll('.site-nav--mobile').forEach((menu) => {
    menu.hidden = true;
  });

  document.querySelectorAll('.site-nav__toggle').forEach((toggle) => {
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  });
}

export function toggleSiteMenu(button) {
  const menuId = button.getAttribute('aria-controls');
  const menu = menuId ? document.getElementById(menuId) : null;

  if (!menu) {
    return;
  }

  const willOpen = menu.hidden;
  closeSiteMenus();

  if (!willOpen) {
    return;
  }

  menu.hidden = false;
  button.classList.add('is-open');
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-label', 'Close navigation menu');
}

export function syncToggle(format) {
  const resolvedFormat = ACTIVE_CAMPAIGN_FORMATS.includes(format) ? format : 'video';

  if (state.selectedFormat !== resolvedFormat) {
    state.selectedFormat = resolvedFormat;
  }

  ['video', 'audio', 'text'].forEach((name) => {
    const tab = document.getElementById(`tb-${name}`);
    const view = document.getElementById(`view-${name}`);
    const isActive = name === resolvedFormat;

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

  if (!next || id === state.currentScreen) {
    return;
  }

  current?.classList.remove('is-active');
  next.classList.add('is-active');

  state.currentScreen = id;
  closeSiteMenus();
  void trackEvent('screen_view', { screenId: id });

  window.setTimeout(() => {
    next.scrollTop = 0;
  }, SCREEN_TRANSITION_MS);

  if (id === 's-content') {
    syncToggle(state.selectedFormat);
  }
}

export function selectFormat(format, options = {}) {
  const resolvedFormat = ACTIVE_CAMPAIGN_FORMATS.includes(format) ? format : 'video';
  state.selectedFormat = resolvedFormat;

  ['video', 'audio', 'text'].forEach((name) => {
    const card = document.getElementById(`fmt-${name}`);
    const isSelected = name === resolvedFormat;

    if (!card) {
      return;
    }

    card.classList.toggle('is-selected', isSelected);
    card.setAttribute('aria-pressed', String(isSelected));
  });

  syncToggle(resolvedFormat);

  if (options.advance) {
    goTo('s-content');
  }
}
