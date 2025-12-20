import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/reports")
      .then(res => {
  const filtered = res.data.filter(
    r => r.upi_id && r.description
  );
  setReports(filtered);
})

      .catch(() => setReports([]));
  }, []);

  return (
    <div className="ml-64 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat title="Total Fraud Reports" value={reports.length} />
        <Stat title="System Status" value="Active" color="green" />
        <Stat title="ML Model" value="Running" color="blue" />
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        <ul className="space-y-2">
          {reports.slice(-5).map((r, i) => (
            <li key={i} className="border-b pb-2">
  <b>{r.upi_id}</b>
  <div className="text-sm text-gray-500">
    {r.description}
  </div>
</li>

          ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({ title, value, color = "indigo" }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-gray-500">{title}</p>
      <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
    </div>
  );
}
