export const SCREEN_TRANSITION_MS = 170;
export const API_TIMEOUT_MS = 4500;
export const API_BASE = '/api/v1';

/** @type {{
  currentScreen: string,
  currentPathname: string | null,
  campaignOriginPath: string | null,
  selectedFormat: string,
  selectedMood: string | null,
  selectedMoodButton: HTMLElement | null,
  messageIndex: number,
  audioPlaying: boolean,
  lastFocused: HTMLElement | null
}} */
export const state = {
  currentScreen: 's-landing',
  currentPathname: null,
  campaignOriginPath: null,
  selectedFormat: 'video',
  selectedMood: null,
  selectedMoodButton: null,
  messageIndex: 0,
  audioPlaying: false,
  lastFocused: null
};
