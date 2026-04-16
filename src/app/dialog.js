import { state } from '../domain/appState.js';

const overlay = document.getElementById('crisis-overlay');
const dialog = overlay?.querySelector('.c-dialog');

function getFocusableInDialog() {
  return dialog?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [];
}

export function showCrisis(triggerElement) {
  if (!overlay || !dialog) {
    return;
  }

  state.lastFocused = triggerElement || document.activeElement;
  overlay.hidden = false;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');

  window.setTimeout(() => {
    const focusables = getFocusableInDialog();
    if (focusables.length > 0) {
      focusables[0].focus();
    } else {
      dialog.focus();
    }
  }, 0);
}

export function hideCrisis() {
  if (!overlay) {
    return;
  }

  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.hidden = true;

  if (state.lastFocused && typeof state.lastFocused.focus === 'function') {
    state.lastFocused.focus();
  }
}

export function handleDialogTrap(event) {
  if (!overlay?.classList.contains('is-open')) {
    return;
  }

  if (event.key === 'Escape') {
    hideCrisis();
    return;
  }

  if (event.key !== 'Tab') {
    return;
  }

  const focusables = Array.from(getFocusableInDialog());
  if (focusables.length === 0) {
    event.preventDefault();
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function bindDialogOverlay() {
  if (!overlay) {
    return;
  }

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      hideCrisis();
    }
  });
}
