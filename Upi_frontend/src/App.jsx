import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FraudCheck from "./pages/FraudCheck";
import ReportFraud from "./pages/ReportFraud";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[hsl(var(--bg-dark))] text-[hsl(var(--text-main))] font-body selection:bg-primary selection:text-white overflow-x-hidden">
        {/* Decorative Background Elements */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] opacity-50"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] opacity-50"></div>
        </div>

        <Navbar />

        <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/check" element={<FraudCheck />} />
            <Route path="/report" element={<ReportFraud />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
