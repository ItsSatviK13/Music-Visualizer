// Audio Utilities
export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

export function createAudioElement(file) {
  return new Audio(URL.createObjectURL(file));
}