export function saveCheckin(payload) {
  // Current adapter writes to global runtime for parity with existing behavior.
  // Replace with an API call when a real backend endpoint is available.
  window.__accracodedCheckin = payload;
}
