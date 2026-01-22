import { Link } from "react-router-dom";
import { HiShieldCheck, HiLightningBolt, HiChartBar } from "react-icons/hi";

export default function Home() {
  return (
    <div className="space-y-20 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -z-10 opacity-50 pointer-events-none"></div>

        <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
          Secure Your <span className="text-gradient">Transactions</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Advanced AI-powered detection for UPI fraud. Protect your digital assets with real-time analysis and instant reporting.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/check" className="btn-primary w-full sm:w-auto text-lg shadow-xl shadow-primary/20">
            Check Fraud Now
          </Link>
          <Link to="/report" className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all w-full sm:w-auto font-semibold">
            Report Suspicious Activity
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<HiShieldCheck className="text-4xl text-secondary" />}
          title="Real-time Protection"
          desc="Instant analysis of UPI IDs against our massive database of reported fraud."
        />
        <FeatureCard
          icon={<HiLightningBolt className="text-4xl text-yellow-400" />}
          title="Lightning Fast"
          desc="Get results in milliseconds. Our optimized engine ensures zero latency."
        />
        <FeatureCard
          icon={<HiChartBar className="text-4xl text-pink-500" />}
          title="Detailed Analytics"
          desc="Track trends and view detailed reports on suspicious activities."
        />
      </section>

      {/* Stats Section */}
      <section className="glass rounded-3xl p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          <Stat number="1M+" label="IDs Scanned" />
          <Stat number="50k+" label="Frauds Prevented" />
          <Stat number="99.9%" label="Uptime" />
          <Stat number="0s" label="Latency" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-card p-8 rounded-2xl space-y-4 hover:-translate-y-2 transition-transform duration-300">
      <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 ring-1 ring-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-heading">{title}</h3>
      <p className="text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="space-y-1">
      <div className="text-3xl md:text-4xl font-bold text-white font-heading">{number}</div>
      <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">{label}</div>
    </div>
  );
}
