export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        🔰 UPI Fraud Detection
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Secure your digital payments using AI-powered fraud detection
      </p>

      <div className="flex space-x-4">
        <a
          href="/check"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Fraud Check
        </a>

        <a
          href="/report"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Report Fraud
        </a>
      </div>
    </div>
  );
}
