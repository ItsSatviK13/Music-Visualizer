import numpy as np
from scipy.io import wavfile

def analyze_audio(file_path):
    # Load the audio file
    sample_rate, data = wavfile.read(file_path)

    # Perform audio analysis (e.g., extract waveform, frequencies, etc.)
    waveform = data[:, 0] if data.ndim > 1 else data  # Use the first channel for mono/stereo
    frequencies = np.fft.fft(waveform)
    magnitudes = np.abs(frequencies)

    return {
        "sample_rate": sample_rate,
        "waveform": waveform.tolist(),
        "frequencies": frequencies.tolist(),
        "magnitudes": magnitudes.tolist(),
    }