import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FraudCheck from "./pages/FraudCheck";
import ReportFraud from "./pages/ReportFraud";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<FraudCheck />} />
        <Route path="/report" element={<ReportFraud />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
