import { useState } from "react";
import axios from "axios";
import { FaUserAlt, FaMoneyBillWave, FaExchangeAlt, FaClock } from "react-icons/fa";

export default function CheckFraud() {
  const [form, setForm] = useState({
    amount: "",
    sender_upi: "",
    receiver_upi: "",
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitTransaction = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:8000/predict", {
        sender_name: "User",                
        receiver_name: "Receiver",
        amount: form.amount,
        sender_upi: form.sender_upi,
        receiver_upi: form.receiver_upi,
        timestamp: form.timestamp.replace("T", " "),
      });

      setResult(res.data);
    } catch (err) {
      setResult({ error: "Something went wrong!" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-800 p-8 flex justify-center items-center">
      
      {/* CARD */}
      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 animate-fadeIn">
        
        <h1 className="text-4xl font-extrabold text-white text-center mb-4">
          ⚠️ Fraud Risk Analyzer
        </h1>

        <p className="text-white/80 text-center mb-10">
          Enter transaction details to check if it's potentially fraudulent.
        </p>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* AMOUNT */}
          <div className="relative">
            <FaMoneyBillWave className="absolute left-3 top-3 text-white/80 text-xl" />
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount (₹)"
              value={form.amount}
              onChange={handleChange}
              className="w-full bg-white/25 placeholder-white/70 text-white pl-12 py-3 rounded-xl border border-white/40 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* SENDER UPI */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-3 text-white/80 text-lg" />
            <input
              type="text"
              name="sender_upi"
              placeholder="Sender UPI ID"
              value={form.sender_upi}
              onChange={handleChange}
              className="w-full bg-white/25 placeholder-white/70 text-white pl-12 py-3 rounded-xl border border-white/40 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* RECEIVER UPI */}
          <div className="relative">
            <FaExchangeAlt className="absolute left-3 top-3 text-white/80 text-xl" />
            <input
              type="text"
              name="receiver_upi"
              placeholder="Receiver UPI ID"
              value={form.receiver_upi}
              onChange={handleChange}
              className="w-full bg-white/25 placeholder-white/70 text-white pl-12 py-3 rounded-xl border border-white/40 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* TIMESTAMP */}
          <div className="relative">
            <FaClock className="absolute left-3 top-3 text-white/80 text-xl" />
            <input
              type="datetime-local"
              name="timestamp"
              value={form.timestamp}
              onChange={handleChange}
              className="w-full bg-white/25 text-white pl-12 py-3 rounded-xl border border-white/40 focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={submitTransaction}
          className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white text-lg py-3 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all"
        >
          {loading ? "Analyzing..." : "Submit Transaction"}
        </button>

        {/* RESULT SECTION */}
        {result && (
          <div className="mt-6 p-5 rounded-xl bg-white/30 text-white backdrop-blur-xl border border-white/40">
            {result.error ? (
              <p className="text-red-300 font-semibold">{result.error}</p>
            ) : (
              <>
                <p className="text-xl font-bold">
                  Result:{" "}
                  <span className={result.prediction === "FRAUD" ? "text-red-400" : "text-green-300"}>
                    {result.prediction}
                  </span>
                </p>

                <h3 className="mt-3 font-semibold text-white/90">Reason:</h3>
                <ul className="list-disc ml-6 text-white/80 mt-2">
                  {result.reason.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
