import numpy as np
from sklearn.cluster import KMeans
from PIL import Image
import requests
from io import BytesIO

def apply_color_matching(image_url):
    # Load the image from the URL
    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content))
    image = image.resize((100, 100))  # Resize for faster processing
    pixels = np.array(image).reshape(-1, 3)

    # Use KMeans clustering to extract dominant colors
    kmeans = KMeans(n_clusters=3)
    kmeans.fit(pixels)
    dominant_colors = kmeans.cluster_centers_.astype(int).tolist()

    return dominant_colors