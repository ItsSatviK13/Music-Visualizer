// Audio Player Logic
let audio;
let currentTrackIndex = 0;
let tracks = [];

// Initialize Music Player
export function initPlayer() {
  const playButton = document.getElementById('play');
  const pauseButton = document.getElementById('pause');
  const skipButton = document.getElementById('skip');
  const localMusicInput = document.getElementById('local-music');
  const progressBar = document.getElementById('progress-bar');
  const currentTime = document.getElementById('current-time');
  const totalTime = document.getElementById('total-time');
  const volumeBar = document.getElementById('volume-bar');
  const muteButton = document.getElementById('mute');

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
    if (tracks.length > 0) {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      playTrack(tracks[currentTrackIndex]);
    }
  });

  // Upload Folder
  localMusicInput.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      tracks = files.filter(file => file.type.startsWith('audio/'));
      if (tracks.length > 0) {
        playTrack(tracks[currentTrackIndex]);
      }
    }
  });

  // Play a Track
  function playTrack(file) {
    if (audio) {
      audio.pause();
      audio = null;
    }

    audio = new Audio(URL.createObjectURL(file));
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';

    // Update Metadata
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const albumArtwork = document.getElementById('album-artwork');

    songTitle.textContent = file.name;
    songArtist.textContent = 'Unknown Artist';
    albumArtwork.src = 'assets/images/placeholder-artwork.jpg';

    // Update Progress Bar
    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progress;
      currentTime.textContent = formatTime(audio.currentTime);
      totalTime.textContent = formatTime(audio.duration);
    });

    progressBar.addEventListener('input', (e) => {
      audio.currentTime = (e.target.value / 100) * audio.duration;
    });

    // Handle Track End
    audio.addEventListener('ended', () => {
      if (tracks.length > 0) {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        playTrack(tracks[currentTrackIndex]);
      }
    });
  }

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

  // Format Time (MM:SS)
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
}