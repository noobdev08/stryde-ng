import { BarChart3, Calendar, Flame, Target, Trophy } from 'lucide-react'

export default function ProgressPage() {
  const activity = [
    { day: "Today", task: "Completed 'HTML Semantic Tags'", time: "45m ago", type: "task" },
    { day: "Yesterday", task: "Achieved 3-Day Streak", time: "24h ago", type: "milestone" },
    { day: "26 Apr", task: "Started Frontend Path", time: "2 days ago", type: "path" },
  ]

  return (
    <main className="flex-1 p-6 md:p-12 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Your Growth</h1>
        <p className="text-slate-400 text-sm">Every hour is an investment toward your mastery.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Big Stats & Weekly Chart Placeholder */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Weekly Overview - The "Visual" bit */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-white flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-400" />
                Weekly Activity
              </h3>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Last 7 Days</span>
            </div>
            
            {/* Simple CSS bar chart to avoid extra libraries for now */}
            <div className="flex items-end justify-between gap-2 h-40 pt-4">
              {[40, 70, 45, 90, 65, 30, 80].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className="w-full bg-blue-600/20 group-hover:bg-blue-500/40 border-t border-blue-500/30 rounded-t-lg transition-all" 
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[10px] font-bold text-slate-600 uppercase">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 p-6 rounded-3xl flex items-center gap-5">
                <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500">
                  <Flame size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">0 Days</p>
                  <p className="text-xs font-bold text-orange-500/80 uppercase tracking-widest">Current Momentum</p>
                </div>
             </div>

             <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 p-6 rounded-3xl flex items-center gap-5">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">0%</p>
                  <p className="text-xs font-bold text-blue-500/80 uppercase tracking-widest">Focus Score</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 md:p-8 h-fit">
          <div className="flex items-center gap-2 mb-8">
            <Calendar size={18} className="text-slate-400" />
            <h3 className="font-bold text-white">Recent Logs</h3>
          </div>

          <button className="w-full mt-10 py-3 rounded-2xl border border-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-800/50 transition-all cursor-pointer">
            View All Logs
          </button>
        </div>

      </div>
    </main>
  )
}