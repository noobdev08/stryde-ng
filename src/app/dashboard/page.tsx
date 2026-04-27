import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-[#0b1120] text-white px-6 py-10">

      <div className="max-w-4xl mx-auto">

        {/* HEADER CARD */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6 flex items-center justify-between mb-8">

          <div>
            <h1 className="text-xl font-semibold">
              Hey, {user.user_metadata?.name || "Developer"} 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Keep building. Small wins daily.
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-blue-500">0</p>
            <p className="text-xs text-gray-500">day streak</p>
          </div>

        </div>

        {/* MAIN CARDS */}
        <h2 className="text-gray-400 text-xs uppercase tracking-widest mb-4">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <Link
            href="/paths"
            className="bg-[#0f172a] border border-gray-800 hover:border-blue-500 transition rounded-2xl p-6"
          >
            <h3 className="font-semibold text-lg mb-1">Learning Paths</h3>
            <p className="text-gray-500 text-sm">
              Continue your structured roadmap
            </p>
          </Link>

          <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6 opacity-70">
            <h3 className="font-semibold text-lg mb-1">Projects</h3>
            <p className="text-gray-500 text-sm">
              Coming soon — build real-world apps
            </p>
          </div>

          <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6 opacity-70">
            <h3 className="font-semibold text-lg mb-1">Progress</h3>
            <p className="text-gray-500 text-sm">
              Track your learning growth
            </p>
          </div>

          <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6 opacity-70">
            <h3 className="font-semibold text-lg mb-1">Settings</h3>
            <p className="text-gray-500 text-sm">
              Manage your account
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}