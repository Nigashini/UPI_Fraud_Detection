from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from datetime import datetime

from database.database import load_reports, save_report

# ------------ Load ML Models ------------
rf_model = joblib.load("rf_pipeline.joblib")
iso_model = joblib.load("iso_pipeline.joblib")
perm_importances = joblib.load("perm_importances.joblib")

feature_names = [
    "sender_name", "receiver_name",
    "sender_bank", "receiver_bank",
    "amount", "hour", "day", "month"
]

# ------------ Improved Explainable AI Logic ------------
def explain_prediction(sample, rf_prob, iso_flag, risk_score):
    reasons = []

    # HIGH AMOUNT
    if sample["amount"] >= 5000:
        reasons.append("High transaction amount")

    # UNUSUAL TIME (only if risk is already high)
    if (sample["hour"] < 6 or sample["hour"] > 22) and risk_score >= 60:
        reasons.append("Transaction at unusual time")

    # SENDER–RECEIVER PATTERN (only when anomaly detected)
    if iso_flag == 1:
        reasons.append("Unusual sender–receiver behavior detected")

    # MODEL CONFIDENCE
    if rf_prob >= 0.75:
        reasons.append("ML model strongly predicts fraud pattern")

    # SAFE CASE MESSAGE
    if risk_score < 60:
        reasons.append("Transaction behavior appears normal")

    return reasons


# ------------ Input Schema for Prediction ------------
class Transaction(BaseModel):
    sender_name: str
    sender_upi: str
    receiver_name: str
    receiver_upi: str
    amount: float
    timestamp: str


# ------------ Input Schema for Fraud Report ------------
class FraudReport(BaseModel):
    name: str
    upi_id: str
    mobile: str
    description: str
    evidence_url: str | None = None


app = FastAPI()

# ------------ CORS ------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------ Root ------------
@app.get("/")
def home():
    return {"message": "Fraud Detection API is running!"}


# ------------ Prediction API ------------
@app.post("/predict")
def predict(data: Transaction):
    ts = pd.to_datetime(data.timestamp)

    sender_bank = data.sender_upi.split("@")[1]
    receiver_bank = data.receiver_upi.split("@")[1]

    new_data = pd.DataFrame([{
        "sender_name": data.sender_name,
        "receiver_name": data.receiver_name,
        "sender_bank": sender_bank,
        "receiver_bank": receiver_bank,
        "amount": data.amount,
        "hour": ts.hour,
        "day": ts.day,
        "month": ts.month
    }])

    # ---- Model Predictions ----
    rf_pred = rf_model.predict(new_data)[0]
    rf_prob = rf_model.predict_proba(new_data)[0][1]

    iso_raw = iso_model.predict(
        rf_model.named_steps["transform"].transform(new_data)
    )[0]
    iso_flag = 1 if iso_raw == -1 else 0

    # ---- Risk Score (Balanced & Realistic) ----
    risk_score = int((rf_prob * 70) + (iso_flag * 30))

    prediction = "FRAUD" if risk_score >= 60 else "SAFE"

    explanation = explain_prediction(
        new_data.iloc[0],
        rf_prob,
        iso_flag,
        risk_score
    )

    return {
        "prediction": prediction,
        "risk_score": risk_score,
        "model_signals": {
            "random_forest": int(rf_pred),
            "isolation_forest": int(iso_flag)
        },
        "reason": explanation
    }


# ------------ Submit Fraud Report API ------------
@app.post("/report-fraud")
def report_fraud(report: FraudReport):
    report_data = {
        "name": report.name,
        "upi_id": report.upi_id,
        "mobile": report.mobile,
        "description": report.description,
        "evidence_url": report.evidence_url,
        "submitted_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    save_report(report_data)

    return {
        "message": "Fraud report submitted successfully!",
        "data": report_data
    }


# ------------ Fetch All Reports ------------
@app.get("/reports")
def get_reports():
    reports = load_reports()
    return [
        r for r in reports
        if r.get("upi_id") and r.get("description")
    ]
