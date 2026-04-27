import { logIn } from '@/app/(auth)/actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-4">
      
      {/* Container */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 bg-[#0f172a] rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT SIDE (branding) */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-blue-900 to-black">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome back to STRYD
          </h1>
          <p className="text-gray-400 mb-6">
            Pick up where you left off. Keep building your developer journey.
          </p>

          <div className="text-6xl">⚡</div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="flex items-center justify-center p-8">
          
          <div className="w-full max-w-md bg-[#020617] border border-gray-800 rounded-xl p-6 shadow-lg">
            
            <h2 className="text-xl font-semibold text-white mb-6 ">
              Log in to your account
            </h2>

            <form action={logIn} className="space-y-4">
              
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
              >
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className="my-4 text-center text-gray-500 text-sm">
              or
            </div>

            {/* OAuth placeholder */}
            <button className="w-full py-3 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition">
              Continue with Google
            </button>

            {/* Footer */}
            <p className="text-sm text-gray-500 mt-4 text-center">
              New here?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Create an account
              </a>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}