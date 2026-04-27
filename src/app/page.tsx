import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md p-8 bg-slate-900 rounded-2xl border border-slate-800 text-center">
        
        <h1 className="text-4xl font-bold text-white mb-2">
          Stryd
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          Stop watching. Start shipping.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Log In
          </Link>
        </div>

        <p className="text-slate-500 text-xs mt-8">
          Join 14+ developers already on the waitlist 🚀
        </p>

      </div>
    </main>
  )
}