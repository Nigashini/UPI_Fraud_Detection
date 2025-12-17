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

  const [errors, setErrors] = useState({}); // NEW → store validation errors

  // Validate required fields
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.upi_id.trim()) newErrors.upi_id = "UPI ID is required.";
    if (!form.amount.trim()) newErrors.amount = "Amount is required.";
    if (!form.description.trim())
      newErrors.description = "Description is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // true = valid
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Clear error when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const submitReport = async () => {
    setStatus(null);

    // run validation
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/report-fraud", form);

      setStatus({
        success: true,
        message: "Fraud Report Submitted Successfully!",
      });

      // Clear form
      setForm({
        name: "",
        upi_id: "",
        mobile: "",
        amount: "",
        description: "",
      });
    } catch (err) {
      setStatus({
        success: false,
        message: "Failed to submit report!",
      });
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
      <div className="relative bg-white/20 backdrop-blur-xl shadow-2xl
                      border border-white/30 rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Report UPI Fraud
        </h1>

        <p className="text-white/80 text-center mb-6">
          Help others stay safe by reporting suspicious UPI activity.
        </p>

        <div className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 rounded-lg border
                      focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-300 text-sm">{errors.name}</p>}

          {/* UPI */}
          <input
            type="text"
            name="upi_id"
            placeholder="Fraud UPI ID (example: fraud@okicici)"
            value={form.upi_id}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 rounded-lg border
                      focus:ring-2 focus:ring-blue-400"
          />
          {errors.upi_id && (
            <p className="text-red-300 text-sm">{errors.upi_id}</p>
          )}

          {/* Mobile */}
          <input
            type="number"
            name="mobile"
            placeholder="Fraud Mobile Number (optional)"
            value={form.mobile}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 rounded-lg border
                      focus:ring-2 focus:ring-blue-400"
          />

          {/* Amount */}
          <input
            type="number"
            name="amount"
            placeholder="Fraud Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 rounded-lg border
                      focus:ring-2 focus:ring-blue-400"
          />
          {errors.amount && (
            <p className="text-red-300 text-sm">{errors.amount}</p>
          )}

          {/* Description */}
          <textarea
            name="description"
            placeholder="Describe what happened..."
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 bg-white/80 rounded-lg border
                      focus:ring-2 focus:ring-blue-400"
          ></textarea>
          {errors.description && (
            <p className="text-red-300 text-sm">{errors.description}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={submitReport}
          disabled={loading}
          className="w-full mt-6 bg-red-600 hover:bg-orange-500
                    text-white py-3 rounded-lg text-lg font-medium
                    transition disabled:opacity-50 disabled:cursor-not-allowed"
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
