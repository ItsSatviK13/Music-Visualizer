// Navbar Component
export function initNavbar() {
  const themeToggle = document.getElementById('theme-toggle');
  const spotifyLogin = document.getElementById('spotify-login');

  // Dark/Light Mode Toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });

  // Spotify Login
  spotifyLogin.addEventListener('click', () => {
    window.location.href = 'https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state';
  });
}