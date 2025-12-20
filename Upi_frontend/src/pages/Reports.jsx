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
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.upi_id}</td>
                <td className="p-3">{r.mobile}</td>
                <td className="p-3">{r.submitted_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
