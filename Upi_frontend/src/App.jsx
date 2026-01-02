import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FraudCheck from "./pages/FraudCheck";
import ReportFraud from "./pages/ReportFraud";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/check" element={<FraudCheck />} />
            <Route path="/report" element={<ReportFraud />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
