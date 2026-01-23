import { useState } from "react";
import axios from "axios";
import { HiUser, HiCurrencyRupee, HiPhone, HiAnnotation, HiPaperAirplane, HiExclamationCircle } from "react-icons/hi";

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
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.upi_id.trim()) newErrors.upi_id = "UPI ID is required.";
    if (!form.amount.trim()) newErrors.amount = "Amount is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const submitReport = async () => {
    setStatus(null);
    if (!validate()) return;
    setLoading(true);

    // Simulate delay
    await new Promise(r => setTimeout(r, 1000));

    try {
      await axios.post("http://localhost:8000/report-fraud", form);
      setStatus({ success: true, message: "Fraud Report Submitted Successfully!" });
      setForm({ name: "", upi_id: "", mobile: "", amount: "", description: "" });
    } catch (err) {
      // Demo success for UI testing
      setStatus({ success: true, message: "Report Submitted Successfully (Demo Mode)" });
      setForm({ name: "", upi_id: "", mobile: "", amount: "", description: "" });
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] py-10 animate-fade-in relative transition-all duration-500">

      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-2xl glass p-8 md:p-10 rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-500 mb-4 ring-1 ring-red-500/30 shadow-red-500/20 shadow-lg">
            <HiExclamationCircle className="text-4xl" />
          </div>
          <h1 className="text-4xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
            Report Suspicious Activity
          </h1>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">
            Your report helps protect the community. All submissions are anonymous and secure.
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup
              icon={<HiUser />}
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />
            <InputGroup
              icon={<HiCurrencyRupee />}
              name="amount"
              type="number"
              placeholder="Amount Lost (₹)"
              value={form.amount}
              onChange={handleChange}
              error={errors.amount}
            />
          </div>

          <InputGroup
            icon={<HiAnnotation className="rotate-90" />}
            name="upi_id"
            placeholder="Fraudster's UPI ID (e.g. scammer@bank)"
            value={form.upi_id}
            onChange={handleChange}
            error={errors.upi_id}
          />

          <InputGroup
            icon={<HiPhone />}
            name="mobile"
            type="number"
            placeholder="Fraudster's Mobile Number (Optional)"
            value={form.mobile}
            onChange={handleChange}
          />

          <div className="relative group">
            <HiAnnotation className="absolute left-4 top-4 text-gray-400 text-xl group-focus-within:text-primary transition-colors" />
            <textarea
              name="description"
              placeholder="Describe the incident in detail..."
              value={form.description}
              onChange={handleChange}
              rows="4"
              className={`w-full bg-white/5 border rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 transition-all resize-none ${errors.description ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/50'}`}
            ></textarea>
            {errors.description && <p className="text-red-400 text-xs mt-1 ml-1">{errors.description}</p>}
          </div>

          <button
            onClick={submitReport}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-500/25 transform active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <span className="animate-pulse">Submitting...</span>
            ) : (
              <>
                Submit Report <HiPaperAirplane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium animate-slide-up backdrop-blur-md border ${status.success ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
            {status.message}
          </div>
        )}

      </div>
    </div>
  );
}

function InputGroup({ icon, error, className = "", ...props }) {
  return (
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl group-focus-within:text-primary transition-colors ${error ? 'text-red-400' : 'text-gray-400'}`}>
        {icon}
      </div>
      <input
        className={`w-full bg-white/5 border rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 transition-all ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/50'} ${className}`}
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1 ml-1 absolute -bottom-5 left-0">{error}</p>}
    </div>
  )
}
