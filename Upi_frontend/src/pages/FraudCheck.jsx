import { useState } from "react";
import axios from "axios";

export default function FraudCheck() {
  const [form, setForm] = useState({
    amount: "",
    transactionType: "Person to Person",
    senderUpi: "",
    receiverUpi: "",
    location: "",
    deviceId: "",
    merchantCategory: "",
    notes: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  // Timestamp auto-filled
const [timestamp, setTimestamp] = useState(
  new Date().toISOString().slice(0, 16) // "YYYY-MM-DDTHH:mm"
);


  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const checkFraud = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(" http://127.0.0.1:8000", form);
      setResult(res.data);
    } catch {
      setResult({ error: "Something went wrong!" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">Test Transaction for Fraud Detection</h1>
        <p className="text-gray-600 mb-6">
          Enter transaction details to analyze potential fraud risk
        </p>

        {/* Grid Form */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Transaction Amount */}
          <div>
            <label className="font-medium flex items-center gap-1">₹ Transaction Amount *</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Enter amount (₹)"
              onChange={(e) => updateField("amount", e.target.value)}
            />
          </div>

          {/* Transaction Type */}
          

          {/* Sender UPI */}
          <div>
            <label className="font-medium">👤 Sender UPI ID *</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Enter sender UPI ID"
              onChange={(e) => updateField("senderUpi", e.target.value)}
            />
          </div>
          <div>
  <label className="block font-medium mb-1">Timestamp *</label>
  <input
    type="datetime-local"
    value={timestamp}
    readOnly
    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
  />
</div>


          {/* Receiver UPI */}
          <div>
            <label className="font-medium">👤 Receiver UPI ID *</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Enter receiver UPI ID"
              onChange={(e) => updateField("receiverUpi", e.target.value)}
            />
          </div>

          

          

          
        </div>

        {/* Submit Button */}
        <button
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium"
          onClick={checkFraud}
        >
          {loading ? "Analyzing..." : "Submit Transaction"}
        </button>

        {/* Result Box */}
        {result && (
          <div className="mt-6 p-4 rounded-lg text-center font-medium
            bg-gray-100 border">
            {result.error && <p className="text-red-600">{result.error}</p>}
            {result.isFraud === true && (
              <p className="text-red-700 text-lg">⚠️ High Fraud Risk Detected</p>
            )}
            {result.isFraud === false && (
              <p className="text-green-700 text-lg">✔️ Transaction Appears Safe</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
