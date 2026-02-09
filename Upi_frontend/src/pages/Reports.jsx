import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/reports")
      .then(res => setReports(res.data));
  }, []);

  return (
    <div className="ml-64 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Fraud Reports</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">UPI</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Report Statement</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.upi_id}</td>
                <td className="p-3">{r.mobile}</td>
                <td className="p-3">{r.description}</td>
                <td className="p-3">{r.submitted_at}</td>
                <td className="p-3">
                  <button
                    onClick={async () => {
                      if (!r.id) {
                        // Fallback for old reports without ID
                        const updatedReports = reports.filter((_, index) => index !== i);
                        setReports(updatedReports);
                        return;
                      }

                      try {
                        await axios.delete(`http://localhost:8000/reports/${r.id}`);
                        setReports(reports.filter(report => report.id !== r.id));
                      } catch (err) {
                        console.error("Failed to delete report:", err);
                        alert("Failed to delete report. Ensure backend is running.");
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
