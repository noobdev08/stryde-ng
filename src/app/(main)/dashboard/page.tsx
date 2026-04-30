import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PathCard from '@/components/PathCard'
import { FlameKindling, Sparkles, Monitor } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <main className="flex-1 p-8 md:p-12 overflow-y-none">
      {/* Header with Streak */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className='flex flex-col gap-1'>
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            Welcome back, {user.user_metadata?.name || "Developer"}
            <Sparkles size={20} className="text-blue-400 animate-pulse shrink-0" />
          </h1>
          <p className="text-sm text-gray-400">Let&apos;s continue your journey</p>
        </div>

        {/* On mobile, we make this a bit more compact or let it sit below */}
        <div className="self-start md:self-auto bg-[#0f172a] border border-gray-800 px-4 py-2 rounded-xl flex items-center gap-3">
          <FlameKindling size={18} className="text-orange-500 fill-orange-500/20" />
          <div className="flex flex-row md:flex-col items-center gap-2 md:gap-0 leading-none">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Streak</span>
            <span className="text-lg font-bold text-white">3</span>
          </div>
        </div>
      </div>

      {/* Continue Learning - Hero Card */}
      <section className='mt-5'>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Continue Learning</h2>

        {/* Changed flex-col on mobile, flex-row on desktop */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-2xl">

          <div className="flex items-center gap-4 md:gap-8 w-full">
            {/* Smaller icon on mobile */}
            <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center shrink-0">
              <Monitor size={28} className="text-blue-400" />
            </div>

            <div className="flex-1 z-10">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">HTML Basics</h3>
              <p className="text-xs md:text-sm text-slate-400 font-medium">Module 1: Introduction</p>
            </div>
          </div>

          {/* Progress bar stays full width */}
          <div className="w-full md:max-w-md z-10">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
              <span className="text-blue-400">1% Complete</span>
            </div>
            <div className="w-full bg-slate-800/50 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[1%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>
          </div>

          {/* Button goes full width on mobile */}
          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold transition-all cursor-pointer z-10">
            Continue
          </button>
        </div>
      </section>

      {/* Your Paths - Grid */}
      <section className='mt-5'>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PathCard
            id="cmo87mrmd0000nwugta47bexk"
            title="Frontend Path"
            description="Master HTML, CSS, JavaScript, and React."
            icon="🛡️"
            progress={30}
            className="border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
          />

          <PathCard
            id="cmo87mt1a0001nwugl8zup04b"
            title="Backend Path"
            description="Node.js, Express, and Databases."
            icon="⚙️"
            progress={0}
            isLocked={true}
            className="border-dashed"
          />

          <PathCard
            id="cmo87mt1c0002nwugvq0t7lpy"
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
            <p className="text-2xl font-bold text-white">0</p>
          </div>

          {/* Current Streak */}
          <div className="bg-[#0f172a] border border-gray-800 p-5 rounded-2xl">
            <p className="text-xs text-gray-500 font-medium mb-1">Current Streak</p>
            <p className="text-2xl font-bold text-white">0 days</p>
          </div>

          {/* Longest Streak */}
          <div className="bg-[#0f172a] border border-gray-800 p-5 rounded-2xl">
            <p className="text-xs text-gray-500 font-medium mb-1">Longest Streak</p>
            <p className="text-2xl font-bold text-white">0 days</p>
          </div>

          {/* Total Time */}
          <div className="bg-[#0f172a] border border-gray-800 p-5 rounded-2xl">
            <p className="text-xs text-gray-500 font-medium mb-1">Total Time</p>
            <p className="text-2xl font-bold text-white">0h 00m</p>
          </div>
        </div>
      </section>
    </main >
  )
}