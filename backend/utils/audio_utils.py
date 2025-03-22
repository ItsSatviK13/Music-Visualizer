import numpy as np

def normalize_audio(data):
    # Normalize audio data to the range [-1, 1]
    return data / np.max(np.abs(data))

def extract_features(data, sample_rate):
    # Extract features from audio data (e.g., MFCC, spectral features)
    pass