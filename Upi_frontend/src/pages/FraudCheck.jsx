import { useState } from "react";
import axios from "axios";
import { HiCurrencyRupee, HiUser, HiSwitchHorizontal, HiClock, HiShieldCheck, HiExclamation } from "react-icons/hi";

export default function CheckFraud() {
  const [form, setForm] = useState({
    amount: "",
    sender_upi: "",
    receiver_upi: "",
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const submitTransaction = async () => {
    if (!form.amount || !form.sender_upi || !form.receiver_upi || !form.timestamp) {
      setError("Please fill in all details.");
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate delay for smooth animation feeling
    await new Promise(r => setTimeout(r, 800));

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
      console.error(err);
      setError("Server unavailable. Please ensure the backend is running.");
      setResult(null);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] animate-fade-in relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-2xl glass p-8 md:p-12 rounded-3xl relative overflow-hidden">

        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Fraud Risk <span className="text-primary">Analyzer</span>
          </h1>
          <p className="text-gray-400">
            Enter details to scan for potential security threats.
          </p>
          {error && <p className="text-red-500 font-semibold animate-pulse">{error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputGroup
            icon={<HiCurrencyRupee />}
            type="number"
            name="amount"
            placeholder="Amount (₹)"
            value={form.amount}
            onChange={handleChange}
          />

          <InputGroup
            icon={<HiClock />}
            type="datetime-local"
            name="timestamp"
            value={form.timestamp}
            onChange={handleChange}
          />

          <InputGroup
            icon={<HiUser />}
            type="text"
            name="sender_upi"
            placeholder="Sender UPI ID"
            value={form.sender_upi}
            onChange={handleChange}
          />

          <InputGroup
            icon={<HiSwitchHorizontal />}
            type="text"
            name="receiver_upi"
            placeholder="Receiver UPI ID"
            value={form.receiver_upi}
            onChange={handleChange}
          />

        </div>

        <button
          onClick={submitTransaction}
          disabled={loading}
          className="w-full mt-10 btn-primary text-lg flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Scanning...
            </>
          ) : (
            "Analyze Transaction"
          )}
        </button>

        {/* Result Area */}
        {result && (
          <div className="mt-8 animate-slide-up">
            <div className={`p-6 rounded-2xl border backdrop-blur-md ${result.prediction === "FRAUD"
              ? "bg-red-500/10 border-red-500/30 text-red-200"
              : "bg-green-500/10 border-green-500/30 text-green-200"
              }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${result.prediction === "FRAUD" ? "bg-red-500/20" : "bg-green-500/20"
                  }`}>
                  {result.prediction === "FRAUD" ? <HiExclamation /> : <HiShieldCheck />}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading">
                    Transaction is {result.prediction}
                  </h3>
                  <p className="opacity-80 text-sm">Analysis Completed Successfully</p>
                </div>
              </div>

              {result.reason && (
                <div className="space-y-2 pl-16">
                  <p className="uppercase text-xs font-bold opacity-60 tracking-wider">Risk Factors:</p>
                  <ul className="list-disc space-y-1 text-sm opacity-90">
                    {result.reason.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function InputGroup({ icon, className = "", ...props }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-primary transition-colors">
        {icon}
      </div>
      <input
        className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all ${className}`}
        {...props}
      />
    </div>
  )
}
