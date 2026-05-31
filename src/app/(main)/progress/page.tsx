import { BarChart3, Calendar, Flame, Target, TrendingUp, Trophy } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'
import { Card } from '@/components/Card'
import { StatCard } from '@/components/StatCard'

export default function ProgressPage() {
  const activity = [
    { day: "Today", task: "Completed 'HTML Semantic Tags'", time: "45m ago", type: "task" as const },
    { day: "Yesterday", task: "Achieved 3-Day Streak", time: "24h ago", type: "milestone" as const },
    { day: "26 Apr", task: "Started Frontend Path", time: "2 days ago", type: "path" as const },
  ]

  const weeklyData = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 70 },
    { day: "Wed", value: 45 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 65 },
    { day: "Sat", value: 30 },
    { day: "Sun", value: 80 }
  ]

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 overflow-y-auto no-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        <SectionHeader
          title="Your Growth"
          subtitle="Every hour is an investment toward your mastery."
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Current Streak"
            value={5}
            suffix="days"
            color="orange"
            icon={<Flame size={20} />}
          />
          <StatCard
            title="Tasks Completed"
            value={23}
            color="blue"
            icon={<Target size={20} />}
          />
          <StatCard
            title="Weekly Goal"
            value={75}
            suffix="%"
            color="emerald"
            icon={<TrendingUp size={20} />}
          />
          <StatCard
            title="Badges Earned"
            value={3}
            color="purple"
            icon={<Trophy size={20} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Activity Chart */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <BarChart3 size={22} className="text-blue-400" />
                  Weekly Activity
                </h3>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last 7 Days</span>
              </div>

              <div className="flex items-end justify-between gap-3 h-48 pt-4">
                {weeklyData.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 group flex-1">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-600/20 to-blue-500/30 group-hover:from-blue-600/30 group-hover:to-blue-500/40 border-t border-blue-500/30 rounded-t-xl transition-all duration-300" 
                      style={{ height: `${item.value}%` }}
                    />
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Momentum Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-400">
                    <Flame size={28} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">5 Days</p>
                    <p className="text-xs font-bold text-orange-400/80 uppercase tracking-widest">Current Momentum</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                    <Target size={28} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">75%</p>
                    <p className="text-xs font-bold text-blue-400/80 uppercase tracking-widest">Focus Score</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Calendar size={20} className="text-slate-400" />
              <h3 className="font-bold text-lg text-white">Recent Activity</h3>
            </div>

            <div className="space-y-4">
              {activity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/30 transition-all">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    item.type === 'task' ? 'bg-blue-400' : 
                    item.type === 'milestone' ? 'bg-emerald-400' : 'bg-purple-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{item.task}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{item.day}</span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-slate-500">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-3.5 rounded-xl border border-slate-700/50 text-slate-400 text-sm font-semibold hover:bg-slate-800/30 hover:border-slate-600/50 transition-all cursor-pointer">
              View All Activity
            </button>
          </Card>
        </div>
      </div>
    </main>
  )
}
