import { useEffect, useState } from "react";
import axios from "axios";
import { HiChartPie, HiShieldCheck, HiServer, HiTrendingUp } from "react-icons/hi";

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data if backend is not available, or replace with actual fetch
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:8000/reports");
        const filtered = res.data.filter(r => r.upi_id && r.description);
        setReports(filtered);
      } catch (error) {
        // Fallback demo data if server is offline
        console.log("Server offline, using demo data");
        const localReports = JSON.parse(localStorage.getItem("fraud_reports") || "[]");
        const demoReports = [
          { upi_id: "scammer@okhdfcbank", description: "Asked for refundable deposit.", date: "2024-02-20" },
          { upi_id: "fake_shop@ybl", description: "Fake shopping website payment.", date: "2024-02-19" },
          { upi_id: "lottery_winner@axl", description: "Claimed I won a lottery.", date: "2024-02-18" },
        ];
        setReports([...localReports, ...demoReports]);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 mt-1">Real-time fraud detection metrics</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          System Live
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Fraud Reports"
          value={reports.length}
          icon={<HiChartPie className="text-3xl text-primary" />}
          trend="+12% from last week"
        />
        <StatCard
          title="Active Scans"
          value="Running"
          icon={<HiServer className="text-3xl text-secondary" />}
          trend="Zero latency"
        />
        <StatCard
          title="Protection Level"
          value="High"
          icon={<HiShieldCheck className="text-3xl text-green-500" />}
          trend="Updated 2m ago"
        />
      </div>

      {/* Recent Reports Table */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
          <HiTrendingUp className="text-secondary" /> Recent Activity
        </h2>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading data...</div>
        ) : (
          <div className="overflow-x-auto max-h-96 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse relative">
              <thead className="sticky top-0 bg-[#1a1f2e] z-10">
                <tr className="border-b border-white/10 text-sm font-medium text-gray-400">
                  <th className="p-4">UPI ID</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {reports.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-secondary">{r.upi_id}</td>
                    <td className="p-4 text-gray-300">{r.description}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        Flagged
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={async () => {
                          if (!r.id) {
                            // Fallback for demo/legacy
                            const updatedReports = reports.filter((_, index) => index !== i);
                            setReports(updatedReports);
                            return;
                          }
                          try {
                            await axios.delete(`http://localhost:8000/reports/${r.id}`);
                            setReports(reports.filter(report => report.id !== r.id));
                          } catch (err) {
                            console.error("Failed to delete report:", err);
                          }
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold font-heading text-white">{value}</h3>
          <p className="text-xs text-gray-500 mt-2">{trend}</p>
        </div>
        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors ring-1 ring-white/10">
          {icon}
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
    </div>
  );
}
