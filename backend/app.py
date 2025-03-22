from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from spotify_integration import exchange_code_for_token
from ai_color_matching import apply_color_matching
import uvicorn

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000/callback"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files from the frontend folder
app.mount("/static", StaticFiles(directory="../frontend"), name="static")

# Spotify OAuth callback
@app.get("/callback")
async def callback(code: str):
    access_token = exchange_code_for_token(code)
    return {"access_token": access_token}

# AI Color Matching API
@app.post("/apply-color-matching")
async def apply_color_matching_api(request: Request):
    data = await request.json()
    image_url = data.get("image_url")
    dominant_colors = apply_color_matching(image_url)
    return {"dominant_colors": dominant_colors}

# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000)