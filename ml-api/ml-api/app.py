from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load trained model
model = joblib.load("priority_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Convert to DataFrame
    df = pd.DataFrame([data])

    # ✅ IMPORTANT: SAME ORDER AS TRAINING
    df = df[[
        'urgency_level',
        'total_items',
        'hours_since_creation',
        'is_medical',
        'is_water',
        'fulfillment_ratio',
        'distance_to_hub',
        'disaster_type_earthquake',
        'disaster_type_flood',
        'disaster_type_volcano'
    ]]

    prediction = model.predict(df)

    return jsonify({
        "priority_score": float(prediction[0])
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)