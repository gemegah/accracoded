import { state } from '../domain/appState.js';
import { saveCheckin } from '../data/checkinRepository.js';
import { goTo } from './navigation.js';

export function togglePlay(button) {
  const isPlaying = button.classList.toggle('is-playing');
  button.setAttribute('aria-pressed', String(isPlaying));
  button.setAttribute('aria-label', isPlaying ? 'Pause video message' : 'Play video message');
}

export function toggleAudio(button) {
  state.audioPlaying = !state.audioPlaying;
  button.classList.toggle('is-playing', state.audioPlaying);
  button.setAttribute('aria-pressed', String(state.audioPlaying));
  button.setAttribute('aria-label', state.audioPlaying ? 'Pause audio message' : 'Play audio message');
  document.getElementById('audio-panel')?.classList.toggle('is-playing', state.audioPlaying);
}

export function selectMood(button, mood) {
  state.selectedMood = mood;
  document.querySelectorAll('[data-action="select-mood"]').forEach((item) => {
    item.classList.remove('is-selected');
    item.setAttribute('aria-pressed', 'false');
  });
  button.classList.add('is-selected');
  button.setAttribute('aria-pressed', 'true');
}

export function submitCheckin() {
  const payload = {
    mood: state.selectedMood,
    format: state.selectedFormat,
    age: document.getElementById('age-select')?.value ?? '',
    gender: document.getElementById('gender-select')?.value ?? '',
    timestamp: new Date().toISOString()
  };

  saveCheckin(payload);
  goTo('s-resources');
}

function fallbackCopy(text) {
  const temp = document.createElement('textarea');
  temp.value = text;
  temp.setAttribute('readonly', '');
  temp.style.position = 'absolute';
  temp.style.left = '-9999px';
  document.body.appendChild(temp);
  temp.select();

  let copied = false;
  copied = document.execCommand('copy');

  document.body.removeChild(temp);
  return copied;
}

export function copyShareLink(button) {
  const shareUrl = 'https://accracoded.com';
  const label = button.querySelector('span');
  const defaultLabel = button.dataset.defaultLabel || 'Copy link';
  button.dataset.defaultLabel = defaultLabel;

  const setLabel = (text) => {
    if (label) {
      label.textContent = text;
    } else {
      button.textContent = text;
    }
  };

  const resetLabel = () => {
    window.setTimeout(() => {
      setLabel(defaultLabel);
    }, 1600);
  };

  const onSuccess = () => {
    setLabel('Link copied');
    resetLabel();
  };

  const onFailure = () => {
    setLabel('Copy failed');
    resetLabel();
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(shareUrl).then(onSuccess).catch(() => {
      if (fallbackCopy(shareUrl)) {
        onSuccess();
      } else {
        onFailure();
      }
    });
    return;
  }

  if (fallbackCopy(shareUrl)) {
    onSuccess();
  } else {
    onFailure();
  }
}
