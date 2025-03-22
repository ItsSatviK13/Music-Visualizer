from sklearn.cluster import KMeans
import joblib

# Example: Train a KMeans model and save it
kmeans = KMeans(n_clusters=3)
# Train the model with your dataset
# kmeans.fit(data)
joblib.dump(kmeans, "models/color_matching_model/model.pkl")