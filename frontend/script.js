import { initVisualizer } from './threevisualizer.js';
import { initSpotifyIntegration } from './spotifyIntegration.js';
import { applyColorMatching } from './aiColorMatching.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Visualizer
  const visualizer = document.getElementById('visualizer');
  initVisualizer(visualizer);

  // Initialize Spotify Integration
  initSpotifyIntegration();

  // Apply AI Color Matching
  applyColorMatching();

  // Dark/Light Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });

  // Spotify Login
  const spotifyLogin = document.getElementById('spotify-login');
  spotifyLogin.addEventListener('click', () => {
    window.location.href = 'https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state';
  });

  // Audio Player Logic
  let audio;
  let currentTrackIndex = 0;
  let tracks = [];

  // Play/Pause Button
  const playButton = document.getElementById('play');
  const pauseButton = document.getElementById('pause');
  const skipButton = document.getElementById('skip');

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

  skipButton.addEventListener('click', () => {
    if (tracks.length > 0) {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      playTrack(tracks[currentTrackIndex]);
    }
  });

  // Upload Folder
  const localMusicInput = document.getElementById('local-music');
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
    const progressBar = document.getElementById('progress-bar');
    const currentTime = document.getElementById('current-time');
    const totalTime = document.getElementById('total-time');

    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progress;
      currentTime.textContent = formatTime(audio.currentTime);
      totalTime.textContent = formatTime(audio.duration);
    });

    progressBar.addEventListener('input', (e) => {
      audio.currentTime = (e.target.value / 100) * audio.duration;
    });
  }

  // Volume Control
  const volumeBar = document.getElementById('volume-bar');
  const muteButton = document.getElementById('mute');

  volumeBar.addEventListener('input', (e) => {
    if (audio) {
      audio.volume = e.target.value;
    }
  });

  muteButton.addEventListener('click', () => {
    if (audio) {
      audio.muted = !audio.muted;
      muteButton.querySelector('img').src = audio.muted ? 'assets/icons/mute.svg' : 'assets/icons/volume.svg';
    }
  });

  // YouTube Integration
  const youtubeUrlInput = document.getElementById('youtube-url');
  const playYouTubeButton = document.getElementById('play-youtube');

  playYouTubeButton.addEventListener('click', () => {
    const youtubeUrl = youtubeUrlInput.value;
    if (youtubeUrl) {
      playYouTubeTrack(youtubeUrl);
    }
  });

  function playYouTubeTrack(url) {
    if (audio) {
      audio.pause();
      audio = null;
    }

    // Use YouTube API or embed to play the track
    console.log('Playing YouTube track:', url);
    // Implement YouTube playback logic here
  }

  // Format Time (MM:SS)
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
});