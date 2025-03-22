// Function to apply AI-driven color matching
export async function applyColorMatching() {
  console.log('AI color matching applied.');

  // Fetch album artwork (replace with actual image URL)
  const imageUrl = 'assets/images/placeholder-artwork.jpg';

  // Load the image
  const image = await loadImage(imageUrl);

  // Extract dominant colors using KMeans clustering
  const dominantColors = await extractDominantColors(image, 3); // Extract 3 dominant colors

  // Apply colors to the UI
  applyColorsToUI(dominantColors);
}

// Load an image from a URL
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Enable CORS for external images
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });
}

// Extract dominant colors using KMeans clustering
async function extractDominantColors(image, numColors) {
  // Create a canvas and draw the image
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);

  // Get pixel data from the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  // Convert pixel data to RGB values
  const pixels = [];
  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    pixels.push([r, g, b]);
  }

  // Use KMeans clustering to extract dominant colors
  const kmeans = new KMeans(numColors);
  const clusters = kmeans.fit(pixels);

  // Extract the dominant colors (cluster centroids)
  const dominantColors = clusters.centroids.map((centroid) => {
    return centroid.map((value) => Math.round(value));
  });

  return dominantColors;
}

// Apply colors to the UI
function applyColorsToUI(colors) {
  const root = document.documentElement;

  // Apply the first color as the primary color
  root.style.setProperty('--primary-color', `rgb(${colors[0].join(',')})`);

  // Apply the second color as the background color
  root.style.setProperty('--background-dark', `rgb(${colors[1].join(',')})`);

  // Apply the third color as the text color
  root.style.setProperty('--text-dark', `rgb(${colors[2].join(',')})`);
}

// KMeans clustering implementation
class KMeans {
  constructor(k, maxIterations = 100) {
    this.k = k;
    this.maxIterations = maxIterations;
  }

  fit(data) {
    // Initialize centroids randomly
    this.centroids = this.initializeCentroids(data);

    for (let i = 0; i < this.maxIterations; i++) {
      // Assign each data point to the nearest centroid
      const assignments = this.assignPointsToCentroids(data);

      // Update centroids based on the mean of assigned points
      const newCentroids = this.updateCentroids(data, assignments);

      // Check for convergence
      if (this.centroidsEqual(newCentroids)) break;

      this.centroids = newCentroids;
    }

    return {
      centroids: this.centroids,
    };
  }

  initializeCentroids(data) {
    const centroids = [];
    for (let i = 0; i < this.k; i++) {
      centroids.push(data[Math.floor(Math.random() * data.length)]);
    }
    return centroids;
  }

  assignPointsToCentroids(data) {
    const assignments = [];
    for (const point of data) {
      let minDistance = Infinity;
      let closestCentroidIndex = 0;

      for (let i = 0; i < this.centroids.length; i++) {
        const distance = this.euclideanDistance(point, this.centroids[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroidIndex = i;
        }
      }

      assignments.push(closestCentroidIndex);
    }
    return assignments;
  }

  updateCentroids(data, assignments) {
    const newCentroids = Array(this.k).fill().map(() => [0, 0, 0]);
    const counts = Array(this.k).fill(0);

    for (let i = 0; i < data.length; i++) {
      const centroidIndex = assignments[i];
      for (let j = 0; j < 3; j++) {
        newCentroids[centroidIndex][j] += data[i][j];
      }
      counts[centroidIndex]++;
    }

    for (let i = 0; i < this.k; i++) {
      if (counts[i] > 0) {
        for (let j = 0; j < 3; j++) {
          newCentroids[i][j] /= counts[i];
        }
      }
    }

    return newCentroids;
  }

  centroidsEqual(newCentroids) {
    for (let i = 0; i < this.centroids.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (Math.abs(this.centroids[i][j] - newCentroids[i][j]) > 1e-6) {
          return false;
        }
      }
    }
    return true;
  }

  euclideanDistance(a, b) {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += (a[i] - b[i]) ** 2;
    }
    return Math.sqrt(sum);
  }
}