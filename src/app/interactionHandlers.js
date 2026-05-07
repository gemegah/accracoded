import { state } from '../domain/appState.js';
import { saveCheckin } from '../data/checkinRepository.js';
import { trackEvent } from '../data/telemetryRepository.js';
import { goTo } from './navigation.js';

const TEXT_MESSAGES = [
  {
    body: [
      'Dear you,',
      'I know how it feels when Accra asks too much of you.',
      'The trotro. The deadline. The call from home you have not returned. The thing you cannot say out loud because no one seems to have time for it.',
      'I have been there. In a crowded place, but completely alone with it.',
      'What I want you to know is that feeling it does not mean you are falling apart. It means you are paying attention.',
      'You do not have to fix it today. You only have to stay with it long enough to let something shift.',
      'You are still here. That already says something.'
    ],
    sign: 'Kofi, 31, Tema'
  },
  {
    body: [
      'Dear you,',
      'Some days you wake up already tired, like the day started before you had a chance to enter it.',
      'If that is where you are, please do not turn it into another reason to judge yourself.',
      'Try one small thing. Drink water. Sit somewhere quiet for two minutes. Let one person know you are having a hard day.',
      'You do not have to explain everything perfectly before you deserve care.',
      'One honest sentence can be enough for now.'
    ],
    sign: 'Ama, 27, Osu'
  },
  {
    body: [
      'Dear you,',
      'There is a kind of strength that looks like stopping before you break.',
      'Not disappearing. Not pretending. Just pausing long enough to hear what your body has been trying to say.',
      'You are allowed to need softness, even when life around you is moving fast.',
      'Take the next breath slowly. Then the next one.',
      'You are still worth caring for, even on the days you cannot perform being okay.'
    ],
    sign: 'Nii, 34, Dansoman'
  }
];

function setCheckinError(message) {
  const error = document.getElementById('checkin-error');

  if (!error) {
    return;
  }

  error.textContent = message;
  error.hidden = false;
}

export function clearCheckinError() {
  const error = document.getElementById('checkin-error');

  if (error) {
    error.hidden = true;
  }
}

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
  if (state.selectedMoodButton && state.selectedMoodButton !== button) {
    state.selectedMoodButton.classList.remove('is-selected');
    state.selectedMoodButton.setAttribute('aria-pressed', 'false');
  }

  state.selectedMood = mood;
  state.selectedMoodButton = button;
  button.classList.add('is-selected');
  button.setAttribute('aria-pressed', 'true');
  clearCheckinError();
}

export async function submitCheckin() {
  const age = document.getElementById('age-select')?.value ?? '';
  const gender = document.getElementById('gender-select')?.value ?? '';

  if (!state.selectedMood || !age || !gender) {
    setCheckinError('Please choose a feeling, age range, and gender before continuing.');
    await trackEvent('checkin_validation_error', {
      screenId: state.currentScreen,
      missingMood: !state.selectedMood,
      missingAge: !age,
      missingGender: !gender
    });
    return false;
  }

  const payload = {
    mood: state.selectedMood,
    format: state.selectedFormat,
    age,
    gender,
    timestamp: new Date().toISOString()
  };

  const result = await saveCheckin(payload);
  await trackEvent('submit_checkin', {
    ok: result.ok,
    screenId: state.currentScreen,
    selectedFormat: state.selectedFormat,
    selectedMood: state.selectedMood || 'unknown'
  });

  goTo('s-resources');
  return true;
}

export function cycleMessage() {
  state.messageIndex = (state.messageIndex + 1) % TEXT_MESSAGES.length;
  const message = TEXT_MESSAGES[state.messageIndex];
  const body = document.getElementById('letter-body');
  const sign = document.getElementById('letter-sign');

  if (!body || !sign) {
    return;
  }

  body.textContent = '';
  message.body.forEach((line) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = line;
    body.appendChild(paragraph);
  });

  sign.innerHTML = '';
  sign.append(`- ${message.sign}`);
  sign.appendChild(document.createElement('br'));

  const note = document.createElement('span');
  note.className = 'copy-soft';
  note.textContent = 'Shared anonymously with Accra Coded';
  sign.appendChild(note);

  void trackEvent('cycle_text_message', {
    screenId: state.currentScreen,
    messageIndex: state.messageIndex
  });
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
