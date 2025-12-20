import { Link } from "react-router-dom";
import { Home, Search, AlertTriangle, FileText } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-slate-900 text-white p-5">
      <h2 className="text-xl font-bold mb-8 text-blue-400">Fraud UPI</h2>

      <nav className="space-y-4">
        <Link
          to="/"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <Home size={20} /> Home
        </Link>

        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FileText size={20} /> Dashboard
        </Link>

        <Link
          to="/check"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <Search size={20} /> Check Fraud
        </Link>

        <Link
          to="/report"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <AlertTriangle size={20} /> Report Fraud
        </Link>
      </nav>
    </div>
  );
}
