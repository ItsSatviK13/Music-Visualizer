// Spotify Utilities
const CLIENT_ID = '80a9f35a495d4bc6992d422a45b10930';
const CLIENT_SECRET = '85e132557a724ad89c4b625842ac7f48';
const REDIRECT_URI = 'http://localhost:3000/callback';

export function getSpotifyAuthUrl() {
  const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state';
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
}

export async function exchangeCodeForToken(code) {
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

  const response = await fetch(tokenUrl, payload);
  return response.json();
}