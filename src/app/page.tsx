import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">SaaS Starter Hub</h1>
        <p className="text-lg text-gray-600 mb-8">
          A meta-project that spins up new SaaS projects using a 12-agent product creation engine
        </p>
        <div className="flex gap-4">
          <Link
            href="/hub"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Portfolio Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

