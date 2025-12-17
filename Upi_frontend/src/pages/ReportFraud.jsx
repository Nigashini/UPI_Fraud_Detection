import { useState } from "react";
import axios from "axios";

export default function ReportFraud() {
  const [form, setForm] = useState({
    name: "",
    upi_id: "",
    mobile: "",
    amount: "",
    description: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitReport = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const res = await axios.post("http://localhost:8000/report-fraud", form);
      setStatus({ success: true, message: "Fraud Report Submitted Successfully!" });
    } catch (err) {
      setStatus({ success: false, message: "Failed to submit report!" });
    }

    setLoading(false);
  };

  return (
    <div
      className="
        min-h-screen 
        bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600
        bg-cover bg-center bg-fixed
        flex items-center justify-center p-6
      "
    >
      {/* GLASS CARD */}
      <div className="relative bg-white/20 backdrop-blur-xl shadow-2xl 
                      border border-white/30 rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Report UPI Fraud
        </h1>

        <p className="text-white/80 text-center mb-6">
          Help others stay safe by reporting suspicious UPI activity.
        </p>

        {/* FORM INPUTS */}
        <div className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 rounded-lg border 
                       focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="upi_id"
            placeholder="Fraud UPI ID (example: fraud@okicici)"
            value={form.upi_id}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 rounded-lg border 
                       focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="mobile"
            placeholder="Fraud Mobile Number (optional)"
            value={form.mobile}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 rounded-lg border 
                       focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="amount"
            placeholder="Fraud Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 rounded-lg border 
                       focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Describe what happened..."
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 bg-white/80 rounded-lg border 
                       focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={submitReport}
          className="w-full mt-6 bg-red-600 hover:bg-orange-500 
                     text-white py-3 rounded-lg text-lg font-medium
                     transition"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>

        {/* STATUS MESSAGE */}
        {status && (
          <div
            className={`mt-4 text-center font-semibold p-3 rounded-lg ${
              status.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
