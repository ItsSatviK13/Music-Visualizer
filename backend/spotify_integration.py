import requests
from base64 import b64encode

CLIENT_ID = "80a9f35a495d4bc6992d422a45b10930"
CLIENT_SECRET = "85e132557a724ad89c4b625842ac7f48"
REDIRECT_URI = "http://localhost:3000/callback"

def exchange_code_for_token(code):
    url = "https://accounts.spotify.com/api/token"
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Basic {b64encode(f'{CLIENT_ID}:{CLIENT_SECRET}'.encode()).decode()}",
    }
    response = requests.post(url, data=payload, headers=headers)
    return response.json().get("access_token")