import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PathCard from '@/components/PathCard'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <main className="flex-1 p-8 md:p-12 overflow-y-none">
      {/* Header with Streak */}
      <div className="flex justify-between items-center">
        <div className='flex flex-col gap-1'>
          <h1 className="text-2xl font-bold">Welcome back, {user.user_metadata?.name || "Developer"} 👋</h1>
          <p className="text-gray-400">Let&apos;s continue your journey</p>
        </div>
        <div className="bg-[#0f172a] border border-gray-800 px-4 py-2 rounded-xl flex items-center gap-3">
          <span className="text-orange-500">🔥 Streak</span>
          <span className="text-xl font-bold">0</span>
        </div>
      </div>

      {/* Continue Learning - The Big Card */}
      <section className='mt-5'>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Continue Learning</h2>
        <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6 flex items-center gap-6">
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
            {/* Icon here */}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">HTML Basics</h3>
            <p className="text-sm text-gray-400 mb-2">Progress: 45%</p>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[45%]" />
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition cursor-pointer">
            Continue
          </button>
        </div>
      </section>

      {/* Your Paths - Grid */}
      <section className='mt-5'>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PathCard
            title="Frontend Path"
            description="Master HTML, CSS, JavaScript, and React."
            icon="🛡️"
            progress={30}
            className="border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
          />

          <PathCard
            title="Backend Path"
            description="Node.js, Express, and Databases."
            icon="⚙️"
            progress={0}
            isLocked={true}
            className="border-dashed"
          />

          <PathCard
            title="Fullstack Path"
            description="Build complete real-world applications."
            icon="🚀"
            progress={0}
            isLocked={true}
          />
        </div>
      </section>

      {/* Your Stats */}
      <section className='mt-5'>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Tasks Completed */}
          <div className="bg-[#0f172a] border border-gray-800 p-5 rounded-2xl">
            <p className="text-xs text-gray-500 font-medium mb-1">Tasks Completed</p>
            <p className="text-2xl font-bold text-white">12</p>
          </div>

          {/* Current Streak */}
          <div className="bg-[#0f172a] border border-gray-800 p-5 rounded-2xl">
            <p className="text-xs text-gray-500 font-medium mb-1">Current Streak</p>
            <p className="text-2xl font-bold text-white">3 days</p>
          </div>

          {/* Longest Streak */}
          <div className="bg-[#0f172a] border border-gray-800 p-5 rounded-2xl">
            <p className="text-xs text-gray-500 font-medium mb-1">Longest Streak</p>
            <p className="text-2xl font-bold text-white">3 days</p>
          </div>

          {/* Total Time */}
          <div className="bg-[#0f172a] border border-gray-800 p-5 rounded-2xl">
            <p className="text-xs text-gray-500 font-medium mb-1">Total Time</p>
            <p className="text-2xl font-bold text-white">4h 30m</p>
          </div>
        </div>
      </section>
    </main >
  )
}