// Spotify API Configuration
const CLIENT_ID = '80a9f35a495d4bc6992d422a45b10930'; // Replace with your Spotify Client ID
const CLIENT_SECRET = '85e132557a724ad89c4b625842ac7f48'; // Replace with your Spotify Client Secret
const REDIRECT_URI = 'http://localhost:3000/callback'; // Replace with your redirect URI
const SCOPE = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state';

let accessToken = null;

// Function to initialize Spotify integration
export function initSpotifyIntegration() {
  console.log('Spotify integration initialized.');

  // Check if the user is already authenticated
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    // Exchange the authorization code for an access token
    exchangeCodeForToken(code);
  } else {
    // Redirect the user to Spotify's authorization page
    redirectToSpotifyAuth();
  }
}

// Redirect the user to Spotify's authorization page
function redirectToSpotifyAuth() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}`;
  window.location.href = authUrl;
}

// Exchange the authorization code for an access token
async function exchangeCodeForToken(code) {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
  };

  try {
    const response = await fetch(tokenUrl, payload);
    const data = await response.json();
    accessToken = data.access_token;
    console.log('Access Token:', accessToken);

    // Fetch user's playback state
    fetchPlaybackState();
  } catch (error) {
    console.error('Error exchanging code for token:', error);
  }
}

// Fetch the user's current playback state
async function fetchPlaybackState() {
  const playbackUrl = 'https://api.spotify.com/v1/me/player';
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(playbackUrl, { headers });
    const data = await response.json();
    console.log('Playback State:', data);

    // Display song metadata and album artwork
    if (data.item) {
      const songName = data.item.name;
      const artistName = data.item.artists[0].name;
      const albumArtwork = data.item.album.images[0].url;

      console.log('Now Playing:', `${songName} by ${artistName}`);
      console.log('Album Artwork:', albumArtwork);

      // Update the UI with song metadata
      const songTitle = document.getElementById('song-title');
      const songArtist = document.getElementById('song-artist');
      const albumArtworkImg = document.getElementById('album-artwork');

      songTitle.textContent = songName;
      songArtist.textContent = artistName;
      albumArtworkImg.src = albumArtwork;
    }
  } catch (error) {
    console.error('Error fetching playback state:', error);
  }
}