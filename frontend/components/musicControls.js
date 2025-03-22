// Music Controls Component
export function initMusicControls() {
  const playButton = document.getElementById('play');
  const pauseButton = document.getElementById('pause');
  const skipButton = document.getElementById('skip');
  const volumeBar = document.getElementById('volume-bar');
  const muteButton = document.getElementById('mute');

  let audio;

  // Play/Pause Button
  playButton.addEventListener('click', () => {
    if (audio) {
      audio.play();
      playButton.style.display = 'none';
      pauseButton.style.display = 'inline-block';
    }
  });

  pauseButton.addEventListener('click', () => {
    if (audio) {
      audio.pause();
      pauseButton.style.display = 'none';
      playButton.style.display = 'inline-block';
    }
  });

  // Skip Button
  skipButton.addEventListener('click', () => {
    // Implement skip logic here
  });

  // Volume Control
  volumeBar.addEventListener('input', (e) => {
    if (audio) {
      audio.volume = e.target.value;
    }
  });

  // Mute Button
  muteButton.addEventListener('click', () => {
    if (audio) {
      audio.muted = !audio.muted;
      muteButton.querySelector('img').src = audio.muted ? 'assets/icons/mute.svg' : 'assets/icons/volume.svg';
    }
  });

  return {
    setAudio: (newAudio) => {
      audio = newAudio;
    },
  };
}