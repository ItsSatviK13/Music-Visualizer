import requests

def make_api_request(url, headers=None, params=None):
    response = requests.get(url, headers=headers, params=params)
    return response.json()